import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function LineORSeparator() {
    return (
        <View style={style.separator}>
            <View style={style.separatorLine} />
            <Text style={style.separatorText}>O</Text>
            <View style={style.separatorLine} />
        </View>
    );
}

const style = StyleSheet.create({
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        opacity: 0.6,
    },
    separatorText: {
        marginHorizontal: 10,
    },
    separatorLine: {
        width: '50%',
        height: 1,
        backgroundColor: '#222',
    }
});