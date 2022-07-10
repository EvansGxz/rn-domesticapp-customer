import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../../../config";

import { SharedStyles } from "../../../styles/shared-styles";
import * as Linking from 'expo-linking';
import { StackScreenProps } from "@react-navigation/stack";
import type { SupportStackParamList } from ".";

// COMPONENTs
import { FAQS } from "../../../constants/faqs";
import Button from "../../../components/ui/Button";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

type Props = StackScreenProps<SupportStackParamList, 'FaqsDetail'>;

export default function FaqsDetail({route}: Props) {
    const id = String(route.params?.id);
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