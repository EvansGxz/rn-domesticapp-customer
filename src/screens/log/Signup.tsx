/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useRef, useState, useCallback } from 'react';
import { Alert, Image, LogBox, Pressable, Text, TextInput, View } from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested'])

import { httpClient } from "../../controllers/http-client";

// UTILS of REACT
import { AxiosError } from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from "@react-navigation/native";
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// COMPONENTs
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import LabeledInput from "../../components/ui/LabeledInput";

import { style } from '../auth-flow/style';
import { useAuth } from '../../hooks/use-auth';
import { PayloadActionKind } from '../../contexts/authReducer';
import CustomAlert from '../../controllers/Alert';

const IMAGE_CONFIG: ImagePicker.ImagePickerOptions = {
  aspect: [1, 1],
  quality: 0.3,
};

const dateFormat = (value: string) => {
  const cleanString = value.replace(/\D/g, '');
  const replaced = cleanString.replace(/(\d{2})(\d{2})(\d{4})/g, '$1/$2/$3');
  return replaced;
}

interface dataUser {
  user_type: string;
  full_name: string;
  document_type: string;
  document_id: string;
  birth_date: string;
  phone: string;
  company: string;
  cod_refer: string;
  client_type: string;
  region: string;
  country: string | any;
  cc_nit: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export default function Signup() {
  const {loadSession, dispatch} = useAuth();
  const refMap = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null)
  ]

  const [data, setData] = useState<dataUser>({
    user_type: 'customer',
    full_name: '',
    document_type: '',
    document_id: '',
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

  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (data.full_name === '') return CustomAlert({msg: 'Por favor introduzca un Nombre de usuario', type: 'WARNING'});
    else if (data.email === '') return CustomAlert({msg: 'Por favor introduzca un correo electronico', type: 'WARNING'});
    else if (data.country === '') return CustomAlert({msg: 'Por favor introduzca un pais', type: 'WARNING'});
    else if (data.password === '') return CustomAlert({msg: 'Pro favor introduzca una contraseña', type: 'WARNING'});
    else if (data.password !== data.password_confirmation) return CustomAlert({msg: 'Las contraseñas no son iguales', type: 'WARNING'});
    setLoading(true);
    dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: true}});
    try {
      const formData = new FormData();

      formData.append('user_type', data.user_type);
      formData.append('full_name', data.full_name.trimEnd());
      formData.append('document_type', data.document_type);
      formData.append('document_id', data.document_id);
      formData.append('birth_date', data.birth_date);
      formData.append('phone', data.phone.trimEnd());
      formData.append('company', data.company.trimEnd());
      formData.append('cod_refer', data.cod_refer);
      formData.append('client_type', data.client_type);
      formData.append('region', data.region);
      formData.append('country', data.country);
      formData.append('cc_nit', data.cc_nit);
      formData.append('email', data.email.trim());
      formData.append('password', data.password.trimEnd());
      formData.append('password_confirmation', data.password_confirmation.trimEnd());
      if (photoUrl !== '') {
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
      const resp2 = await httpClient.patch('/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token token=${resp.data.token}`
        }
      });
      setLoading(false);
      await loadSession(resp2.data.token, resp2.data);
      dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: false}});
    } catch (err) {
      setLoading(false);
      console.log(err);
      console.log((err as AxiosError).response?.data);
      const errors = ((err as AxiosError).response?.data as any).errors;
      Alert.alert('Error', Object.keys(errors).map((key: string) => `[${key}] ` + errors[key].join(' ')).join(', '));
    }
  }

  const onChangeText = (name: string, value: string) => setData({ ...data, [name]: value });
  const [photoUrl, setPhotoUrl] = useState<string>('');

  const handleGetImage = async (takeFromCamera: boolean) => {
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
  useFocusEffect(useCallback(() => {
    AsyncStorage.getItem('country').then(resp => {
      setCountry(resp);
    })
  }, []))

  const docTypes = [
    // Colombia
    { country: 'col', value: 'cc', label: 'Cédula de Ciudadanía' },
    { country: 'col', value: 'nit', label: 'Número de Identificación Tributaria' },
    { country: 'col', value: 'ce', label: 'Cédula de Extranjería' },
    { country: 'col', value: 'pas', label: 'Pasaporte' },
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
  const countryOptions = [
    { value: 'Colombia', label: 'Colombia' },
    { value: 'España', label: 'España' },
  ]
  const [openModals, setModalOpen] = useState({
    docType: false,
    country: false,
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
                  autoCapitalize: "words",
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
                  setOpen={(value: any) => setModalOpen({
                    clientType: false,
                    docType: value,
                    country: false,
                  }) }
                  setValue={(value: any) => onChangeText('document_type', value())}
                  style={style.picker}
                  placeholder='Selecione un tipo de documento'
                  textStyle={style.textPicker}
                  items={docTypes.filter(dt => dt.country === country)}
                  value={data.document_type}
                />
              </View>
            }
            <LabeledInput
              ref={refMap[0]}
              inputProps={
                {
                  onSubmitEditing: () => refMap[1].current?.focus(),
                  blurOnSubmit: false,
                  returnKeyType: 'next',
                  onChangeText: (value: string) => onChangeText('document_id', value),
                  value: data.document_id,
                  autoCapitalize: "none",
                  style: style.inputBlueRounded
                }
              }
              style={style.labelForInput}
              label="Número de Documento"
            />
            <LabeledInput
              inputProps={
                {
                  blurOnSubmit: false,
                  returnKeyType: 'next',
                  keyboardType: 'number-pad',
                  maxLength: 10,
                  onChangeText: (value: string) => onChangeText('phone', value),
                  value: data.phone,
                  autoCapitalize: "none",
                  style: style.inputBlueRounded
                }
              }
              style={style.labelForInput}
              label="Telefono"
            />
            <LabeledInput
              ref={refMap[1]}
              inputProps={
                {
                  onSubmitEditing: () => refMap[2].current?.focus(),
                  maxLength: 10,
                  blurOnSubmit: false,
                  returnKeyType: 'next',
                  value: data.birth_date,
                  autoCapitalize: "none",
                  placeholder: 'DD/MM/AAAA',
                  keyboardType: 'number-pad',
                  style: style.inputBlueRounded,
                  onChangeText: (value: string) => onChangeText('birth_date', dateFormat(value)),
                }
              }
              style={style.labelForInput}
              label="Fecha de Nacimiento"
            />
            <LabeledInput
              ref={refMap[2]}
              inputProps={
                {
                  onSubmitEditing: () => refMap[3].current?.focus(),
                  blurOnSubmit: false,
                  returnKeyType: 'next',
                  onChangeText: (value: string) => onChangeText('company', value),
                  value: data.company,
                  autoCapitalize: "none",
                  style: style.inputBlueRounded
                }
              }
              style={style.labelForInput}
              label="Compañía"
            />
            <LabeledInput
              ref={refMap[3]}
              inputProps={
                {
                  onSubmitEditing: () => refMap[4].current?.focus(),
                  blurOnSubmit: false,
                  returnKeyType: 'next',
                  onChangeText: (value: string) => onChangeText('cod_refer', value),
                  value: data.cod_refer,
                  autoCapitalize: "none",
                  style: style.inputBlueRounded
                }
              }
              style={style.labelForInput}
              label="Código Referido"
            />
            <View style={{ marginBottom: 10 }}>
              <Text style={[style.pickerLabel, style.labelForInput]}>Tipo de Cliente</Text>
              <DropDownPicker
                closeOnBackPressed
                open={openModals.clientType}
                setOpen={(value: boolean | any) => setModalOpen({
                  docType: false,
                  country: false,
                  clientType: value,
                })}
                setValue={(value: any) => onChangeText('client_type', value())}
                style={style.picker}
                placeholder='Selecione un elemento'
                textStyle={style.textPicker}
                items={clientTypeOptions}
                value={data.client_type}
              />
            </View>
            <LabeledInput
              ref={refMap[4]}
              inputProps={
                {
                  onSubmitEditing: () => refMap[5].current?.focus(),
                  blurOnSubmit: false,
                  returnKeyType: 'next',
                  onChangeText: (value: string) => onChangeText('region', value),
                  value: data.region,
                  autoCapitalize: "none",
                  style: style.inputBlueRounded
                }
              }
              style={style.labelForInput}
              label="Región"
            />
            <View style={{ marginBottom: 10 }}>
              <Text style={[style.pickerLabel, style.labelForInput]}>Pais</Text>
              <DropDownPicker
                closeOnBackPressed
                open={openModals.country}
                setOpen={(value: any) => setModalOpen({
                  country: value,
                  docType: false,
                  clientType: false
                })}
                setValue={(value: any) => onChangeText('country', value())}
                style={style.picker}
                placeholder='Selecione un pais'
                textStyle={style.textPicker}
                items={countryOptions}
                value={data.country}
              />
            </View>
            <LabeledInput
              ref={refMap[6]}
              inputProps={
                {
                  onSubmitEditing: () => refMap[7].current?.focus(),
                  blurOnSubmit: false,
                  returnKeyType: 'next',
                  onChangeText: (value: string) => onChangeText('email', value),
                  value: data.email,
                  autoCapitalize: "none",
                  style: style.inputBlueRounded
                }
              }
              style={style.labelForInput}
              label="Correo Electrónico"
            />
            <LabeledInput
              ref={refMap[7]}
              inputProps={
                {
                  onSubmitEditing: () => refMap[8].current?.focus(),
                  blurOnSubmit: false,
                  returnKeyType: 'next',
                  onChangeText: (value: string) => onChangeText('password', value),
                  value: data.password,
                  secureTextEntry: true,
                  style: style.inputBlueRounded
                }
              }
              style={style.labelForInput}
              label="Contraseña"
            />
            <LabeledInput
              ref={refMap[8]}
              inputProps={
                {
                  onChangeText: (value: string) => onChangeText('password_confirmation', value),
                  value: data.password_confirmation,
                  secureTextEntry: true,
                  style: style.inputBlueRounded
                }
              }
              style={style.labelForInput}
              label="Confirma tu contraseña"
            />
            <View style={style.extraSpace} />
          </_KeyboardAwareScrollView>
        </View>
        <View style={style.buttonContainer}>
          <Button
            disabled={loading ? loading : !(data.password === data.password_confirmation)}
            textStyle={style.btnTextAction}
            style={[style.btnAction, loading && { backgroundColor: '#CCC' }]}
            onPress={() => !loading && register()}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </Button>
          <Footer style={style.footerColor} />
        </View>
      </View>
    </View>
  );
}