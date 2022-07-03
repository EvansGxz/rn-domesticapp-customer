import React from "react";


export const AuthContext = React.createContext({} as any);
export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;