import React from "react";
import { StyleSheet, View } from 'react-native';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

export default function AuthorizationAndData() {
    return (
        <View style={styles.screen}>
            <BackTitledHeader title="Autorización y Tratamiento de Datos" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#fff' },
});