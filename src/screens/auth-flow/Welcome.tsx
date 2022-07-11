/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, LogBox} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Logo from '../../resources/img/ui/dom-app-logo.svg';
import Button from '../../components/ui/Button';
import {COLORS} from '../../../config';
import UnderlinedButton from '../../components/ui/UnderlinedButton';
import Footer from '../../components/ui/Footer';
import {useNavigation} from '@react-navigation/native';
import LineORSeparator from '../../components/ui/LineORSeparator';
import * as Facebook from 'expo-facebook';
import {AuthContext} from '../../contexts/auth-context';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import SplashScreen from '../SplashScreen';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

WebBrowser.maybeCompleteAuthSession();

export default function Welcome() {
  const navigation = useNavigation<any>();
  const auth = useContext(AuthContext);
  const [country, setCountry] = useState('col');
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '209825335616-o96lqfffbrdsspmigjbdb5902h6hgdv4.apps.googleusercontent.com',
    androidClientId:
      '209825335616-3n4ab82qqkcr863ddbhgsltev591k13p.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@marioe92/rn-domesticapp-customer',
  });
  const [accessToken, setAccessToken] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>();
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
      await Facebook.initializeAsync({
        appId: '551206009914007',
      });
      console.log('Login with read permissions');
      const {type, token} = (await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      })) as any;
      console.log(type);
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.type(large)`,
        );
        const user = await response.json();
        console.log(user);
        await auth.socialSignIn(
          {social_id: user.id, email: `${user.id}@facebook.com`},
          user.picture.data.url,
        );
      } else {
        // type === 'cancel'
      }
    } catch ({message}) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  const google_login_ButtonClick = async () => {
    promptAsync({useProxy: true});
  };

  const getDataUserGoogle = async () => {
    setIsLoading(true);

    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    );

    userInfoResponse.json().then(data => {
      setUserInfo(data);
    });
  };

  const googleSocial = async () => {
    await auth.socialSignIn(
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
    // { label: "Canadá", value: "can" },
  ];

  if (isLoading) {
    return <SplashScreen />;
  }

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
            onPress={() => navigation.navigate('Auth', {Show: 'Register'})}>
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
    backgroundColor: COLORS.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
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
