import React from "react";
import { 
    TouchableOpacity, 
    View, 
    Text, 
    StyleSheet 
} from "react-native";
import { COLORS } from "../../../app.config";

export default function Button(props: ButtonProps) {
    return (
        <TouchableOpacity style={style.button}>
            <Text>{props.children}</Text>
        </TouchableOpacity>
    );
}

export interface ButtonProps {
    children: any;
}

const style = StyleSheet.create({
    button: {
        backgroundColor: COLORS.secondary,
        width: '100%',
        padding: 15,
        borderRadius: 10
    }
});