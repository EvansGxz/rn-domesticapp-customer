import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UserImage from "./UserImage";



export default function UserInfo() {
    return (
        <View style={styles.container}>
            <View style={styles.directionRow}>
                <UserImage size={65} />
                <Text style={styles.textName}>María Heugenia Zaldívar</Text>
            </View>
            <Text style={styles.servicesCount}>325 Servicios Solicitados</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    directionRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    textName: {
        fontSize: 32,
        maxWidth: '70%'
    },
    servicesCount: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '500',
        color: '#787B82'
    }
});
