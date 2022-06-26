import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity, Alert, Platform, PermissionsAndroid} from 'react-native';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Button from "../../../components/ui/Button";
import { SharedStyles } from "../../../styles/shared-styles";
import * as Permissions from 'expo';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';
import {
  checkFileIsAvailable,
  downloadFileFromUri,
  openDownloadedFile,
} from "expo-downloads-manager";

export default function PrivacyPolicy() {
    /* const downloadFile = () =>{
        const uri = "http://techslides.com/demos/sample-videos/small.mp4"
        let fileUri = FileSystem.documentDirectory + "small.mp4";
        FileSystem.downloadAsync(uri, fileUri)
        .then(({ uri }) => {
            saveFile(uri);
          })
          .catch(error => {
            console.error(error);
          })
    }

    const saveFile = async (fileUri: string) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
        }
    } */

    /* const onShare = async (url:string) => {
        try {
          return Share.share({
            message: 'Choose location to save pdf file',
            url: url,
          });
        } catch (error) {
          return error;
        }
      };

    let downloadDocument = async (downloadUrl:string) => {
        let fileURI = await downloadAsync(
          downloadUrl,
          `${documentDirectory}name.pdf`,
          {},
        );
        await onShare(fileURI.uri);
      }; */

    /* const historyDownload = () =>{
      //Function to check the platform
      //If iOS the start downloading
      //If Android then ask for runtime permission
      if (Platform.OS === 'ios') {
        downloadHistory();
      } else {
        try {
            PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title:'storage title',
              message:'storage_permission',
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK",
            },
          ).then(granted => {
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              //Once user grant the permission start downloading
              console.log('Storage Permission Granted.');
              downloadHistory();
            } else {
              // If permission denied then show alert 'Storage Permission
              // Not Granted'
              Alert.alert('storage_permission');
            }
          });
        } catch (err) {
          //To handle permission related issue
          console.log('error', err);
        }
      }
    }

    const  downloadHistory = async () => {
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let date = new Date();
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/Report_Download' +
          Math.floor(date.getTime() + date.getSeconds() / 2),
        description: 'Risk Report Download',
      },
    };
    config(options)
      .fetch('GET',"http://www.example.com/images/img1.png")
      .then((res) => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('Report Downloaded Successfully.');
      });
   } */
   const uri ="https://www.ing.unlp.edu.ar/sitio/ingreso/archivos/Mate-PI-2018-Modulo-1-CIAF.pdf";
   const fileName = "sampleNew.pdf";

   const [downloadStatus, setDownloadStatus] = React.useState("NOTSTARTED");
   const [downloadProgress, setDownloadProgress] = React.useState(0);

   const callback = (downloadProgress: any) => {
    const progress =
      downloadProgress.totalBytesWritten /
      downloadProgress.totalBytesExpectedToWrite;
    setDownloadProgress(progress);
  };

   return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Politica de Privacidad" />
            <ScrollView style={SharedStyles.fill} contentContainerStyle={SharedStyles.mainPadding}>
                <Text style={[SharedStyles.h2, { textAlign: 'justify' }]}>
                    DOMESTICAPP desea poner en conocimiento de los usuarios y clientes de la/s aplicación/es y servicios, la política llevada a cabo respecto al tratamiento de todos los datos de carácter personal que por la utilización de las funciones de la/s aplicación/es se faciliten a la empresa.
                </Text>
                <Text style={SharedStyles.h2}>1.- IDENTIFICACIÓN DEL RESPONSABLE DEL FICHERO</Text>
                <Text style={[SharedStyles.p, { textAlign: 'justify' }]}>
                    DOMESTICAPP S.A.S. (en adelante DOMESTICAPP) con domicilio social en Medellín Colombia, dirección Calle 9 sur #79C-151 e inscrito en la Cámara de Comercio de Medellín., informa a los usuarios y clientes de la aplicación de la existencia de un fichero automatizado de datos personales cuyo responsable es DOMESTICAPP.
                </Text>
                <Text style={SharedStyles.h2}>2.- FINALIDAD DEL FICHERO</Text>
                <Text style={[SharedStyles.p, { textAlign: 'justify' }]}>
                    Todos los datos que se solicitan a los usuarios y clientes a través de la aplicación para dispositivos móviles y el portal web serán necesarios para prestar el servicio objeto del servicio en virtud del cual se ha procedido a la descarga e instalación de la/s aplicación/es en los correspondientes dispositivos.
                </Text>
            </ScrollView>
            <View style={[SharedStyles.centerContent, SharedStyles.mainPadding]}>
                <Button style={SharedStyles.backgroundPrimary} onPress={async () => {
            const { status, error } = await downloadFileFromUri(
              uri,
              fileName,
              callback
        );
        Alert.alert("Se descargo el archivo pdf")
      }}>Descargar documento</Button>
            </View>
            {downloadStatus == "FINISHED" && (
            <View style={[SharedStyles.centerContent, SharedStyles.mainPadding]}>
              <Button style={SharedStyles.backgroundPrimary} onPress={async () => {
                await openDownloadedFile(fileName)
                }}>Abrir</Button>
            </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
});