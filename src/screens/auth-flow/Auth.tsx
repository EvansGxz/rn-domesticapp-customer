/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps
} from "@react-navigation/material-top-tabs";
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import DomIcon from '../../resources/img/ui/dom-app-icon.svg';
import { style } from "./style";

// SCREENs
import Signin from '../log/Signin';
import Signup from '../log/Signup';

type TabLogParamList = {
  Login: undefined;
  Register: undefined;
}

const Tab = createMaterialTopTabNavigator<TabLogParamList>();

export default function Auth() {
  return (
    <SafeAreaView style={style.mainContainer}>
      <Tab.Navigator tabBar={(props: MaterialTopTabBarProps) => <TabsMenu {...props} />}>
        <Tab.Screen name="Login" options={{ tabBarLabel: 'Iniciar Sesión' }} component={Signin} />
        <Tab.Screen name="Register" options={{ tabBarLabel: 'Registrarse' }} component={Signup} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

function TabsMenu({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {

  return (
    <View style={style.header}>
      <DomIcon />
      <View style={style.tabs}>
        {
          state.routes.map((route, index) => {
            const { options }: any = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event: any = navigation.emit({
                type: 'tabPress',
                target: route.key
              } as any);
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };


            const inputRange = state.routes.map((_, i) => i);
            const opacity = position.interpolate({
              inputRange,
              outputRange: inputRange.map(i => (i === index ? 1 : 0))
            })

            return (
              <TouchableOpacity
                key={`tab-${index}`}
                onPress={onPress}
                style={style.tab}
                onLongPress={onLongPress}
                accessibilityRole="button"
                testID={options.tabBarTestID}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                accessibilityState={isFocused ? { selected: true } : {}}>
                <Text style={style.tabText}>{options.tabBarLabel}</Text>
                <Animated.View style={[style.tabIndicator, { opacity }]} />
              </TouchableOpacity>
            );
          })
        }
      </View>
    </View>
  );
}