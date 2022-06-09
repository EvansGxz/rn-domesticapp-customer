import React from "react";
import { StyleSheet, View } from 'react-native';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function Notifications() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Notificaciones" />
        </View>
    );
}