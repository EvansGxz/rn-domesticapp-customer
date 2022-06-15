import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../../../config";
import SupportSVG from '../../resources/img/support-icons/chat-icon.svg'
import UserImage from "../user/UserImage";

export default function ChatMessage() {
    return (
        <View style={[styles.container, { backgroundColor: COLORS.lightRed }]}>
            <View style={styles.iconContainer}>
                <UserImage size={50} />
            </View>
            <Text style={styles.text}>
                Hola, Necesito aclarar algo sobre mi horario, me pueden orientar?
            </Text>
            <Text style={styles.date}>22:27</Text>
        </View>
    );
}

export function SupportChatMessage() {
    return (
        <View style={[styles.container, { backgroundColor: COLORS.lightBlue }]}>
            <View style={styles.iconContainer}>
                <SupportSVG width={50} />
            </View>
            <Text style={styles.text}>
                Hola Liliana, en que podemos ayudarte?
            </Text>
            <Text style={styles.date}>22:27</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 2,
        flexDirection: 'row',
        padding: 15,
        paddingVertical: 25,
        position: 'relative',
    },
    iconContainer: {
        width: 50,
    },
    text: {
        marginLeft: 20,
        flex: 1,
        fontFamily: 'Poppins_400Regular',
        fontSize: 16
    },
    date: {
        position: 'absolute',
        bottom: 2,
        right: 5,
    }
});