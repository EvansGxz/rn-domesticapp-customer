/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FunctionComponent, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AxiosError} from 'axios';
import {useEffect, useMemo, useReducer} from 'react';
import {httpClient} from '../controllers/http-client';
import {
  deleteToken,
  retrieveToken,
  retrieveTokenHeader,
  saveToken,
} from '../controllers/tokens';

import Alert from '../controllers/Alert';

// CONTEXTs And REDUCERs
import { AuthState, SocialSignIn } from '../interfaces/interfaces';
import { AuthContext } from '../contexts/auth-context';
import { authReducer, PayloadActionKind } from '../contexts/authReducer';

const initialState: AuthState = {
  user: null,
  loading: true,
  preloader: false,
  onboarding: true,
  location: {latitude: 0, longitude: 0},
}


export const AuthProvider: FunctionComponent = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const signIn = async (credentials: any) => {
    try {
      const {data: {token, ...state}} = await httpClient.post('/login', credentials);
      // console.log(token);
      await saveToken(token);
      dispatch({ type: PayloadActionKind.SIGN_IN, payload: {user: state} });
      dispatch({ type: PayloadActionKind.PRELOADER, payload: {preloader: false} });
      Alert({msg: 'Has iniciado sesión exitosamente', type: 'SUCCESS'});
    } catch (err) {
      Alert({
        title: 'Error',
        msg : ((err as AxiosError).response?.data as any).errors,
        type: 'DANGER'
      });
    }
  }

  const socialSignIn = async (credentials: any, dataUser: SocialSignIn) => {
    try {
      const {data: {token}} = await httpClient.post('/login_social', credentials);

      await saveToken(token);
      const formData = new FormData();
      formData.append('full_name', dataUser.full_name);
      if (dataUser.image_url !== '') {
        formData.append('cover', {
          uri: dataUser.image_url,
          type: 'image/jpeg',
          name: `coverimage.jpg`,
        } as any);
      }

      const response = await httpClient.patch(
        '/profile',
        formData,
        {headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: await retrieveTokenHeader()
        }},
      );
      dispatch({type: PayloadActionKind.SIGN_IN, payload: {user: response.data}});
      Alert({msg: 'Has iniciado sesión exitosamente', type: 'SUCCESS'});
    } catch (err) {
      Alert({
        title: 'Error',
        msg: ((err as AxiosError).response?.data as any).errors,
        type: 'DANGER'
      });
    }
  }

  const phoneSignIn = async (credentials: any) => {
    try {
      const {
        data: {token, ...state},
      } = await httpClient.post('/login_phone', credentials);

      await saveToken(token);
      console.log('logged in');

      dispatch({type: PayloadActionKind.SIGN_IN, payload: {user: state}});
    } catch (err) {
      console.log(err);
      console.log((err as AxiosError).message);
      Alert({
        title: 'Error',
        msg: ((err as AxiosError).response?.data as any).errors,
        type: 'DANGER',
      });
    }
  }

  const loadSession = async (token: string, user: any) => {
    await saveToken(token);
    dispatch({type: PayloadActionKind.SIGN_IN, payload: {user}});
    Alert({msg: 'Tus cambios se realizaron con exito', type: 'SUCCESS'});
  }

  const signOut = async () => {
    try {
      await httpClient.delete('/logout', {
        headers: {Authorization: await retrieveTokenHeader()},
      });

      await deleteToken();

      dispatch({type: PayloadActionKind.SIGN_OUT});
    } catch (err) {
      await deleteToken();

      console.log(err);
    }
  }
  const getState = () => state;

  const checkOnboarding = async () => {
    try {
      const _store = await AsyncStorage.getItem('@viewedOnboarding');
      if (_store === null) {
        dispatch({type: PayloadActionKind.ONBOARDING, payload: {onboarding: false}})
      }
    } catch (error) {
      console.error('Error @checkOnboarding', error);
    } finally {
      dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: false}})
    }
  };

  useEffect(() => {
    // AsyncStorage.removeItem('@viewedOnboarding');
    checkOnboarding();
    if (state.onboarding && state.preloader === false) {
      dispatch({type: PayloadActionKind.PRELOADER, payload: {preloader: false}});
    }
  }, [state.onboarding, state.loading]);

  const authFunctions = useMemo(() => {
    return {
      state,
      signIn,
      signOut,
      getState,
      dispatch,
      phoneSignIn,
      loadSession,
      socialSignIn,
    }
  }, [state]);

  useEffect(() => {
    retrieveToken().then(async token => {
      try {
        // console.log('Token: ', token);
        if (!token) return dispatch({type: PayloadActionKind.SIGN_OUT});
        const result = await httpClient.get('/profile', {
          headers: {Authorization: await retrieveTokenHeader()},
        });
        dispatch({type: PayloadActionKind.SIGN_IN, payload: {user: result?.data}});
      } catch (err) {
        await AsyncStorage.removeItem('token');
        dispatch({type: PayloadActionKind.SIGN_OUT});
      }
    });
  }, []);

  return <AuthContext.Provider value={authFunctions} {...props} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe estar dentro de AuthContext.');
  return context;
}