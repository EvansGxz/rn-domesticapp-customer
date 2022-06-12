import React from 'react';
import { View, StyleSheet, TextInput, TextInputProps } from 'react-native';

export default function UnderlinedInput(props: TextInputProps) {
    return (
        <TextInput 
            {...props} 
            style={[style.input, props.style]} 
        />
    );
}


const style = StyleSheet.create({
    input: {
        borderWidth: 0,
        borderBottomWidth: 1,
        width: '100%'
    }
});