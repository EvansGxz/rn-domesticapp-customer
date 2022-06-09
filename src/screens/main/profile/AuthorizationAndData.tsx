import React from "react";
import { StyleSheet, View } from 'react-native';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function AuthorizationAndData() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Autorización y Tratamiento de Datos" />
        </View>
    );
}

const styles = StyleSheet.create({
});