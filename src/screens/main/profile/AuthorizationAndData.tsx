import React, {useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';
import Button from '../../../components/ui/Button';
import {SharedStyles} from '../../../styles/shared-styles';
import {WebView} from 'react-native-webview';
import Constants from 'expo-constants';

export default function AuthorizationAndData() {
  const [openWebView, setOpenWebView] = useState(false);

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Autorización y Tratamiento de Datos" />
      <ScrollView
        style={SharedStyles.fill}
        contentContainerStyle={SharedStyles.mainPadding}>
        <Text style={SharedStyles.h2}>GARANTÍA Y PROTECCIÓN DE DATOS</Text>
        <Text style={[SharedStyles.p, {textAlign: 'justify'}]}>
          En el tratamiento de los datos de carácter personal, DOMESTICAPP se
          compromete a garantizar y proteger las libertades públicas y los
          derechos fundamentales de las personas físicas de los ficheros y,
          especialmente, su y su intimidad familiar y personal, obligándose en
          este sentido, a efectuar el correspondiente tratamiento de datos de
          acuerdo con la normativa vigente en cada momento y a guardar el más
          absoluto secreto en relación con la información entregada por los
          clientes y usuarios.
        </Text>
        <Text style={SharedStyles.h2}>CALIDAD DE LOS DATOS</Text>
        <Text style={[SharedStyles.p, {textAlign: 'justify'}]}>
          Los usuarios y clientes deberán velar por el cumplimiento de todas las
          medidas técnicas y organizativas necesarias con la finalidad de
          garantizar la seguridad de los datos de carácter personal, evitando su
          alteración, pérdida, tratamiento o acceso no autorizado. Los datos que
          se comuniquen a través de la aplicación tendrán que ser exactos y
          puestos al día siendo de exclusiva responsabilidad de los clientes y
          usuarios la actualización de estos datos.
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
              uri: 'https://domesticapp-storage.s3.us-east-2.amazonaws.com/pdf/AUTORIZACI%C3%93N+Y+TRATAMIENTO+DE+DATOS+DOMESTICAPP+2022.pdf',
              baseUrl: '',
            }}
            style={[styles.container]}
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
