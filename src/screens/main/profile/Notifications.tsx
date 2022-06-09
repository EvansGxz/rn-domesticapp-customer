import React from "react";
import { StyleSheet, View } from 'react-native';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

export default function Notifications() {
    return (
        <View style={styles.screen}>
            <BackTitledHeader title="Notificaciones" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#fff' },
});