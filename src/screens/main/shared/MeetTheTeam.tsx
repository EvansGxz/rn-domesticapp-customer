import React from "react";
import { ScrollView, StyleSheet, View } from 'react-native';
import ServiceStatusCard from "../../../components/cards/ServiceStatusCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function MeetTheTeam() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Conoce al equipo" />
            <ScrollView 
                style={styles.cardsContainer}
                contentContainerStyle={styles.contentContainerCards}
            >
                <ServiceStatusCard />
                <ServiceStatusCard />
                <ServiceStatusCard />
                <ServiceStatusCard />
                <ServiceStatusCard />
                <ServiceStatusCard />
                <ServiceStatusCard />
                <ServiceStatusCard />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    cardsContainer: {
        flex: 1,
        padding: 10,
    },
    contentContainerCards: {
        paddingBottom: 35
    }
});