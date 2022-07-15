/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AuthState {
  preloader?: boolean;
  loading?: boolean;
  onboarding?: boolean;
  user?: any | null;
}

export interface SocialSignIn {
  full_name: string | any;
  image_url: string | any;
}

export interface MenuOptionProps {
  text: string;
  icon?: any;
  size: number;
  onPress?: () => void;
}

interface ArrayFaqs {
  id: number;
  pregunta: string;
  respuesta: string;
}
export interface Faqs {
  [index: number]: {
    id: number;
    title: string;
    legend: string;
    preguntas: ArrayFaqs[];
  };
}