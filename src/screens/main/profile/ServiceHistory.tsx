import React from "react";
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import ServiceStatusCard from "../../../components/cards/ServiceStatusCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function ServiceHistory() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Tus Ultimos Servicios" />
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentScrollView}>
                <Text style={SharedStyles.h2}>Servicios en Curso</Text>
                <ServiceStatusCard />
                <ServiceStatusCard />
                <ServiceStatusCard />
                <Text style={SharedStyles.h2}>Ultimos Servicios</Text>
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
    scrollView: {
        flex: 1,
    },
    contentScrollView: {
        padding: 10,
        paddingBottom: 35
    }
});