/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type TAuthContext = {
  getState: () => any;
  signOut: () => any;
  loadSession: (token: string, user: any) => any;
  phoneSignIn: (credentials: any) => any;
  socialSignIn: (credentials: any) => any;
  signIn: (credentials: any) => any;
};

export const AuthContext = React.createContext<TAuthContext>({} as any);
export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;