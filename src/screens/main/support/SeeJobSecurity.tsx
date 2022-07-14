import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text} from 'react-native';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';
import {SharedStyles} from '../../../styles/shared-styles';
import PDFReader from 'rn-pdf-reader-js';

export default function SeeJobSecurity() {
  return (
    <>
      <BackTitledHeader title="Seguridad Laboral empleados" />
      <View style={{flex: 1}}>
        <PDFReader
          source={{
            uri: 'http://domesticapp-storage.s3.us-east-2.amazonaws.com/pdf/AUTORIZACIÓN+Y+TRATAMIENTO+DE+DATOS+DOMESTICAPP+2022.pdf',
          }}
        />
      </View>
    </>
  );
}
