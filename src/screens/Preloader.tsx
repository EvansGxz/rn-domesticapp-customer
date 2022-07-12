import React from 'react';
import {StyleSheet, View, ActivityIndicator, SafeAreaView, Dimensions} from 'react-native';
import { useAuth } from '../hooks/use-auth';

const {width, height} = Dimensions.get('screen');

export default function Loading() {
  const {state} = useAuth();

  return (
    <SafeAreaView>
      <View style={state.preloader ? style.conte : {display: 'none'}}>
        <ActivityIndicator size="large" color="#0BBBEF" />
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  conte: {
    flex: 1,
    position: 'absolute',
    zIndex: 9999,
    width,
    height,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(36, 38, 57, 0.7)',
  },
});
