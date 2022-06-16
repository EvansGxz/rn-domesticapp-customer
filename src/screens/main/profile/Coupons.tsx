import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { COLORS } from "../../../../config";
import CouponCard from "../../../components/cards/CouponCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Button from "../../../components/ui/Button";
import UnderlinedInput from "../../../components/ui/UnderlinedInput";
import { SharedStyles } from "../../../styles/shared-styles";

export default function Coupons() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Cupones" />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[SharedStyles.card, styles.couponValidation]}>
                    <UnderlinedInput 
                        style={styles.input} 
                        placeholder="Ingresa tu cupon"
                    />
                    <Button
                        textStyle={SharedStyles.smallButtonText} 
                        style={SharedStyles.smallButton}
                    >
                        Validar
                    </Button>
                </View>
                <Text style={SharedStyles.h2}>Mis cupones</Text>
                <View>
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                    <CouponCard />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    couponValidation: {
        flexDirection: 'row',
        padding: 25,
        alignItems: 'center',
    },
    container: {
        padding: 25
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 10
    }
});