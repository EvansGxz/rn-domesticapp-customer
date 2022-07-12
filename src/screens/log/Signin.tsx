/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps
} from "react-native-keyboard-aware-scroll-view";
import { style } from '../auth-flow/style';

// COMPONENTs
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import LabeledInput from "../../components/ui/LabeledInput";
import Alert from '../../controllers/Alert';
import { useAuth } from '../../hooks/use-auth';
import { PayloadActionKind } from '../../contexts/authReducer';

interface SigninData {
  email: string;
  password: string;
}

export default function Signin() {
  const {dispatch, signIn} = useAuth();

  const secondRef = useRef(null) as any;
  const [data, setData] = useState<SigninData>({email: '', password: ''});

  const handleLogin = async () => {
    if (data.email === '') return Alert({
      msg: 'Por favor introduzca un correo electronico', type: 'WARNING'
    });
    if (data.password === '') return Alert({
      msg: 'Por favor introduzca una contraseña', type: 'WARNING'
    });
    dispatch({type: PayloadActionKind.PRELOADER,  payload: {preloader: true}});
    await signIn(data);
  }

  const onChangeText = (name: string, value: string) => setData({ ...data, [name]: value.trim() });
  const _KeyboardAwareScrollView: KeyboardAwareScrollViewProps | any = KeyboardAwareScrollView
  return (
    <View style={[style.mainContainer, style.tabScreenContainer]}>
      <View style={style.centerContainer}>
        <View style={{ width: '100%' }}>
          <_KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={style.inputsContainer}>
            <LabeledInput
              inputProps={
                {
                  onSubmitEditing: () => secondRef.current.focus(),
                  blurOnSubmit: false,
                  returnKeyType: 'next',
                  onChangeText: (value: string) => onChangeText('email', value),
                  value: data.email,
                  autoCapitalize: "none"
                }
              }
              style={{ marginTop: 5 }}
              label="Correo Electronico"
            />
            <LabeledInput
              ref={secondRef}
              inputProps={
                {
                  onChangeText: (value: string) => onChangeText('password', value),
                  value: data.password,
                  secureTextEntry: true
                }
              }
              style={{ marginTop: 25 }}
              label="Contraseña"
            />
          </_KeyboardAwareScrollView>
        </View>
        <View style={style.buttonContainer}>
          <Button
            textStyle={style.btnTextAction}
            style={style.btnAction}
            onPress={handleLogin}>
            Iniciar Sesión
          </Button>
          <Footer style={style.footerColor} />
        </View>
      </View>
    </View>
  );
}
