import { AuthState } from "../interfaces/interfaces";

export enum PayloadActionKind {
  SIGN_IN = 'SIGN_IN',
  LOADING = 'LOADING',
  SIGN_OUT = 'SIGN_OUT',
  PRELOADER = 'PRELOADER',
}

export type AuthAction = | { type: PayloadActionKind; payload: AuthState; } | { type: PayloadActionKind; }

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  const { type, payload } = action;
  switch (type) {
    case PayloadActionKind.SIGN_IN:
      return { ...state, loading: false, user: payload.user };
    case PayloadActionKind.SIGN_OUT:
      return { ...state, loading: false, user: null };
    case PayloadActionKind.LOADING:
      return { ...state, loading: true };
    case PayloadActionKind.PRELOADER:
      return { ...state, preloader: payload.preloader };
    default:
      return state;
  }
};