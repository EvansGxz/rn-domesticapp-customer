import React from "react";
import { TextInput, StyleSheet } from 'react-native';

export default function TextArea(props: any) {
    return (
        <TextInput 
            numberOfLines={10}
            {...props}
            style={[styles.textArea, props.style]}
            multiline={true}
        />
    );
}

const styles = StyleSheet.create({
    textArea: {
        backgroundColor: '#F0FCFF',
        fontFamily: 'Poppins_500Medium',
        color: '#787B82',
        padding: 10,
        textAlignVertical: 'top'
    }
});