import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from '../../resources/img/ui/dom-app-logo.svg';
import Button from '../../components/ui/Button';
import { COLORS } from '../../../config';
import UnderlinedButton from '../../components/ui/UnderlinedButton';
import Footer from '../../components/ui/Footer';
import { useNavigation } from '@react-navigation/native';

export default function Welcome() {
    const navigation = useNavigation<any>();

    return (
        <SafeAreaView style={style.main}>
            <View style={style.countrySelect}>
                <Text style={style.countrySelectText}>Colombia</Text>
            </View>
            {/* Logo */}
            <Logo width="60%" />
            {/* Buttons */}
            <View style={style.buttons}>
                <Button style={style.btnGoogle}>Continúa con Google</Button>
                <Button style={style.btnPhone}>Continúa con tu celular</Button>
                <Button style={style.btnFacebook}>Continúa con Facebook</Button>
            </View>
            {/* Separator */}
            <View style={style.separator}>
                <View style={style.separatorLine} />
                <Text style={style.separatorText}>O</Text>
                <View style={style.separatorLine} />
            </View>
            {/* Own Login and register */}
            <View style={style.buttons}>
                <Button 
                    onPress={() => navigation.navigate('Auth')}
                >
                    Iniciar Sesión
                </Button>
                <View style={style.registerSection}>
                    <Text style={style.registerText}>¿No tienes cuenta?</Text>
                    <UnderlinedButton 
                        textStyle={style.registerText}
                        onPress={() => navigation.navigate('Auth', { Show: 'Register' })}
                    >
                        Registrarse
                    </UnderlinedButton>
                </View>
            </View>
            <Footer />
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    main: {
        backgroundColor: COLORS.primary,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 25
    },
    countrySelect: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: 8,
        width: '50%',
        borderRadius: 5,
    },
    countrySelectText: {
        fontSize: 17,
        color: '#fff',
        textAlign: 'center'
    },
    buttons: {
        width: '85%',
    },
    btnGoogle: {
        backgroundColor: COLORS.google,
        marginBottom: 20
    },
    btnPhone: {
        backgroundColor: COLORS.green,
        marginBottom: 20
    },
    btnFacebook: {
        backgroundColor: COLORS.facebook
    },
    btnLogin: {
        backgroundColor: COLORS.secondary
    },
    registerSection: {
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    registerText: {
        color: '#fff',
        marginRight: 10,
        fontSize: 15
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        opacity: 0.6
    },
    separatorText: {
        marginHorizontal: 10,
    },
    separatorLine: {
        width: '50%',
        height: 1,
        backgroundColor: '#222',
    }
});