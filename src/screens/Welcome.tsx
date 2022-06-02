import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from '../resources/img/ui/dom-app-logo.svg';
import Button from '../components/ui/Button';

import { COLORS, INFO } from '../../app.config';
import UnderlinedButton from '../components/ui/UnderlinedButton';

export default function Welcome() {
    return (
        <SafeAreaView style={style.main}>
            {/* Logo */}
            <Logo />
            {/* Buttons */}
            <View style={style.buttons}>
                <Button>Continúa con Google</Button>
                <Button>Continúa con tu celular</Button>
                <Button>Continúa con tu Facebook</Button>
            </View>
            {/* Separator */}
            {/* Own Login and register */}
            <View>
                <Button>Iniciar Sesión</Button>
                <View>
                    <Text>¿No tienes cuenta?</Text>
                    <UnderlinedButton>Registrarse</UnderlinedButton>
                </View>
            </View>
            <Text>Domesticapp Ver {INFO.version} {INFO.year}. Derechos Reservados</Text>
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
    logo: {

    },
    buttons: {
        width: '100%',
    }
});