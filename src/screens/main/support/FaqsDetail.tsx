import { useRoute } from "@react-navigation/core";
import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../../../config";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { FAQS } from "../../../constants/faqs";
import { SharedStyles } from "../../../styles/shared-styles";
import Button from "../../../components/ui/Button";
import * as Linking from 'expo-linking';

export default function FaqsDetail() {
    const route = useRoute<any>();
    const id = String(route.params?.id as number);
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title={FAQS[id].title} />
            <ScrollView style={SharedStyles.mainScreen} contentContainerStyle={SharedStyles.mainPadding}>
                <Text style={styles.faqsTitle}>{FAQS[id].legend}</Text>
                {
                    FAQS[id].preguntas.map((question: any) => (
                        <Faq
                            key={`question-${question.id}`}
                            question={question.pregunta}
                            answer={question.respuesta}
                        />
                    ))
                }
            </ScrollView>
            <View style={[SharedStyles.centerContent, SharedStyles.mainPadding]}>
                <Button style={SharedStyles.backgroundPrimary} onPress={() => Linking.openURL('https://wa.me/18444684329?text=Necesito ayuda')}>Conectar con soporte</Button>
            </View>
        </View>
    );
}

export function Faq(props: any) {
    return (
        <View style={{ marginBottom: 15 }}>
            <View style={[SharedStyles.card, SharedStyles.pd, { marginTop: 20, marginBottom: 10 }]}>
                <Text style={[SharedStyles.h2WithoutMargin, { fontSize: 14 }]}>
                    {props.question}    
                </Text>
            </View>
            <View style={[SharedStyles.card]}>
                <Text style={[SharedStyles.p, { fontSize: 14 }]}>
                    {props.answer}    
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