import React from "react";
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../config";

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={props.onPress}
      disabled={props.disabled}
      style={[style.button, props.style]}>
        {props.starIcon && (
          <View style={style.starIcon}>
            {props.starIcon}
          </View>
        )}
      <Text style={[style.text, props.textStyle]}>{props.children}</Text>
      {props.endIcon}
    </TouchableOpacity>
  );
}

export interface ButtonProps {
  disabled?: boolean;
  onPress?: () => void;
  endIcon?: JSX.Element;
  starIcon?: JSX.Element;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: JSX.Element | JSX.Element[] | string;
}

const style = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  starIcon: {
    position: 'absolute',
    left: '8%'
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'Poppins_600SemiBold'
  }
});