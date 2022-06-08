import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnBoarding() {
    return (
        <SafeAreaView style={style.mainContainer}>

        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});