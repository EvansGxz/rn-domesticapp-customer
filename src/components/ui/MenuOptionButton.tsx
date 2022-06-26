import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackButtonSVG from '../../resources/img/ui/back-button.svg';
import { SharedStyles } from "../../styles/shared-styles";

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
                <View style={styles.containerButton}>
                    <Text style={styles.backIcon}>{">"}</Text>
                </View>
            </TouchableOpacity>
            <View style={SharedStyles.bottomLine} />
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
    buttonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#3D4451',
        fontWeight: '600'
    },
    containerButton: {
        alignItems: 'center',
        justifyContent:"center",
    },
    backIcon: {
        fontSize: 30,
        color: '#0BBBEF',
    }
});