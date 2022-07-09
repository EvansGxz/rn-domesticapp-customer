import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { AxiosError } from "axios";
import * as ImagePicker from 'expo-image-picker';
import React, { useCallback, useContext, useRef, useState } from "react";
import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { COLORS } from "../../../config";
import BackTitledHeader from "../../../src/components/headers/BackTitledHeader";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import LabeledInput from "../../components/ui/LabeledInput";
import { AuthContext } from "../../contexts/auth-context";
import { httpClient } from "../../controllers/http-client";
import { useAuth } from "../../hooks/use-auth";
import { SharedStyles } from "../../styles/shared-styles";

export interface DateOutlinedInputProps extends TextInputProps {
    inputRef?: any;
    containerStyle?: StyleProp<ViewStyle>;
}

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
const IMAGE_CONFIG: ImagePicker.ImagePickerOptions = {
    aspect: [1, 1],
    quality: 0.3,
};

const dateFormat = (value: string) => {
    if( value ){
        const cleanString = value.replace(/\D/g, '');
        const replaced = cleanString.replace(/(\d{2})(\d{2})(\d{4})/g, '$1/$2/$3');
        return replaced;
    }
    return ''
}

export default function Profile({navigation}: any) {
    const [userdata, setData] = useState({
        full_name: '',
        document_type: '',
        document_string: '',
        birth_date: '',
        phone: '',
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
    const auth = useContext(AuthContext);
    const [state, functions] = useAuth();
    
    const onChangeText = (name: string, value: string) => setData({ ...userdata, [name]: value });

    const [country, setCountry] = useState<string | null>(null);
    useFocusEffect( useCallback( () => {
        AsyncStorage.getItem('country').then( resp => {
            setCountry(resp);
        } )
        // console.log({ state: state?.user })
        if( state.user ){
            const {user} = state;
            setPhotoUrl(user.image_url);
            const {full_name, document_type, document_string, birth_date, phone, company, cod_refer, client_type, region, country, cc_nit, email} = user;

            // FALTA "document_string", "company", "cc_nit"
            setData({ full_name, document_type, document_string, phone, birth_date: dateFormat(birth_date), company, cod_refer, client_type, region, country, cc_nit, email, password: '', password_confirmation: '' })
        }
    }, [state] ) )
    const [photoUrl, setPhotoUrl] = useState('');

    const [loading, setLoading]= useState(false);
    const _KeyboardAwareScrollView: any = KeyboardAwareScrollView;
    const _FontAwesome: any = FontAwesome;

    const [openModals, setModalOpen] = useState({
        docType: false,
        clientType: false,
    })

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
    
    const editProfile = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            
            formData.append('full_name', userdata.full_name);
            formData.append('document_type', userdata.document_type);
            formData.append('document_string', userdata.document_string);
            formData.append('birth_date', userdata.birth_date);
            formData.append('phone', userdata.phone);
            formData.append('company', userdata.company);
            formData.append('cod_refer', userdata.cod_refer);
            formData.append('client_type', userdata.client_type);
            formData.append('region', userdata.region);
            formData.append('country', userdata.country);
            formData.append('cc_nit', userdata.cc_nit);
            formData.append('email', userdata.email);
            formData.append('password', userdata.password);
            formData.append('password_confirmation', userdata.password_confirmation);
            if( photoUrl !== '' ){
                formData.append('cover', {
                    uri: photoUrl,
                    type: 'image/jpeg',
                    name: `coverimage.jpg`,
                } as any);
            }
            const resp2 = await httpClient.patch('/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Token token=${state.user.token}`
                }
            });
            setLoading(false);
            Alert.alert(
                'Exito',
                'Datos modificado con exito',
                [
                    {text: 'Continuar haciendo cambios', style: 'cancel', onPress: () => {}},
                    {
                    text: 'Salir',
                    style: 'destructive',
                    // If the user confirmed, then we dispatch the action we blocked earlier
                    // This will continue the action that had triggered the removal of the screen
                    onPress: () => navigation.goBack(),
                    },
                ],
            );
            await auth.loadSession(resp2.data.token, resp2.data);
        } catch (err) {
            setLoading(false);
            console.log(err);
            console.log((err as AxiosError).response?.data);
            const errors: any = ((err as AxiosError).response?.data as any).errors;
            Alert.alert('Error', Object.keys(errors).map((key: string) => `[${key}] ` + errors[key].join(' ')).join(', '));
        }
    }

    return (
    <>
        <SafeAreaView style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Editar Mi Perfil" />
            <ScrollView
                style={SharedStyles.fill}
                contentContainerStyle={[SharedStyles.mainPadding, styles.containerCenter]}>
                <_KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.inputsContainer}>
                        <Pressable style={styles.pressableImage} onPress={handleAlertPicture}>
                            {
                                !photoUrl ?
                                    <View style={styles.imagePlaceholder}>
                                        <_FontAwesome name="camera" style={styles.iconCamera} />
                                        <Text style={styles.textAddImage}>Agregar Imagen</Text>
                                    </View>
                                :
                                <View>
                                    <Image source={{ uri: photoUrl }} style={styles.imagePhoto} />
                                    <Pressable style={styles.buttonErase} onPress={() => setPhotoUrl('')}>
                                        <_FontAwesome name="close" style={styles.iconErase} />
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
                                    value: userdata.full_name,
                                    autoCapitalize: "none",
                                    style: styles.inputBlueRounded
                                } as any
                            } 
                            style={styles.labelForInput} 
                            label="Nombre Completo / Empresa" 
                        />
                        {
                            country?.length &&
                            <View style={{ marginBottom: 10, zIndex: 10 }}>
                                <Text style={[styles.pickerLabel, styles.labelForInput]}>Tipo de Documento</Text>  
                                <DropDownPicker
                                    open={openModals.docType}
                                    setOpen={(value: boolean) => setModalOpen({
                                        clientType: false,
                                        docType: value
                                    }) as any}
                                    setValue={(value) => onChangeText('document_type', value())}
                                    style={styles.picker}
                                    placeholder='Selecione un elemento'
                                    textStyle={styles.textPicker}
                                    items={docTypes.filter( dt => dt.country === country )}
                                    value={userdata.document_type}
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
                                    value: userdata.document_string,
                                    autoCapitalize: "none",
                                    style: styles.inputBlueRounded
                                } as any
                            } 
                            style={styles.labelForInput} 
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
                                    value: userdata.birth_date,
                                    autoCapitalize: "none",
                                    style: styles.inputBlueRounded 
                                } as any
                            } 
                            style={styles.labelForInput} 
                            label="Fecha de Nacimiento" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    keyboardType:'number-pad',
                                    maxLength: 10,
                                    onChangeText: (value: string) => onChangeText('phone', value),
                                    value: userdata.phone,
                                    autoCapitalize: "none",
                                    style: styles.inputBlueRounded 
                                } as any
                            } 
                            style={styles.labelForInput} 
                            label="Telefono" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: refMap[2],
                                    onSubmitEditing: () => refMap[3].current?.focus(),
                                    blurOnSubmit: false,
                                    returnKeyType: 'next',
                                    onChangeText: (value: string) => onChangeText('company', value),
                                    value: userdata.company,
                                    autoCapitalize: "none",
                                    style: styles.inputBlueRounded 
                                } as any
                            } 
                            style={styles.labelForInput} 
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
                                    value: userdata.cod_refer,
                                    autoCapitalize: "none",
                                    style: styles.inputBlueRounded 
                                } as any
                            } 
                            style={styles.labelForInput} 
                            label="Código Referido" 
                        />
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[styles.pickerLabel, styles.labelForInput]}>Tipo de Cliente</Text>  
                            <DropDownPicker
                                closeOnBackPressed
                                open={openModals.clientType}
                                setOpen={(value: boolean) => setModalOpen({
                                    docType: false,
                                    clientType: value
                                })}
                                setValue={(value: any) => onChangeText('client_type', value)}
                                style={styles.picker}
                                placeholder='Selecione um elemento'
                                textStyle={styles.textPicker}
                                items={clientTypeOptions}
                                value={userdata.client_type}
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
                                    value: userdata.region,
                                    autoCapitalize: "none",
                                    style: styles.inputBlueRounded 
                                } as any
                            } 
                            style={styles.labelForInput} 
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
                                    value: userdata.country,
                                    autoCapitalize: "none",
                                    style: styles.inputBlueRounded 
                                } as any
                            } 
                            style={styles.labelForInput} 
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
                                    value: userdata.cc_nit,
                                    autoCapitalize: "none",
                                    style: styles.inputBlueRounded 
                                } as any
                            } 
                            style={styles.labelForInput} 
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
                                    value: userdata.email,
                                    autoCapitalize: "none",
                                    style: styles.inputBlueRounded 
                                } as any
                            } 
                            style={styles.labelForInput} 
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
                                    value: userdata.password,
                                    secureTextEntry: true,
                                    style: styles.inputBlueRounded
                                } as any
                            }
                            style={styles.labelForInput} 
                            label="Contraseña" 
                        />
                        <LabeledInput 
                            inputProps={
                                {
                                    ref: refMap[9],
                                    onChangeText: (value: string) => onChangeText('password_confirmation', value),
                                    value: userdata.password_confirmation,
                                    secureTextEntry: true,
                                    style: styles.inputBlueRounded
                                } as any
                            }
                            style={styles.labelForInput} 
                            label="Confirma tu contraseña" 
                        />
                        <View style={styles.extraSpace} />
                    </_KeyboardAwareScrollView>
                <Button disabled={loading} style={[SharedStyles.backgroundPrimary, loading && { backgroundColor: '#CCC' }]} onPress={() => loading ? null : editProfile()}>{loading ? 'Cargando...' : 'Continuar'}</Button>
            </ScrollView>
            <Footer />
        </SafeAreaView>
    </>
    );
}

const styles = StyleSheet.create({
    containerCenter: {
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.primary,
        borderRadius: 13,
        borderWidth: 2,
    },
    input: {
        padding: 10,
        marginBottom: 25
    },
    inputCalendar: {
        flex: 1,
        padding: 10,
        width: '100%',
        textAlign: 'center',
        fontSize: 24
    },
    h2: {
        ...SharedStyles.h2,
        marginBottom: 5,
        marginTop: 5,
        fontFamily: 'Poppins_500Medium',
        fontSize: 17
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)'
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
    },
    extraSpace: {
        height: 20
    },
    inputsContainer: {
        width: '100%',
        justifyContent: 'flex-start'
    },
});