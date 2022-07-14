import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text} from 'react-native';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';
import Button from '../../../components/ui/Button';
import TextArea from '../../../components/ui/TextArea';
import {SharedStyles} from '../../../styles/shared-styles';
import * as Linking from 'expo-linking';
import {useNavigation} from '@react-navigation/native';

export default function Reports() {
  const navigation = useNavigation<any>();
  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Daños y Accidentes" />
      <ScrollView
        style={[SharedStyles.fill]}
        contentContainerStyle={SharedStyles.mainPadding}>
        <Text style={SharedStyles.p}>
          Recuerda que los reportes deben de realizarse dentro de las primeras
          48 hrs.
        </Text>
        <Text style={SharedStyles.h2}>Accidente, Objeto Dañado</Text>
        <Text style={[SharedStyles.p, SharedStyles.mb]}>
          Adjunta una imagen o video del percance, así como una descripción de
          la eventualidad.
        </Text>
        <Button
          style={[
            SharedStyles.backgroundPrimary,
            SharedStyles.mb,
            SharedStyles.pd,
          ]}
          onPress={() => {
            navigation.navigate('SeePolicyMain');
          }}>
          Ver Poliza de Seguros
        </Button>
        <Button
          style={[
            SharedStyles.backgroundPrimary,
            SharedStyles.mb,
            SharedStyles.pd,
          ]}
          onPress={() => {
            navigation.navigate('SeeJobSecurity');
          }}>
          Ver Seguridad Laboral Empleados
        </Button>
        <Text style={SharedStyles.h2}>Descripción:</Text>
        <TextArea placeholder="Escribe aquí la descripción del evento que ocasionó el accidente, daño o situación..." />
        <Text style={SharedStyles.h2}>Archivos:</Text>
        <Button
          style={[
            SharedStyles.backgroundPrimary,
            SharedStyles.mb,
            SharedStyles.pd,
          ]}>
          Adjuntar Archivo
        </Button>
        <Button
          style={[
            SharedStyles.backgroundPrimary,
            SharedStyles.mb,
            SharedStyles.pd,
          ]}>
          Enviar
        </Button>
        <Button
          style={[
            SharedStyles.backgroundPrimary,
            SharedStyles.mb,
            SharedStyles.pd,
          ]}
          onPress={() =>
            Linking.openURL('https://wa.me/18444684329?text=Necesito ayuda')
          }>
          Conecta con Soporte
        </Button>
      </ScrollView>
    </View>
  );
}
