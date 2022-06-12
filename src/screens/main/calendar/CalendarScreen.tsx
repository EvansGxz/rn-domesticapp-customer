import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Calendar } from "react-native-calendars";
import TitledHeader from "../../../components/headers/TitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function CalendarScreen() { 
    return (
        <ScrollView style={SharedStyles.mainScreen}>
            <TitledHeader title="Mi Calendario" />
            <View style={SharedStyles.mainPadding}>
                <Text style={SharedStyles.p}>
                    Recuerda que los reportes deben de realizarse dentro de las
                    primeras 48 horas.
                </Text>
                <Text style={SharedStyles.h2}>Seleccionar fechas en el calendario:</Text>
                <Calendar />
            </View>
        </ScrollView>
    );
}