import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../config";
import BackButtonSVG from '../../resources/img/ui/back-button.svg';

export interface MenuOptionButtonProps {
    text: string;
    icon: any;
    onPress?: any;
}

export default function MenuOptionButton(props: MenuOptionButtonProps) {
    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={props.onPress}
            >
                <View style={styles.iconAndText}>
                    <props.icon />
                    <Text style={styles.buttonText}>{props.text}</Text>
                </View>
                <BackButtonSVG 
                    style={styles.arrowIcon}
                />
            </TouchableOpacity>
            <View style={styles.bottomLine} />
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        alignItems: 'center',
    },
    iconAndText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowIcon: {
        transform: [{'rotate': '180deg'}]
    },
    bottomLine: {
        height: 1,
        backgroundColor: COLORS.primary,
        opacity: 0.2,
        width: '100%'
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 18,
        color: '#3D4451',
        fontWeight: '600'
    }
});