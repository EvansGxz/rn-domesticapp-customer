import React from "react";
import { StyleSheet, View } from 'react-native';
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

export default function ServiceHistory() {
    return (
        <View style={styles.screen}>
            <BackTitledHeader title="Tus Ultimos Servicios" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#fff' },
});