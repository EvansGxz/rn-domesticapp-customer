import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SharedStyles } from "../../styles/shared-styles";
import Button from "../ui/Button";

export default function CouponCard() {
    return (
        <View style={[SharedStyles.card, styles.card]}>
            <View style={SharedStyles.fill}>
                <Text style={styles.title}>Limpieza de Hogar</Text>
                <Text>20% de descuento</Text>
                <Text>Código: <Text style={styles.boldCode}>limp20</Text></Text>
            </View>
            <View>
                <Button
                    textStyle={SharedStyles.smallButtonText} 
                    style={SharedStyles.smallButton}
                >
                    Usar cupón
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        padding: 25,
        flexDirection: 'row',
        marginBottom: 25,
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
        color: '#3D4451',
    },
    boldCode: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        color: '#3D4451',
    },
    discountText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 14,
        color: '#3D4451',
    }
});