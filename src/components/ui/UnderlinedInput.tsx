import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

const UnderlinedInput = (props: TextInputProps) => {
  return (
    <TextInput
      {...props}
      style={[style.input, props.style]}
    />
  );
}

export default React.memo(UnderlinedInput);

const style = StyleSheet.create({
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    width: '100%'
  }
});