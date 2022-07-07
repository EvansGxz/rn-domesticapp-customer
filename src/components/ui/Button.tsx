import React from "react";
import { 
    TouchableOpacity, 
    View, 
    Text, 
    StyleSheet, 
    StyleProp,
    ViewStyle,
    TextStyle
} from "react-native";
import { COLORS } from "../../../config";

export default function Button(props: ButtonProps) {
    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress} activeOpacity={0.7} style={[style.button, props.style]}>
            <Text style={[style.text, props.textStyle]}>{props.children}</Text>
        </TouchableOpacity>
    );
}

export interface ButtonProps {
    disabled?: boolean;
    children: any;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const style = StyleSheet.create({
    button: {
        backgroundColor: COLORS.secondary,
        width: '100%',
        padding: 10,
        borderRadius: 10,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'Poppins_600SemiBold'
    }
});