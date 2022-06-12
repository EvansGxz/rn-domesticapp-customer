import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../config";
import BackButtonSVG from '../../resources/img/ui/back-button.svg';
import { SharedStyles } from "../../styles/shared-styles";

export interface MenuOptionProps {
    text: string;
    icon: any;
    size: number;
    onPress?: any;
}

export default function MenuOption(props: MenuOptionProps) {
    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={props.onPress}
            >
                <View style={[styles.iconCenter, { width: props.size, height: props.size }]}>
                    <props.icon height={props.size} />
                </View>
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>
            <View style={SharedStyles.bottomLine} />
        </>
    );
}

const styles = StyleSheet.create({
    iconCenter: {
        alignItems: 'center',
    },
    button: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        marginLeft: 20,
        fontSize: 18,
        color: '#3D4451',
        fontFamily: 'Poppins_500Medium',
        flex: 1,
    }
});