import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function UnderlinedButton(props: UnderlinedButtonProps) {
    return (
        <TouchableOpacity>
            <Text style={style.text}>{props.children}</Text>
        </TouchableOpacity>
    );
}

export interface UnderlinedButtonProps {
    children: any;
}

const style = StyleSheet.create({
    text: {
        textDecorationLine: "underline"
    }
});