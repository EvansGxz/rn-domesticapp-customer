import React from 'react';
import {ScrollView} from 'react-native';
import {View, Text, StyleSheet, Platform} from 'react-native';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';
import {SharedStyles} from '../../../styles/shared-styles';
import {WebView} from 'react-native-webview';
import Constants from 'expo-constants';
import PDFReader from 'rn-pdf-reader-js';

export default function SeePolicy() {
  return (
    <>
      <BackTitledHeader title="Póliza de seguros" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
