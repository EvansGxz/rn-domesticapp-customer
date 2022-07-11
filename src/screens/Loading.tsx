import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
// import { AuthContext } from '../contexts/auth-context';

export default function Loading() {
  // const [state, function] = React.useContext(AuthContext);

  const newLocal = 'none';
  const value = true;
  return (
    <View style={value ? style.conte : {display: newLocal}}>
      <ActivityIndicator size="large" color="#0BBBEF" />
    </View>
  );
}
const style = StyleSheet.create({
  conte: {
    flex: 1,
    position: 'absolute',
    zIndex: 9999,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 38, 57, 0.9)',
  },
});
