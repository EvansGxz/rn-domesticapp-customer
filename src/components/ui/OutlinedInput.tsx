import React from "react";
import { TextInput, TextInputProps, StyleSheet } from "react-native";
import { COLORS } from "../../../config";

export interface OutlinedInputProps extends TextInputProps {
    inputRef?: any;
}

export default function OutlinedInput(props: OutlinedInputProps) {
    return (
        <TextInput
            {...props}
            ref={props.inputRef}
            style={[style.input, props.style]}
        />
    );
}

const style = StyleSheet.create({
    input: {
        borderColor: COLORS.primary,
        padding: 20,
        borderRadius: 13,
        borderWidth: 2,
        width: '100%',
        textAlign: 'center',
        fontSize: 24
    }
});