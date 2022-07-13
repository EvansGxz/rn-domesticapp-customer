/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Logo from '../../resources/img/ui/dom-app-logo.svg';
import {Picker} from '@react-native-picker/picker';

// LOGIN
import * as WebBrowser from 'expo-web-browser';
import * as GoogleAuth from 'expo-auth-session/providers/google';
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

// PRIVATE
const urlGoogleUserInfo = 'https://www.googleapis.com/userinfo/v2/me';
const redirectUri = 'https://auth.expo.io/@yoydev/rn-domesticapp-customer';
const expoClientId = '202772080707-pir2muoheagfmst9m97vbrqli726tjmg.apps.googleusercontent.com';
const androidClientId = '202772080707-icq35munmop9h0egbj9aepktk33ote8n.apps.googleusercontent.com';

export default function Welcome({navigation}: any) {
  const {socialSignIn} = useAuth();
  const [country, setCountry] = useState('col');
  const [userInfo, setUserInfo] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<any>();

  const [request, response, promptAsync] =
    GoogleAuth.useAuthRequest({ expoClientId, androidClientId, redirectUri});


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
  }, []);

  useEffect(() => {
    // setMessage(JSON.stringify(response));
    if (response?.type === 'success') {
      setAccessToken(response?.authentication?.accessToken);
    }
  }, [response]);
  useEffect(() => {
    if (accessToken) {
      getDataUserGoogle();
    }
  }, [accessToken]);
  const facebookLogin = async () => {
    try {
      console.log('Initialize facebook');
      // await LoginManager..initializeAsync({appId});

      const result = await LoginManager.logInWithPermissions(['public_profile']);
      if (result.isCancelled) {
        Alert({msg: 'Has cancelado el inicio de sesión con Facebook', type: 'WARNING' });
      } else {
        Profile.getCurrentProfile().then(currenProfile => {
          if (currenProfile) {
            console.log(currenProfile);
          }
          AccessToken.getCurrentAccessToken().then(token => {
            console.log(token?.accessToken.toString());
            fetch(`https://graph.facebook.com/me?access_token=${token?.accessToken}&fields=id,name,email,picture.type(large)`,
              ).then((data: any) => {
                console.log(data);
                socialSignIn({
                  social_id: data?.userID,
                  email: `${data?.userID}@facebook.com`},
                  data?.imageURL
                );
              }).catch(e => console.log(e));
          });
        });
      }
    } catch ({message}) {
      console.log(message)
      Alert({msg: `Facebook Login Error: ${message}`, type: 'DANGER' });
    }
  };

  const google_login_ButtonClick = async () => {
    promptAsync({showInRecents: true,useProxy: true});
  };

  const getDataUserGoogle = async () => {
    setIsLoading(true);

    const userInfoResponse = await fetch(
      urlGoogleUserInfo, {headers: {Authorization: `Bearer ${accessToken}`}},
    );

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  };

  const googleSocial = async () => {
    await socialSignIn(
      {social_id: userInfo?.id, email: `${userInfo?.email}`},
      userInfo?.picture,
    );
    setIsLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      googleSocial();
    }
  }, [userInfo]);

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
          style={style.btnGoogle}
          onPress={() => google_login_ButtonClick()}>
          Continúa con Google
        </Button>
        <Button
          style={style.btnPhone}
          onPress={() => navigation.navigate('Verification')}>
          Continúa con tu celular
        </Button>
        <Button style={style.btnFacebook} onPress={facebookLogin}>
          Continúa con Facebook
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
    width: '85%',
  },
  btnGoogle: {
    backgroundColor: COLORS.google,
    marginBottom: 20,
  },
  btnPhone: {
    backgroundColor: COLORS.green,
    marginBottom: 20,
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
