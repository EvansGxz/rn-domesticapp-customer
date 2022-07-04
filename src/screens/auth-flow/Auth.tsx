import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import { AxiosError } from "axios";
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Alert, Animated, Image, LogBox, Platform, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../config";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import LabeledInput from "../../components/ui/LabeledInput";
import { AuthContext } from "../../contexts/auth-context";
import { httpClient } from "../../controllers/http-client";
import DomIcon from '../../resources/img/ui/dom-app-icon.svg';
import DropDownPicker from 'react-native-dropdown-picker';

const Tab: any = createMaterialTopTabNavigator();

export default function Auth() {
    return (
        <SafeAreaView style={style.mainContainer}>
            <Tab.Navigator tabBar={(props: any) => <TabsMenu {...props} />}>
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
    const _KeyboardAwareScrollView: any = KeyboardAwareScrollView
    return (
        <View style={[style.mainContainer, style.tabScreenContainer]}>
            <View style={style.centerContainer}>
                <View style={{ width: '100%' }}>
                    <_KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={style.inputsContainer}>
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
                    </_KeyboardAwareScrollView>
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

const dateFormat = (value: string) => {
    const cleanString = value.replace(/\D/g, '');
    const replaced = cleanString.replace(/(\d{2})(\d{2})(\d{4})/g, '$1/$2/$3');
    return replaced;
}

LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

function RegisterTab() {
    const auth = useContext(AuthContext);

    const refMap = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
    ]

    const [data, setData] = useState({
        user_type: 'customer',
        full_name: '',
        document_type: '',
        document_string: '',
        birth_date: '',
        company: '',
        cod_refer: '',
        client_type: '',
        region: '',
        country: '',
        cc_nit: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [loading, setLoading]= useState(false);

    const register = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            
            formData.append('user_type', data.user_type);
            formData.append('full_name', data.full_name);
            formData.append('document_type', data.document_type);
            formData.append('document_string', data.document_string);
            formData.append('birth_date', data.birth_date);
            formData.append('company', data.company);
            formData.append('cod_refer', data.cod_refer);
            formData.append('client_type', data.client_type);
            formData.append('region', data.region);
            formData.append('country', data.country);
            formData.append('cc_nit', data.cc_nit);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('password_confirmation', data.password_confirmation);
            if( photoUrl !== '' ){
                formData.append('cover', {
                    uri: photoUrl,
                    type: 'image/jpeg',
                    name: `coverimage.jpg`,
                } as any);
            }
            const resp = await httpClient.post('/users', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            setLoading(false);
            await auth.loadSession(resp.data.token, resp.data);
        } catch (err) {
            setLoading(false);
            console.log(err);
            console.log((err as AxiosError).response?.data);
            const errors: any = ((err as AxiosError).response?.data as any).errors;
            Alert.alert('Error', Object.keys(errors).map((key: string) => `[${key}] ` + errors[key].join(' ')).join(', '));
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
            { text: 'Cancelar' },
            { text: 'Camara', onPress: () => handleGetImage(true) },
            { text: 'Galeria', onPress: () => handleGetImage(false) },
        ])
    }
    const _KeyboardAwareScrollView: any = KeyboardAwareScrollView;
    const _FontAwesome: any = FontAwesome;

    const [country, setCountry] = useState<string | null>(null)
    useFocusEffect( useCallback( () => {
        AsyncStorage.getItem('country').then( resp => {
            setCountry(resp);
        } )
    }, [] ) )

    const docTypes = [
        // Colombia
        { country: 'col', value: 'cc', label: 'Cédula de Ciudadanía'},
        { country: 'col', value: 'nit', label: 'Número de Identificación Tributaria'},
        { country: 'col', value: 'ce', label: 'Cédula de Extranjería'},
        { country: 'col', value: 'pas', label: 'Pasaporte'},
        // Espanha
        { country: 'esp', value: 'dni', label: 'Documento Nacional de Identidad' },
        { country: 'esp', value: 'te', label: 'Tarjeta de Extranjería' },
        { country: 'esp', value: 'pes', label: 'Pasaporte Español' },
        { country: 'esp', value: 'sch', label: 'Visado "Schengen"' },
        { country: 'esp', value: 'rue', label: 'Permiso de Residencia de la UE.' },
    ]

    const clientTypeOptions = [
        { value: 'Persona', label: 'Persona' },
        { value: 'Empresa', label: 'Empresa' },
    ]
    const [openModals, setModalOpen] = useState({
        docType: false,
        clientType: false,
    })
    return (
        <View style={[style.mainContainer, style.tabScreenContainer]}>
            <View style={style.centerContainer}>
                <View style={{ width: '100%' }}>
                    <_KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={style.inputsContainer}>
                        <Pressable style={style.pressableImage} onPress={handleAlertPicture}>
                            {
                                !photoUrl ?
                                    <View style={style.imagePlaceholder}>
                                        <_FontAwesome name="camera" style={style.iconCamera} />
                                        <Text style={style.textAddImage}>Agregar Imagen</Text>
                                    </View>
                                :
                                <View>
                                    <Image source={{ uri: photoUrl }} style={style.imagePhoto} />
                                    <Pressable style={style.buttonErase} onPress={() => setPhotoUrl('')}>
                                        <_FontAwesome name="close" style={style.iconErase} />
                                    </Pressable>
                                </View>
                            }
                            </Pressable>
                        <LabeledInput 
                            inputProps={
                                {
                                    onSubmitEditing: () => refMap[0].current?.focus(),
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('full_name', value),
                                    value: data.full_name,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Nombre Completo / Empresa" 
                        />
                        {
                            country?.length &&
                            <View style={{ marginBottom: 10, zIndex: 10 }}>
                                <Text style={[style.pickerLabel, style.labelForInput]}>Tipo de Documento</Text>  
                                <DropDownPicker
                                    open={openModals.docType}
                                    setOpen={(value: boolean) => setModalOpen({
                                        clientType: false,
                                        docType: value
                                    }) as any}
                                    setValue={(value) => onChangeText('document_type', value())}
                                    style={style.picker}
                                    placeholder='Selecione um elemento'
                                    textStyle={style.textPicker}
                                    items={docTypes.filter( dt => dt.country === country )}
                                    value={data.document_type}
                                />
                            </View>
                        }
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: refMap[0],
                                    onSubmitEditing: () => refMap[1].current?.focus(),
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('document_string', value),
                                    value: data.document_string,
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
                                    ref: refMap[1],
                                    onSubmitEditing: () => refMap[2].current?.focus(),
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    keyboardType:'number-pad',
                                    maxLength: 10,
                                    onChangeText: (value: string) => onChangeText('birth_date', dateFormat(value)),
                                    value: data.birth_date,
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
                                    ref: refMap[2],
                                    onSubmitEditing: () => refMap[3].current?.focus(),
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('company', value),
                                    value: data.company,
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
                                    ref: refMap[3],
                                    onSubmitEditing: () => refMap[4].current?.focus(),
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('cod_refer', value),
                                    value: data.cod_refer,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded 
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Código Referido" 
                        />
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[style.pickerLabel, style.labelForInput]}>Tipo de Cliente</Text>  
                            <DropDownPicker
                                closeOnBackPressed
                                open={openModals.clientType}
                                setOpen={(value: boolean) => setModalOpen({
                                    docType: false,
                                    clientType: value
                                })}
                                setValue={(value) => onChangeText('client_type', value())}
                                style={style.picker}
                                placeholder='Selecione um elemento'
                                textStyle={style.textPicker}
                                items={clientTypeOptions}
                                value={data.client_type}
                            />
                        </View>
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: refMap[4],
                                    onSubmitEditing: () => refMap[5].current?.focus(),
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('region', value),
                                    value: data.region,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded 
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Región" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: refMap[5],
                                    onSubmitEditing: () => refMap[6].current?.focus(),
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('country', value),
                                    value: data.country,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded 
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="Pais" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: refMap[6],
                                    onSubmitEditing: () => refMap[7].current?.focus(),
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('cc_nit', value),
                                    value: data.cc_nit,
                                    autoCapitalize: "none",
                                    style: style.inputBlueRounded 
                                } as any
                            } 
                            style={style.labelForInput} 
                            label="CC / NIT" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: refMap[7],
                                    onSubmitEditing: () => refMap[8].current?.focus(),
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
                                    ref: refMap[8],
                                    onSubmitEditing: () => refMap[9].current?.focus(),
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
                                    ref: refMap[9],
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
                    </_KeyboardAwareScrollView>
                </View>
                <View style={style.buttonContainer}>
                    <Button disabled={loading} textStyle={style.btnTextAction} style={[style.btnAction, loading && { backgroundColor: '#CCC' }]} onPress={() => loading ? null : register()}>
                        {loading ? 'Cargando...' : 'Registrarse'}
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
        color: '#787B82',
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
    iconErase: {
        fontSize: 20,
        color: '#FFF'
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
    },
    buttonErase: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: '#F00',
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        height: 25,
        width: 25,
    },
    picker: {
        borderWidth: 2,
        borderBottomWidth: 2,
        borderColor: '#0BBBEF',
        backgroundColor: '#FFFFFF',
        borderRadius: 13,
        height: 45,
        justifyContent: 'center',
    },
    pickerLabel: {
        opacity: 0.4,
        marginBottom: 5
    },
    textPicker: {
        fontFamily: 'Poppins_500Medium',
    }
});