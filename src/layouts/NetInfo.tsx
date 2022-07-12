import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import { COLORS } from '../../config';
import { SharedStyles } from '../styles/shared-styles';
export default function NoInternet() {
  return (
    <ImageBackground style={style.container} source={require('../../assets/splash.png')}>
      <View style={style.modal}>
        <View style={[SharedStyles.card, {marginHorizontal: 20}]}>
          <Text style={style.h1}>No hay acceso a <Text style={{fontWeight: 'bold'}}>internet...</Text></Text>
          <Text style={style.h1}>Ocurrido un error, por favor inténtelo de nuevo más tarde</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1: {
    color: COLORS.primary,
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 10,
  },
});
