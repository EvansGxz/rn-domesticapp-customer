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
import { AuthState } from '../interfaces/interfaces';
import { AuthContext } from '../contexts/auth-context';
import { authReducer, PayloadActionKind } from '../contexts/authReducer';

const initialState: AuthState = {
  preloader: false,
  loading: true,
  user: null
}

export const AuthProvider: FunctionComponent = (props: any) => {
  const [state, dispatch] = useReducer(authReducer, initialState);


  const signIn = async (credentials: any) => {
    try {
      const {data: {token, ...state}} = await httpClient.post('/login', credentials);
      console.log(token);
      await saveToken(token);
      dispatch({ type: PayloadActionKind.SIGN_IN, payload: {user: state} });
      dispatch({ type: PayloadActionKind.PRELOADER, payload: {preloader: false} });
      Alert({msg: 'Has iniciado la sesión exitosamente', type: 'SUCCESS'});
    } catch (err) {
      Alert({
        title: 'Error',
        msg : ((err as AxiosError).response?.data as any).errors,
        type: 'DANGER'
      });
    }
  }

  const socialSignIn = async (credentials: any, img: string) => {
    try {
      const {
        data: {token, ...state},
      } = await httpClient.post('/login_social', credentials);

      await saveToken(token);
      console.log('logged in');

      await httpClient.patch(
        '/profile',
        {image_url: img},
        {headers: {Authorization: await retrieveTokenHeader()}},
      );

      console.log('image changed');

      dispatch({type: PayloadActionKind.SIGN_IN, payload: {user: state}});
      Alert({msg: 'Has iniciado la sesión exitosamente', type: 'SUCCESS'});
    } catch (err) {
      console.log(err);
      console.log((err as any).message);
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

  const authFunctions = useMemo(() => {
    return {
      state,
      dispatch,
      signIn,
      socialSignIn,
      phoneSignIn,
      loadSession,
      signOut,
      getState
    }
  }, [state])

  // const authFunctions = useMemo(
  //   () => ({
  //     signIn: async (credentials: any) => {
  //       try {
  //         const {data: {token, ...user}} = await httpClient.post('/login', credentials);
  //         console.log(token);
  //         await saveToken(token);
  //         dispatch({type: 'SIGN_IN', user});
  //         Alert({msg: 'Has iniciado la sesión exitosamente', type: 'SUCCESS'});
  //         dispatch({type: 'PRELOADER', payload: false})
  //       } catch (err) {
  //         Alert({
  //           title: 'Error',
  //           msg : ((err as AxiosError).response?.data as any).errors,
  //           type: 'DANGER'
  //         });
  //       }
  //     },
  //     socialSignIn: async (credentials: any, img: string) => {
  //       try {
  //         const {
  //           data: {token, ...user},
  //         } = await httpClient.post('/login_social', credentials);

  //         await saveToken(token);
  //         console.log('logged in');

  //         await httpClient.patch(
  //           '/profile',
  //           {image_url: img},
  //           {headers: {Authorization: await retrieveTokenHeader()}},
  //         );

  //         console.log('image changed');

  //         dispatch({type: 'SIGN_IN', user});
  //         Alert({msg: 'Has iniciado la sesión exitosamente', type: 'SUCCESS'});
  //       } catch (err) {
  //         console.log(err);
  //         console.log((err as any).message);
  //         Alert({
  //           title: 'Error',
  //           msg: ((err as AxiosError).response?.data as any).errors,
  //           type: 'DANGER'
  //         });
  //       }
  //     },
  //     phoneSignIn: async (credentials: any) => {
  //       try {
  //         const {
  //           data: {token, ...user},
  //         } = await httpClient.post('/login_phone', credentials);

  //         await saveToken(token);
  //         console.log('logged in');

  //         dispatch({type: 'SIGN_IN', user});
  //       } catch (err) {
  //         console.log(err);
  //         console.log((err as AxiosError).message);
  //         Alert({
  //           title: 'Error',
  //           msg: ((err as AxiosError).response?.data as any).errors,
  //           type: 'DANGER',
  //         });
  //       }
  //     },
  //     loadSession: async (token: string, user: any) => {
  //       await saveToken(token);
  //       dispatch({type: 'SIGN_IN', user});
  //       Alert({msg: 'Tus cambios se realizaron con exito', type: 'SUCCESS'});
  //     },
  //     signOut: async () => {
  //       try {
  //         await httpClient.delete('/logout', {
  //           headers: {Authorization: await retrieveTokenHeader()},
  //         });

  //         await deleteToken();

  //         dispatch({type: 'SIGN_OUT'});
  //       } catch (err) {
  //         await deleteToken();

  //         console.log(err);
  //       }
  //     },
  //     getState() {
  //       return user;
  //     },
  //   }),
  //   [user],
  // );

  useEffect(() => {
    console.log('Loading APP.');
    setTimeout(() => {
      console.log('Checking token.');
      retrieveToken().then(async token => {
        try {
          console.log('Token: ', token);
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
    }, 1000);
  }, []);

  return <AuthContext.Provider value={authFunctions} {...props} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe estar dentro de AuthContext.');
  return context;
}