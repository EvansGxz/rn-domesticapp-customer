import React, {useState} from 'react';
import {ScrollView, View, Text, Alert, StyleSheet} from 'react-native';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';
import Button from '../../../components/ui/Button';
import {SharedStyles} from '../../../styles/shared-styles';
import {downloadFileFromUri, openDownloadedFile} from 'expo-downloads-manager';
import {WebView} from 'react-native-webview';
import Constants from 'expo-constants';

export default function PrivacyPolicy() {
  const [openWebView, setOpenWebView] = useState(false);
  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Politica de Privacidad" />
      <ScrollView
        style={SharedStyles.fill}
        contentContainerStyle={SharedStyles.mainPadding}>
        <Text style={[SharedStyles.h2, {textAlign: 'justify'}]}>
          DOMESTICAPP desea poner en conocimiento de los usuarios y clientes de
          la/s aplicación/es y servicios, la política llevada a cabo respecto al
          tratamiento de todos los datos de carácter personal que por la
          utilización de las funciones de la/s aplicación/es se faciliten a la
          empresa.
        </Text>
        <Text style={SharedStyles.h2}>
          1.- IDENTIFICACIÓN DEL RESPONSABLE DEL FICHERO
        </Text>
        <Text style={[SharedStyles.p, {textAlign: 'justify'}]}>
          DOMESTICAPP S.A.S. (en adelante DOMESTICAPP) con domicilio social en
          Medellín Colombia, dirección Calle 9 sur #79C-151 e inscrito en la
          Cámara de Comercio de Medellín., informa a los usuarios y clientes de
          la aplicación de la existencia de un fichero automatizado de datos
          personales cuyo responsable es DOMESTICAPP.
        </Text>
        <Text style={SharedStyles.h2}>2.- FINALIDAD DEL FICHERO</Text>
        <Text style={[SharedStyles.p, {textAlign: 'justify'}]}>
          Todos los datos que se solicitan a los usuarios y clientes a través de
          la aplicación para dispositivos móviles y el portal web serán
          necesarios para prestar el servicio objeto del servicio en virtud del
          cual se ha procedido a la descarga e instalación de la/s aplicación/es
          en los correspondientes dispositivos.
        </Text>
      </ScrollView>
      <View style={[SharedStyles.centerContent, SharedStyles.mainPadding]}>
        <Button
          style={SharedStyles.backgroundPrimary}
          onPress={() => {
            setOpenWebView(true);
          }}>
          Descargar documento
        </Button>
        {openWebView ? (
          <WebView
            originWhitelist={['*']}
            source={{
              uri: 'domesticapp-storage.s3.us-east-2.amazonaws.com/pdf/POLITICA+DE+PRIVACIDAD+DOMESTICAPP+2022.pdf',
              baseUrl: '',
            }}
            style={[styles.container, {flex: 1, height: 2}]}
          />
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
