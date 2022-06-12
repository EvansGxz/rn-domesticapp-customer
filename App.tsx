import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/screens/auth-flow/Welcome';
import Verification from './src/screens/auth-flow/Verification';
import Auth from './src/screens/auth-flow/Auth';
import SplashScreen from './src/screens/SplashScreen';
import OnBoarding from './src/screens/auth-flow/OnBoarding';
import MainBottomNavigation from './src/screens/main/BottomNavigation';
import Profile from './src/screens/shared/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isAuth, setAuth] = useState(false);
  const [isLoading, setLoading] = useState(false);

  if (isLoading) return <SplashScreen />

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          isAuth ? (
            <>
              <Stack.Screen name="Verification" component={Verification} />
              <Stack.Screen name="Welcome" component={Welcome} />
            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Main" component={MainBottomNavigation} />
              <Stack.Screen name="Auth" component={Auth} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="Verification" component={Verification} />
              <Stack.Screen name="OnBoarding" component={OnBoarding} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}