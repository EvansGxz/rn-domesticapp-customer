import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../../config";
import MailSVG from '../../resources/img/profile-icons/mail-icon.svg';
import TrashSVG from '../../resources/img/profile-icons/trash-icon.svg';

export interface NotificationCardProps {
    color: 'primary' | 'secondary';
}

export default function NotificationCard(props: NotificationCardProps) {
    return (
        <View style={[styles.card, { backgroundColor: props.color === 'primary' ? COLORS.lightBlue : COLORS.lightRed}]}>
            <View style={styles.cardTopBody}>
                <MailSVG style={styles.mailIcon}/>
                <View style={styles.textContent}>
                    <Text style={styles.title}>¡Nuevas regiones en Colombia!</Text>
                    <Text style={styles.descriptionText}>
                        {`Dos nuevas regiones disponibles:\n- Andina\n- Caribe\nAhora puedes solicitar servicios o trabajar en estás regiones`}
                    </Text>
                </View>
            </View>
            <View style={styles.cardBottomBody}>
                <Text style={styles.dateText}>12/05/2022 22:28</Text>
                <TrashSVG />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.lightBlue,
        padding: 15,
        marginBottom: 2
    },
    cardTopBody: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 15
    },
    cardBottomBody: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textContent: {
        flex: 1,
        marginLeft: 20
    },
    title: {
        fontSize: 18,
    },
    mailIcon: {
        marginTop: 10
    },
    dateText: {
        marginRight: 20
    },
    descriptionText: {
        fontSize: 12,
        fontWeight: '400',
        marginTop: 5
    }
});