/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Logo from '../../resources/img/ui/dom-app-logo.svg';
import {Picker} from '@react-native-picker/picker';
import Svg, {Path, G} from 'react-native-svg';

// LOGIN
import * as WebBrowser from 'expo-web-browser';
// import * as GoogleAuth from 'expo-auth-session/providers/google';
import { GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';

// COMPONENTs
import {COLORS} from '../../../config';
import Button from '../../components/ui/Button';
import Footer from '../../components/ui/Footer';
import LineORSeparator from '../../components/ui/LineORSeparator';
import UnderlinedButton from '../../components/ui/UnderlinedButton';

import SplashScreen from '../../layouts/SplashScreen';
import { useAuth } from '../../hooks/use-auth';
import Alert from '../../controllers/Alert';

// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs(); //Ignore all log notifications

WebBrowser.maybeCompleteAuthSession();

const IconGoogle = () => (
  <Svg width="20" height="20" viewBox="0 0 61.212 62.461">
    <G id="Grupo_15" data-name="Grupo 15" transform="translate(0 0)">
      <Path
        id="Trazado_24"
        data-name="Trazado 24"
        d="M3075.689,1747.783a26.8,26.8,0,0,0-.659-6.384h-29.322v11.59h17.21a15.259,15.259,0,0,1-6.384,10.133l-.058.388,9.271,7.182.642.063c5.9-5.448,9.3-13.464,9.3-22.972"
        transform="translate(-3014.477 -1715.859)"
        fill="#3283fc"
      />
      <Path
        id="Trazado_25"
        data-name="Trazado 25"
        d="M3046.789,1777.86c8.432,0,15.511-2.777,20.681-7.565l-9.855-7.634a18.48,18.48,0,0,1-10.826,3.123,18.8,18.8,0,0,1-17.768-12.978l-.366.031-9.639,7.46-.126.35a31.2,31.2,0,0,0,27.9,17.212"
        transform="translate(-3015.558 -1715.4)"
        fill="#00ac47"
      />
      <Path
        id="Trazado_26"
        data-name="Trazado 26"
        d="M3029.15,1753.6a19.249,19.249,0,0,1-1.041-6.177,20.208,20.208,0,0,1,1.006-6.177l-.018-.414-9.761-7.581-.319.152a31.158,31.158,0,0,0,0,28.038l10.132-7.841"
        transform="translate(-3015.687 -1716.188)"
        fill="#fb0"
      />
      <Path
        id="Trazado_27"
        data-name="Trazado 27"
        d="M3046.789,1728.925a17.308,17.308,0,0,1,12.076,4.65l8.814-8.606a30.009,30.009,0,0,0-20.89-8.12,31.205,31.205,0,0,0-27.9,17.211l10.1,7.843a18.878,18.878,0,0,1,17.8-12.978"
        transform="translate(-3015.558 -1716.849)"
        fill="#fe2c25"
      />
    </G>
  </Svg>
);

const IconFacebook = () => (
  <Svg viewBox="0 0 48 48" width="30px" height="30px">
    <Path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"/>
    <Path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"/>
  </Svg>
)

export default function Welcome({navigation}: any) {
  const {socialSignIn} = useAuth();
  const [country, setCountry] = useState<string>('col');
  const [isLoading, setIsLoading] = useState(false);

  const getCountry = () => {
    AsyncStorage.getItem('country').then(value => {
      if (value) {
        setCountry(value);
      } else {
        AsyncStorage.setItem('country', 'col');
        setCountry('col');
      }
    });
  };

  useEffect(() => {
    getCountry();
    GoogleSignin.configure();
    setIsLoading(false);
  }, []);

  const facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile']);
      if (result.isCancelled) {
        Alert({msg: 'Has cancelado el inicio de sesión con Facebook', type: 'WARNING' });
      } else {
        Profile.getCurrentProfile().then(currenProfile => {
          if (currenProfile) {
            socialSignIn({
              social_id: currenProfile.userID,
              email: currenProfile?.email ? currenProfile?.email : `${currenProfile?.userID}@facebook.com`
            }, {full_name: currenProfile?.name, image_url: currenProfile?.imageURL});
          } else  {
            AccessToken.getCurrentAccessToken().then(token => {
              // console.log(token?.accessToken.toString());
              fetch(`https://graph.facebook.com/me?access_token=${token?.accessToken}&fields=id,name,email,picture.type(large)`,
                ).then((dataJson) => {
                  dataJson.json().then(data => {
                    socialSignIn({
                        social_id: data?.id,
                        email: data?.email ? data?.email : `${data?.id}@facebook.com`
                      }, {full_name: data?.name, image_url: data?.picture?.data?.url}
                    );
                  });
                }).catch(e => console.log(e));
            });
          }
        });
      }
    } catch ({message}) {
      console.log(message)
      Alert({msg: `Facebook Login Error: ${message}`, type: 'DANGER' });
    }
  };

  const LoginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {user} = await GoogleSignin.signIn();
      await socialSignIn({
        social_id: user.id,
        email: user.email ? user.email : `${user?.id}@gmail.com`
      }, {full_name: user.name, image_url: user.photo});
      
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        Alert({msg: 'Has cancelado el inicio de sesión con Google.', type: 'WARNING' });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert({msg: 'Ha ocurrido un error, por favor intentelo mas tarde.', type: 'WARNING' });
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        Alert({msg: 'En estos momentos Google no se encuentra disponible.', type: 'WARNING' });
      } else {
        console.log(error);
        // some other error happened
      }
    }
  };

  const changeCountry = async (country: string) => {
    setCountry(country);
    await AsyncStorage.setItem('country', country);
  };

  const CountryOptions = [
    {label: 'Colombia', value: 'col'},
    {label: 'España', value: 'esp'},
  ];

  if (isLoading) return <SplashScreen />;

  const _Picker: any = Picker;
  return (
    <SafeAreaView style={style.main}>
      <View style={style.countrySelect}>
        <_Picker
          selectedValue={country}
          onValueChange={changeCountry}
          dropdownIconColor="#000">
          {CountryOptions.map(o => (
            <_Picker.Item
              key={Math.random()}
              fontFamily="Poppins_400Regular"
              style={style.countrySelectText}
              label={o.label}
              value={o.value}
            />
          ))}
        </_Picker>
      </View>
      {/* Logo */}
      <Logo width="60%" />
      {/* Buttons */}
      <View style={style.buttons}>
        <Button
          starIcon={<IconFacebook />}
          style={style.btnFacebook}
          onPress={facebookLogin}>
          Continúa con Facebook
        </Button>
        <Button
          style={style.btnGoogle}
          starIcon={<IconGoogle />}
          onPress={LoginWithGoogle}>
          Continúa con Google
        </Button>
        <Button
          style={style.btnPhone}
          onPress={() => navigation.navigate('Verification')}>
          Continúa con tu celular
        </Button>
      </View>
      {/* Separator */}
      <LineORSeparator />
      {/* Own Login and register */}
      <View style={style.buttons}>
        <Button onPress={() => navigation.navigate('Auth')}>
          Iniciar Sesión
        </Button>
        <View style={style.registerSection}>
          <Text style={style.registerText}>¿No tienes cuenta?</Text>
          <UnderlinedButton
            textStyle={style.registerText}
            onPress={() => navigation.navigate('Auth', {screen: 'Register'})}>
            Registrarse
          </UnderlinedButton>
        </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
  },
  countrySelect: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '60%',
    borderRadius: 5,
  },
  countrySelectText: {
    fontSize: 17,
    color: '#000',
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
  },
  btnGoogle: {
    flexDirection: 'row',
    backgroundColor: COLORS.google,
    marginVertical: 20,
  },
  btnPhone: {
    backgroundColor: COLORS.green,
  },
  btnFacebook: {
    backgroundColor: COLORS.facebook,
  },
  btnLogin: {
    backgroundColor: COLORS.secondary,
  },
  registerSection: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#fff',
    marginRight: 10,
    fontSize: 15,
  },
});
