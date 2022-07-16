import React from 'react';
import {View} from 'react-native';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';
// import PDFReader from 'rn-pdf-reader-js';

export default function SeePolicy() {
  return (
    <>
      <BackTitledHeader title="Póliza de seguros" />
      <View style={{flex: 1}}>
        {/* <PDFReader
          source={{
            uri: 'http://domesticapp-storage.s3.us-east-2.amazonaws.com/pdf/AUTORIZACIÓN+Y+TRATAMIENTO+DE+DATOS+DOMESTICAPP+2022.pdf',
          }}
        /> */}
      </View>
    </>
  );
}