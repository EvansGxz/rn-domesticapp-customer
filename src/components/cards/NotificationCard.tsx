import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../../config";
import MailSVG from '../../resources/img/profile-icons/mail-icon.svg';
import TrashSVG from '../../resources/img/profile-icons/trash-icon.svg';
import { SharedStyles } from "../../styles/shared-styles";
import moment from "moment";
export interface NotificationCardProps {
    color: 'primary' | 'secondary';
    notification?: any;
}

export default function NotificationCard(props: NotificationCardProps) {
    const momentTransform = moment(props.notification.created_at);
    const created_at = `${momentTransform.format('L')} ${momentTransform.format('LT')}`;
    return (
        <View style={[
            SharedStyles.card,
            styles.card,
            { backgroundColor: props.color === 'primary' ? COLORS.lightBlue : COLORS.lightRed}]}>
            <View style={styles.cardTopBody}>
                <MailSVG style={styles.mailIcon}/>
                <View style={styles.textContent}>
                    <Text style={styles.title}>{props.notification.name}</Text>
                    <Text style={styles.descriptionText}>
                        {props.notification.body}
                    </Text>
                </View>
            </View>
            <View style={styles.cardBottomBody}>
                <Text style={styles.dateText}>{created_at}</Text>
                {/*<TrashSVG />*/}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.lightBlue,
        padding: 15,
        margin: 8,
        borderRadius: 5,
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