import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { COLORS } from "../../../../config";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Button from "../../../components/ui/Button";
import { SharedStyles } from "../../../styles/shared-styles";
import ServiceStatusCard from "../../../components/cards/ServiceStatusCard";

export default function CalendarScreen() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Mi Calendario" />
            <ScrollView  style={SharedStyles.fill} contentContainerStyle={SharedStyles.mainPadding}>
                <Text style={SharedStyles.p}>
                    Recuerda que los reportes deben de realizarse dentro de las
                    primeras 48 horas.
                </Text>
                <Text style={SharedStyles.h2}>Seleccionar fechas en el calendario:</Text>
                <Calendar />
                {/* Card */}
                <DayCard />
                <DayCardService />
            </ScrollView>
            <View style={[SharedStyles.centerContent, SharedStyles.mainPadding]}>
                <Button style={SharedStyles.backgroundPrimary}>Ir a Proximo Servicio</Button>
            </View>
        </View>
    );
}

export function DayCard() {
    return (
        <View style={style.card}>
            <Text style={style.cardTitle}>Jueves, 11 de Mayo</Text>
            <Text style={style.text}>No se han añadido servicios</Text>
        </View>
    );
}
export function DayCardService() {
    return (
        <View style={style.card}>
            <Text style={style.cardTitle}>Jueves, 12 de Mayo</Text>
            <Text style={style.text}>No se han añadido servicios</Text>
            <ServiceStatusCard />
        </View>
    );
}

const style = StyleSheet.create({
    card: {
        backgroundColor: COLORS.lightBlue,
        borderBottomColor: '#0BBBEF',
        borderBottomWidth: 1,
        padding: 20,
        marginVertical: 15
    },
    cardTitle: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 21,
        marginBottom: 10
    },
    text: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
        textAlign: 'center',
        color: '#787B82',
        marginBottom: 10
    }
});