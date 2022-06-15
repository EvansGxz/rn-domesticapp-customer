import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import ChatMessage, { SupportChatMessage } from "../../../components/cards/ChatMessage";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import TextArea from "../../../components/ui/TextArea";
import { SharedStyles } from "../../../styles/shared-styles";

export default function SupportChat() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Conecta con Soporte" />
            <ScrollView style={SharedStyles.fill}>
                <SupportChatMessage />
                <ChatMessage />
            </ScrollView>
            <View>
                <TextArea 
                    numberOfLines={3} 
                    placeholder="Escribe aquí y pulsa intro" 
                    style={styles.textArea}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    textArea: {
        backgroundColor: '#fff',
        borderTopColor: 'rgba(0,0,0,0.2)',
        borderTopWidth: 1,
        textAlignVertical: 'center',
    }
});