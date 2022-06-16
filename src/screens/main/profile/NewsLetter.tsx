import React from "react";
import { ScrollView, StyleSheet, View } from 'react-native';
import NotificationCard from "../../../components/cards/NotificationCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function NewsLetter() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="NewsLetter" />
            <ScrollView style={SharedStyles.fill}>
                <NotificationCard color="primary" />
            </ScrollView>
        </View>
    );
}