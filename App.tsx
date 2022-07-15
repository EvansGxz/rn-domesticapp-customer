/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Root } from 'react-native-alert-notification';
// import { useNetInfo } from '@react-native-community/netinfo';

// SCREENs
import Auth from './src/screens/auth-flow/Auth';
import Welcome from './src/screens/auth-flow/Welcome';
import SplashScreen from './src/layouts/SplashScreen';
import OnBoarding from './src/screens/auth-flow/OnBoarding';
import Verification from './src/screens/auth-flow/Verification';
import MainBottomNavigation from './src/screens/main/BottomNavigation';

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
import { useAuth, AuthProvider } from './src/hooks/use-auth';
import { Provider } from 'use-http';
import { BASE_URI } from './config';
import { retrieveToken } from './src/controllers/tokens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Preloader from './src/layouts/Preloader';
import ErrorBoundary from './src/layouts/ErrorBoundary';
// import NetInfo from './src/layouts/NetInfo';

type RootNavStack = {
  Main: undefined;
  OnBoarding: undefined;
  Profile: undefined;
  Welcome: undefined;
  Auth: undefined;
  Verification: undefined;
}

const Stack = createNativeStackNavigator<RootNavStack>();

function App() {
  const [fontsLoaded] = useFonts({
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
  const { state } = useAuth();
  // const netInfo = useNetInfo();

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
      }}>
      <Preloader />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          state.user ? (
            state.onboarding ? (
              <Stack.Screen name="OnBoarding" component={OnBoarding} />
            ) : (
              <Stack.Screen name="Main" component={MainBottomNavigation} />
            )
          ) : (
            <Stack.Group>
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Auth" component={Auth} />
              <Stack.Screen name="Verification" component={Verification} />
            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </Provider>
  );
}

export default function ApplicationWrapper() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Root>
        <AuthProvider>
          <ErrorBoundary>
            <NavigationContainer>
              <App />
            </NavigationContainer>
          </ErrorBoundary>
        </AuthProvider>
      </Root>
    </GestureHandlerRootView>
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