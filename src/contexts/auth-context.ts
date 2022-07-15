/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {Dispatch} from 'react';
import { AuthState, SocialSignIn } from '../interfaces/interfaces';
import type {AuthAction} from './authReducer';

type AuthContextProps = {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  getState: () => void;
  signOut: () => Promise<void>;
  loadSession: (token: string, user: any) => Promise<void>;
  phoneSignIn: (credentials: any) => Promise<void>;
  socialSignIn: (credentials: any, dataUSer: SocialSignIn) => Promise<void>;
  signIn: (credentials: any) => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps);
export const AuthProvider = AuthContext.Provider;