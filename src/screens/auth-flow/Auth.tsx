import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useRoute } from "@react-navigation/native";
import { AxiosError } from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Animated, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../config";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import LabeledInput from "../../components/ui/LabeledInput";
import { AuthContext } from "../../contexts/auth-context";
import { httpClient } from "../../controllers/http-client";
import DomIcon from '../../resources/img/ui/dom-app-icon.svg';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Tab = createMaterialTopTabNavigator();

export default function Auth() {
    return (
        <SafeAreaView style={style.mainContainer}>
            <Tab.Navigator tabBar={(props) => <TabsMenu {...props} />}>
                <Tab.Screen name="Login" options={{ tabBarLabel: 'Iniciar Sesión' }} component={LoginTab} />
                <Tab.Screen name="Register" options={{ tabBarLabel: 'Registrarse' }} component={RegisterTab} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

function TabsMenu({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
    const nav = useRoute<any>();

    useEffect(
        () => {
            if (nav.params?.Show === 'Register') {
                navigation.navigate('Register');
            }
        },
        []
    );

    return (
        <View style={style.header}>
            <DomIcon />
            <View style={style.tabs}>
                {
                    state.routes.map((route, index) => {
                        const { options }: any = descriptors[route.key];
                        const isFocused = state.index === index;
                        
                        const onPress = () => {
                            const event: any = navigation.emit({
                                type: 'tabPress',
                                target: route.key
                            } as any);
                            if (!isFocused && !event.defaultPrevented) {
                                navigation.navigate(route.name);
                            }
                        }

                        const onLongPress = () => {
                            navigation.emit({
                                type: 'tabLongPress',
                                target: route.key,
                            });
                        };
                        

                        const inputRange = state.routes.map((_, i) => i);
                        const opacity = position.interpolate({
                            inputRange,
                            outputRange: inputRange.map(i => (i === index ? 1 : 0))
                        })

                        return (
                            <TouchableOpacity 
                                key={`tab-${index}`} 
                                onPress={onPress}
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onLongPress={onLongPress}
                                style={style.tab}
                            >
                                {/* <Animated.Text style={opacity as any}>{options.tabBarLabel}</Animated.Text> */}
                                <Text style={style.tabText}>{options.tabBarLabel}</Text>
                                <Animated.View style={[style.tabIndicator, { opacity }]} />
                            </TouchableOpacity>
                        );
                    })
                }
            </View>
        </View>
    );
}

function LoginTab() {
    const auth = useContext(AuthContext);
    const secondRef = useRef();
    const [data, setData] = useState(
        {
            email: '',
            password: ''
        }
    );

    const login = async () => {
        await auth.signIn(data);
    }

    const onChangeText = (name: string, value: string) => setData({ ...data, [name]: value });

    return (
        <View style={[style.mainContainer, style.tabScreenContainer]}>
            <View style={style.centerContainer}>
                <View style={{ width: '100%' }}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={style.inputsContainer}>
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('email', value),
                                    value: data.email,
                                    autoCapitalize: "none" 
                                } as any
                            } 
                            style={{ marginTop: 5 }} 
                            label="Correo Electronico" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: secondRef,
                                    onChangeText: (value: string) => onChangeText('password', value),
                                    value: data.password,
                                    secureTextEntry: true
                                } as any
                            }
                            style={{ marginTop: 25 }}
                            label="Contraseña" 
                        />
                    </KeyboardAwareScrollView>
                </View>
                <View style={style.buttonContainer}>
                    <Button 
                        textStyle={style.btnTextAction} 
                        style={style.btnAction}
                        onPress={login}
                    >
                        Iniciar Sesión
                    </Button>
                    <Footer style={style.footerColor} />
                </View>
            </View>
        </View>
    );
}

const IMAGE_CONFIG: ImagePicker.ImagePickerOptions = {
    aspect: [1, 1],
    quality: 0.3,
  };

