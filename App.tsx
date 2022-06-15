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
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import {
Montserrat_100Thin,
Montserrat_200ExtraLight,
Montserrat_300Light,
Montserrat_400Regular,
Montserrat_500Medium,
Montserrat_600SemiBold,
Montserrat_700Bold,
Montserrat_800ExtraBold,
Montserrat_900Black,
Montserrat_100Thin_Italic,
Montserrat_200ExtraLight_Italic,
Montserrat_300Light_Italic,
Montserrat_400Regular_Italic,
Montserrat_500Medium_Italic,
Montserrat_600SemiBold_Italic,
Montserrat_700Bold_Italic,
Montserrat_800ExtraBold_Italic,
Montserrat_900Black_Italic,
} from '@expo-google-fonts/montserrat';
import { LocaleConfig } from 'react-native-calendars';
import { useAuth } from './src/hooks/use-auth';
import { AuthProvider } from './src/contexts/auth-context';
import { Provider } from 'use-http';
import { BASE_URI } from './config';
import { retrieveToken } from './src/controllers/tokens';

const Stack = createNativeStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });
  const [state, functions] = useAuth();

  if (!fontsLoaded || state.loading) return <SplashScreen />

  return (
    <Provider 
      url={BASE_URI} 
      options={{
        interceptors: {
          request: async (data) => {
            const token = await retrieveToken();

            if (token) {
              (data.options.headers as any)['Authorization'] = `Token token=${await retrieveToken()}`;
            }

            return data.options;
          }
        }
      }}
    >
      <AuthProvider value={functions}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {
            state.user ? (
              <>
                <Stack.Screen name="Main" component={MainBottomNavigation} />
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="Profile" component={Profile} />
              </>
            ) : (
              <>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Auth" component={Auth} />
                <Stack.Screen name="Verification" component={Verification} />
              </>
            )
          }
        </Stack.Navigator>
      </AuthProvider>
    </Provider>
  );
}

export default function ApplicationWrapper() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}

// Calendar language
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sept.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
  today: "Hoy"
};
LocaleConfig.defaultLocale = 'es';