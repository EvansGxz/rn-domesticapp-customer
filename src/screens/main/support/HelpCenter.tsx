import React from "react";
import { View, Text, ScrollView } from "react-native";
import TitledHeader from "../../../components/headers/TitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function HelpCenter() { 
    return (
        <ScrollView style={SharedStyles.mainScreen}>
            <TitledHeader title="Centro de Ayuda" />
            <View style={SharedStyles.mainPadding}>
                <Text>
                    Para tu comodidad. Tenemos distintos articulos
                    donde solucionar tus dudas, o puedes contactar con nuestro
                    Centro de Soporte y Ayuda.
                </Text>
                <Text style={SharedStyles.h2}>Temas de ayuda</Text>
            </View>
        </ScrollView>
    );
}