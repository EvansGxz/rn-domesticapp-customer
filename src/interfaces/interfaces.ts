/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthState {
  preloader?: boolean;
  loading?: boolean;
  user?: any | null;
}

export interface MenuOptionProps {
  text: string;
  icon?: any;
  size: number;
  onPress?: () => void;
}