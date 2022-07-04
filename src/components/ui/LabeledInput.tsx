import React from "react";
import { TextStyle } from "react-native";
import { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, View, Text, TextInput, TextInputProps } from 'react-native';

export interface LabeledInputProps {
    label: string;
    style?: StyleProp<ViewStyle | TextStyle>;
    textStyle?: StyleProp<TextStyle>;
    inputProps?: TextInputProps; 
}

export default function LabeledInput(props: LabeledInputProps) {
    return (
        <View style={[style.mainContainer, props.style]}>
            <Text style={[style.textStyle, props.style]}>{props.label}</Text>  
            <TextInput {...props.inputProps} style={[style.input, props.inputProps?.style]}  />
        </View>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        width: '100%',
        minHeight: 50,
    },
    textStyle: {
        opacity: 0.4,
        marginBottom: 5
    },
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        width: '100%'
    }
});