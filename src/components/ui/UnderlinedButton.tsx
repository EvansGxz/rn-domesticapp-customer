import React from "react";
import { TouchableOpacity, Text, StyleSheet, TextStyle, StyleProp } from "react-native";

export default function UnderlinedButton(props: UnderlinedButtonProps) {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <Text style={[style.text, props.textStyle]}>{props.children}</Text>
        </TouchableOpacity>
    );
}

export interface UnderlinedButtonProps {
    children: any;
    onPress?: () => void;
    textStyle?: StyleProp<TextStyle>;
}

const style = StyleSheet.create({
    text: {
        textDecorationLine: "underline",
    }
});