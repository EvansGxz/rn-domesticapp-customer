/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../config";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import OutlinedInput from "../../components/ui/OutlinedInput";
import { httpClient } from "../../controllers/http-client";
import { useAuth } from "../../hooks/use-auth";
import PhoneVerificationVector from '../../resources/img/ui/phone-verification.svg';

export default function Verification() {
    const [phone, setPhone] = useState(null);
    
    const requestToken = (_phone: any) => setPhone(_phone)

    return (
        <SafeAreaView style={style.mainContainer}>
            <View style={style.iconContainer}>
                <PhoneVerificationVector width="30%" />
            </View>
            <View style={style.content}>
                <View style={style.centerContainer}>
                    {
                        !phone ? (
                            <VerificationPhone handler={requestToken} />
                        ) : (
                            <VerificationCode phone={phone} />
                        )
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

function VerificationPhone({ handler }: any) {
    const [phone, setPhone] = useState('');
    // {via: "sms", phone: "+528994466683"}
    const requestVerify = async () => {
        try {
            console.log('verifying phone: ', '+52' + phone);
            const result = await httpClient.post(
                '/api/verification/start', 
                { via: "sms", phone: '+52' + phone }
            );
            console.log(result);
    
            handler(phone);
        } catch (err) {
            console.log((err as AxiosError).response?.data);
            Alert.alert('Error', ((err as AxiosError).response?.data as any).errors)
        }
    }

    return (
        <>
            <Text style={style.title}>Verificación</Text>
            <Text>
                Enviaremos un codigo de verificación de 6 digitos a tu celular.
            </Text>
            <OutlinedInput 
                keyboardType="phone-pad" 
                placeholder="Ingrese Número Celular"
                onChangeText={setPhone}
                value={phone} 
            />
            <Button
                style={{ backgroundColor: COLORS.primary, padding: 15 }}
                onPress={requestVerify}
            >
                Continuar
            </Button>
            <Footer style={{ color: '#222', marginBottom: 15 }} />
        </>
    );
}

function VerificationCode({ phone } : any) {
    const {phoneSignIn} = useAuth();
    const [data, setData] = useState({
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: ''
    });
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();
    const fifthInput = useRef();
    const sixthInput = useRef();

    const isValidNumber = (number: string) => /[0-9]{1}/.test(number);

    const onKeyPressTextA = (value: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (isValidNumber(value.nativeEvent.key)) {
            (secondInput.current as unknown as TextInput)?.focus();
            setData({ ...data, A: value.nativeEvent.key });
        } else if (value.nativeEvent.key === 'Backspace') {
            setData({ ...data, A: '' });
        }
    }
    
    const onKeyPressTextB = (value: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (isValidNumber(value.nativeEvent.key)) {
            (thirdInput.current as unknown as TextInput)?.focus();
            setData({ ...data, B: value.nativeEvent.key });
        } else if (value.nativeEvent.key === 'Backspace') {
            (firstInput.current as unknown as TextInput)?.focus();
            setData({ ...data, B: '' });
        } 
    }
    
    const onKeyPressTextC = (value: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (isValidNumber(value.nativeEvent.key)) {
            (fourthInput.current as unknown as TextInput)?.focus();
            setData({ ...data, C: value.nativeEvent.key });
        } else if (value.nativeEvent.key === 'Backspace') {
            (secondInput.current as unknown as TextInput)?.focus();
            setData({ ...data, C: '' });
        } 
    }

    const onKeyPressTextD = (value: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (isValidNumber(value.nativeEvent.key)) {
            (fifthInput.current as unknown as TextInput)?.focus();
            setData({ ...data, D: value.nativeEvent.key });
        } else if (value.nativeEvent.key === 'Backspace') {
            (thirdInput.current as unknown as TextInput)?.focus();
            setData({ ...data, D: '' });
        } 
    }

    const onKeyPressTextE = (value: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (isValidNumber(value.nativeEvent.key)) {
            (sixthInput.current as unknown as TextInput)?.focus();
            setData({ ...data, E: value.nativeEvent.key });
        } else if (value.nativeEvent.key === 'Backspace') {
            (fourthInput.current as unknown as TextInput)?.focus();
            setData({ ...data, E: '' });
        } 
    }
    
    const onKeyPressTextF = (value: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (isValidNumber(value.nativeEvent.key)) {
            setData({ ...data, F: value.nativeEvent.key });
        } else if (value.nativeEvent.key === 'Backspace') {
            (fifthInput.current as unknown as TextInput)?.focus();
            setData({ ...data, F: '' });
        } 
    }

    const verify = async () => {
        const result = await httpClient.post(
            '/api/verification/verify',
            { 
                token: `${data.A}${data.B}${data.C}${data.D}${data.E}${data.F}`,
                phone: phone 
            }
        ); 
        console.log(result);
        await phoneSignIn({ phone });
    }

    return (
        <>
            <Text style={style.title}>Código de Verificación</Text>
            <Text style={{ textAlign: 'center' }}>
                Ingrese Numero Celular
            </Text>
            <View style={style.codeInputsContainer}>
                <OutlinedInput 
                    inputRef={firstInput}
                    style={style.codeInput} 
                    keyboardType="number-pad" 
                    returnKeyType="next"
                    value={data.A} 
                    maxLength={1}  
                    blurOnSubmit={false}
                    onSubmitEditing={() => (secondInput.current as any).focus()}
                    onKeyPress={onKeyPressTextA}
                />
                <OutlinedInput 
                    inputRef={secondInput}
                    style={style.codeInput} 
                    keyboardType="number-pad" 
                    returnKeyType="next"
                    value={data.B} 
                    onSubmitEditing={() => (thirdInput.current as any).focus()}
                    maxLength={1}
                    blurOnSubmit={false}
                    onKeyPress={onKeyPressTextB}
                />
                <OutlinedInput 
                    inputRef={thirdInput}
                    style={style.codeInput} 
                    keyboardType="number-pad" 
                    returnKeyType="next"
                    value={data.C} 
                    onSubmitEditing={() => (fourthInput.current as any).focus()}
                    maxLength={1} 
                    blurOnSubmit={false}
                    onKeyPress={onKeyPressTextC}
                />
                <OutlinedInput 
                    style={style.codeInput} 
                    keyboardType="number-pad" 
                    maxLength={1}
                    value={data.D} 
                    inputRef={fourthInput}
                    blurOnSubmit={false}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    onKeyPress={onKeyPressTextD}
                />
                <OutlinedInput 
                    style={style.codeInput} 
                    keyboardType="number-pad" 
                    maxLength={1}
                    value={data.E} 
                    inputRef={fifthInput}
                    blurOnSubmit={false}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    onKeyPress={onKeyPressTextE}
                />
                <OutlinedInput 
                    style={style.codeInput} 
                    keyboardType="number-pad" 
                    maxLength={1}
                    value={data.F} 
                    inputRef={sixthInput}
                    blurOnSubmit={false}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    onKeyPress={onKeyPressTextF}
                />
            </View>
            <Button
                style={{ backgroundColor: COLORS.primary, padding: 15 }}
                onPress={verify}
            >
                Continue
            </Button>
            <Footer style={{ color: '#222', marginBottom: 15 }} />
        </>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    iconContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    codeInputsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    content: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
    },
    centerContainer: {
        width: '80%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 28,
        marginTop: 58
    },
    codeInput: {
        maxWidth: 60,
        flex: 1
    }
});