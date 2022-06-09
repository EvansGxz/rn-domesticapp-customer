import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface TitledHeaderProps {
    title: string;
}

export default function TitledHeader(props: TitledHeaderProps) {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#fff',
        padding: 20
    },
    title: {
        color: '#82868D',
        fontSize: 24,
        fontWeight: '600'
    }
});