import React, { useCallback, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeHero() {
  const imageRef = useRef(new Animated.Value(-100)).current;


  useFocusEffect(useCallback(() => {
    Animated.timing(imageRef, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.elastic(2),
    }).start();
    return () => Animated.timing(imageRef, {
      toValue: -100,
      duration: 1000,
      useNativeDriver: true,
    }).reset();
  }, []));

  return (
    <Animated.Image
      resizeMode="cover"
      style={{height: 300, width: '100%', transform: [{translateY: imageRef}]}}
      source={require('../../resources/img/ui/dashboard-img.png')}
    />
  );
}
