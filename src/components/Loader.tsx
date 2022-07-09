import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../config';

export default function Loader() {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'}}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  )
}
