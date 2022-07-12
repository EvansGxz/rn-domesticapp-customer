/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  View,
  Text,
  TextStyle,
  TextInput,
  StyleProp,
  ViewStyle,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { COLORS } from "../../../config";

export interface LabeledInputProps {
  label: string;
  inputProps?: TextInputProps;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle | TextStyle>;
}

const LabeledInput = React.forwardRef((props: LabeledInputProps, ref) => (
  <View style={[style.mainContainer, props.style]}>
    <Text style={[style.textStyle, props.style]}>{props.label}</Text>
    <TextInput
      ref={ref as any}
      style={style.input}
      {...props.inputProps}/>
  </View>
));

const style = StyleSheet.create({
  mainContainer: {
    width: '100%',
    minHeight: 50,
  },
  textStyle: {
    opacity: 0.4,
  },
  input: {
    width: '100%',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: COLORS.primary
  }
});

export default React.memo(LabeledInput);