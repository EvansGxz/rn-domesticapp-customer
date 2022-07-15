import React from "react";
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

export default function TextArea(props: TextInputProps) {
  return (
    <TextInput
      numberOfLines={10}
      style={[styles.textArea, props.style]}
      multiline={true}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  textArea: {
    padding: 10,
    color: '#787B82',
    textAlignVertical: 'top',
    backgroundColor: '#F0FCFF',
    fontFamily: 'Poppins_500Medium',
  }
});