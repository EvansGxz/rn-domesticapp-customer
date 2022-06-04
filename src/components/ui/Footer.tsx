import React from 'react';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { INFO } from "../../../config";

export interface FooterProps {
    style?: StyleProp<TextStyle>;
}

export default function Footer(props: FooterProps) {
    return (
        <Text style={[style.versionText, props.style]}>
            Domesticapp Ver {INFO.version} {INFO.year}. Derechos Reservados
        </Text>
    );
}

const style = StyleSheet.create({
    versionText: {
        color: '#fff',
        fontSize: 10,
        opacity: 0.7
    },
})