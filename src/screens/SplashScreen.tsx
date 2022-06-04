import React from "react";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../config";
import DomAppLogo from '../resources/img/ui/dom-app-logo.svg';

export default function SplashScreen() {
    return (
        <SafeAreaView style={style.mainContainer}>
            <DomAppLogo style={{ width: '75%' }} />
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center'
    }
});