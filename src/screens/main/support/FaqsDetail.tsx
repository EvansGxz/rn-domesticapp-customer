import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../../../config";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function FaqsDetail() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="PQR Servicios" />
            <ScrollView style={SharedStyles.mainScreen} contentContainerStyle={SharedStyles.mainPadding}>
                <Text style={styles.faqsTitle}>1.1 FAQS RELACIONADAS CON MIS SERVICIOS</Text>
                <Faq />
                <Faq />
                <Faq />
                <Faq />
            </ScrollView>
        </View>
    );
}

export function Faq() {
    return (
        <View>
            <View style={[SharedStyles.card, SharedStyles.mb, SharedStyles.pd, { marginTop: 50 }]}>
                <Text style={[SharedStyles.h2WithoutMargin, { fontSize: 14 }]}>1.1.1 ¿Cómo puedo programar/cancelar o reagendar un servicio en Domesticapp?</Text>
            </View>
            <View style={SharedStyles.card}>
                <Text style={[SharedStyles.p, { fontSize: 14 }]}>
                    Descarga el aplicativo móvil de Domesticapp para Colombia, España y Canadá. Accede al manejo
                    de tus servicios en tiempo real. Conoce a tus asistentes, calificalos y goza de multiples beneficios.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    faqsTitle: {
        fontFamily: 'Poppins_300Light',
        fontSize: 16,
        marginBottom: 20,
        color: COLORS.primary
    }
});