function RegisterTab() {
    const auth = useContext(AuthContext);
    const secondRef = useRef();
    const thirdRef = useRef();
    const [data, setData] = useState({
        user_type: 'customer',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const register = async () => {
        try {
            const { data: { token, ...user } } = await httpClient.post(
                '/users',
                data
            );
            console.log(token, user);
            await auth.loadSession(token, user);
        } catch (err) {
            console.log(err);
            console.log((err as AxiosError).response);
            const errors: any = ((err as AxiosError).response?.data as any).errors;
            Alert.alert('Error', Object.keys(errors).map((key: string) => errors[key].join(' ')).join(', '));
        }
    }

    const onChangeText = (name: string, value: string) => setData({ ...data, [name]: value });
    const [photoUrl, setPhotoUrl] = useState('');

    const handleGetImage = async (takeFromCamera: boolean ) => {
        let permission: ImagePicker.CameraPermissionResponse;
        let pickerResult: ImagePicker.ImagePickerResult;
      
        if (takeFromCamera) {
          permission = await ImagePicker.requestCameraPermissionsAsync();
        } else {
          permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        }
        if (permission.granted === false) {
            Alert.alert('Ocorreu um erro', `É necessária a permissão de acesso à ${takeFromCamera ? 'Camera' : 'Galería'} para continuar`,)
            return;
        }
        if (takeFromCamera) {
          pickerResult = await ImagePicker.launchCameraAsync(IMAGE_CONFIG);
        } else {
          pickerResult = await ImagePicker.launchImageLibraryAsync(IMAGE_CONFIG);
        }

        if (!pickerResult.cancelled) {
            setPhotoUrl(pickerResult.uri)
        }
    };

    const handleAlertPicture = () => {
        Alert.alert('Origen de la Foto', 'De donde va a obter la foto?', [
            { text: 'Camara', onPress: () => handleGetImage(true) },
            { text: 'Galeria', onPress: () => handleGetImage(false) }
        ])
    }

    return (
        <View style={[style.mainContainer, style.tabScreenContainer]}>
            <View style={style.centerContainer}>
                <View style={{ width: '100%' }}>
                    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={style.inputsContainer}>
                        <Pressable style={style.pressableImage} onPress={handleAlertPicture}>
                            {
                                !photoUrl ?
                                    <View style={style.imagePlaceholder}>
                                        <FontAwesome name="camera" style={style.iconCamera} />
                                        <Text style={style.textAddImage}>Agregar Imagen</Text>
                                    </View>
                                :
                                <Image source={{ uri: photoUrl }} style={style.imagePhoto} />
                            }
                            </Pressable>
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('email', value),
                                    value: data.email,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Nombre Completo / Empresa" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('email', value),
                                    value: data.email,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Tipo de Documento" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('email', value),
                                    value: data.email,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Número de Documento" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('email', value),
                                    value: data.email,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded 
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Fecha de Nacimiento" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('email', value),
                                    value: data.email,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded 
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Compañía" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('email', value),
                                    value: data.email,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded 
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Código Referido" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('email', value),
                                    value: data.email,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded 
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Tipo de Cliente" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('email', value),
                                    value: data.email,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded 
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Dirección" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => { (secondRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('email', value),
                                    value: data.email,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded 
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Correo Electrónico" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: secondRef,
                                    onSubmitEditing: () => { (thirdRef.current as any).focus()},
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('password', value),
                                    value: data.password,
                                    secureTextEntry: true,
                                    style: style.inputBlueRounded
                                } as any
                            }
                            style={style.labelForInput} 
                            label="Contraseña" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: thirdRef,
                                    onChangeText: (value: string) => onChangeText('password_confirmation', value),
                                    value: data.password_confirmation,
                                    secureTextEntry: true,
                                    style: style.inputBlueRounded
                                } as any
                            }
                            style={style.labelForInput} 
                            label="Confirma tu contraseña" 
                        />
                        <View style={style.extraSpace} />
                    </KeyboardAwareScrollView>
                </View>
                <View style={style.buttonContainer}>
                    <Button textStyle={style.btnTextAction} style={style.btnAction} onPress={register}>
                        Registrarse
                    </Button>
                    <Footer style={style.footerColor} />
                </View>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
    },
    footerColor: {
        color: '#222'
    },
    tabScreenContainer: {
        alignItems: 'center',
    },
    centerContainer: {
        flex: 1,
        width: '85%',
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        position: "absolute",
        bottom: 10,
    },
    btnAction: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: COLORS.primary
    },
    btnTextAction: {
        fontSize: 18,
        fontFamily: 'Montserrat_600SemiBold',
    },
    inputsContainer: {
        width: '100%',
        justifyContent: 'flex-start'
    },
    header: {
        backgroundColor: '#fff',
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        alignItems: 'center',
        marginBottom: 5,
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    tabs: {
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between',
    },
    tab: {
        width: '50%'
    },
    tabText: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
    },
    tabIndicator: {
        backgroundColor: COLORS.secondary,
        height: 3,
        width: '100%'
    },
    extraSpace: {
        height: 100
    },
    inputBlueRounded: {
        borderWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#0BBBEF',
        backgroundColor: '#FFFFFF',
        borderRadius: 13,
        height: 45,
        paddingHorizontal: 15,
        fontFamily: 'Poppins_500Medium',
        marginBottom: 5,
    },
    labelForInput: {
        fontSize: 17,
        fontFamily: 'Poppins_500Medium',
        color: '#787B82'
    },
    pressableImage: {
        marginBottom: 20,
        height: 144,
        width: 144,
        alignSelf: "center",
    },
    imagePlaceholder: {
        height: 144,
        width: 144,
        backgroundColor: '#D9D9D9',
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 72
    },
    iconCamera: {
        fontSize: 42,
        color: '#838383'
    },
    textAddImage: {
        color: '#838383',
        fontFamily: 'Poppins_500Medium',
        fontSize: 12
    },
    imagePhoto: {
        height: 144,
        width: 144,
        borderRadius: 72
    }
});