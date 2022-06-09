import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TextInput, NativeSyntheticEvent, TextInputKeyPressEventData, Keyboard } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../config";
import Button from "../../components/ui/Button";
import Footer from "../../components/ui/Footer";
import OutlinedInput from "../../components/ui/OutlinedInput";
import PhoneVerificationVector from '../../resources/img/ui/phone-verification.svg';

export default function Verification() {
    const [isPhone, setPhone] = useState(true);
    
    const toggleScreen = () => setPhone(!isPhone);

    return (
        <SafeAreaView style={style.mainContainer}>
            <View style={style.iconContainer}>
                <PhoneVerificationVector width="30%" />
            </View>
            <View style={style.content}>
                <View style={style.centerContainer}>
                    {
                        isPhone ? (
                            <VerificationPhone handler={toggleScreen} />
                        ) : (
                            <VerificationCode />
                        )
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

function VerificationPhone({ handler }: any) {
    
    return (
        <>
            <Text style={style.title}>Verificación</Text>
            <Text>
                Enviaremos un codigo de verificación de 6 digitos a tu celular.
            </Text>
            <OutlinedInput keyboardType="phone-pad" placeholder="Ingrese Numero Celular" />
            <Button
                style={{ backgroundColor: COLORS.primary, padding: 15 }}
                onPress={handler}
            >
                Continuar
            </Button>
            <Footer style={{ color: '#222', marginBottom: 15 }} />
        </>
    );
}

function VerificationCode() {
    const navigation = useNavigation<any>();
    const [data, setData] = useState({
        A: '',
        B: '',
        C: '',
        D: ''
    });
    const firstInput = useRef();
    const secondInput = useRef();
    const thirdInput = useRef();
    const fourthInput = useRef();

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
            setData({ ...data, D: value.nativeEvent.key });
        } else if (value.nativeEvent.key === 'Backspace') {
            (thirdInput.current as unknown as TextInput)?.focus();
            setData({ ...data, D: '' });

        } 
    }

    return (
        <>
            <Text style={style.title}>Verification Code</Text>
            <Text style={{ textAlign: 'center' }}>
                Enter the 4 digits that you received on your phone.
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
            </View>
            <Button
                style={{ backgroundColor: COLORS.primary, padding: 15 }}
                onPress={() => navigation.navigate('Main')}
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