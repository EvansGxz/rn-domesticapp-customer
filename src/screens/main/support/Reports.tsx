/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import * as Linking from 'expo-linking';
import { View, Text, ScrollView } from "react-native";
import DocumentPicker from 'react-native-document-picker';

// COMPONENTs
import Button from "../../../components/ui/Button";
import TextArea from "../../../components/ui/TextArea";
import { SharedStyles } from "../../../styles/shared-styles";
import LineORSeparator from '../../../components/ui/LineORSeparator';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

// CONTROLLERs
import Alert from "../../../controllers/Alert";
import { useAuth } from "../../../hooks/use-auth";
import { httpClient } from "../../../controllers/http-client";
import { PayloadActionKind } from "../../../contexts/authReducer";
import {useNavigation} from '@react-navigation/native';


export default function Reports() {
  const {state, dispatch} = useAuth();
  const [description, setDescription] = useState<string>('');
  const [file, setFile] = useState<any>();
  const navigation = useNavigation<any>();

  const payload = async () => {
    if (description === '') return Alert({msg: 'Por favor comentanos tu situación', type: 'WARNING'});
    else if (file !== undefined) {
      dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: true}});
      try {
        const formData = new FormData();
        formData.append('name', 'cliente');
        formData.append('body', description);
        formData.append('customer_id', state.user?.id);
        formData.append('employee_id', '16');
        formData.append('cover', {
          uri: file.uri,
          type: file.type,
          name: file.name,
        } as any);
        await httpClient.post(`/reports`, formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        });
        dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: false}});
        Alert({msg: 'Gracias por notificarnos tu situación', type: 'SUCCESS'});
      } catch (error) {
        dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: false}});
        Alert({msg: 'Por favor intentelo más tarde', type: 'WARNING'});
        console.log(error);
      }
    } else {
      Alert({msg: 'Por favor seleccione un archivo', type: 'WARNING'});
    }
  }

  const handleSelectFile = async () => {
    try {
      const types = DocumentPicker.types;
      const res = await DocumentPicker.pick({
        type: [types.pdf],
      });
      setFile(res[0]);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        Alert({msg: 'No ha seleccionado ningún archivo', type: 'WARNING'});
      } else {
        Alert({msg: `Error desconocido: ${JSON.stringify(error)}`, type: 'DANGER'});
        throw error;
      }
    }
  }

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Daños y Accidentes" />
      <ScrollView style={[SharedStyles.fill]} contentContainerStyle={SharedStyles.mainPadding}>
        <Text style={SharedStyles.p}>
          Recuerda que los reportes deben de realizarse dentro de
          las primeras 48 hrs.
        </Text>
        <Text style={SharedStyles.h2}>Accidente, Objeto Dañado</Text>
        <Text style={[SharedStyles.p, SharedStyles.mb]}>
          Adjunta una imagen o video del percance, así como una descripción de la eventualidad.
        </Text>
        <Button
          style={[
            SharedStyles.backgroundPrimary,
            SharedStyles.mb,
            SharedStyles.pd]}
            onPress={() => {
              navigation.navigate('SeePolicyMain');
            }}>Ver Poliza de Seguros</Button>
        <Button 
          onPress={() => {
            navigation.navigate('SeeJobSecurity');
          }}
          style={[SharedStyles.backgroundPrimary, SharedStyles.mb, SharedStyles.pd]}>
          Ver Seguridad Laboral Empleados
        </Button>
        <Text style={SharedStyles.h2}>Descripción:</Text>
        <TextArea
          onChangeText={v => setDescription(v)}
          placeholder="Escribe aquí la descripción del evento que ocasionó el accidente, daño o situación..."
        />
        <Text style={SharedStyles.h2}>Archivos:</Text>
        <View style={{alignItems: 'center'}}>
          <Button
            onPress={handleSelectFile}
            style={[
              SharedStyles.backgroundPrimary,
              SharedStyles.mb,
              SharedStyles.pd
            ]}>Adjuntar Archivo</Button>
          <Button
            onPress={payload}
            style={[
              SharedStyles.backgroundPrimary,
              SharedStyles.mb,
              SharedStyles.pd
            ]}>Enviar</Button>
          <LineORSeparator />
          <Button
            onPress={() =>
              Linking.openURL('https://wa.me/18444684329?text=Necesito ayuda')
            }
            style={[
              SharedStyles.backgroundPrimary,
              SharedStyles.pd, {marginTop: 25}
            ]}>Conecta con Soporte</Button>
        </View>
      </ScrollView>
    </View>
  );
}
