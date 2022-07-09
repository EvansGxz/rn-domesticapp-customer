import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SharedStyles } from "../../styles/shared-styles";
import Button from "../ui/Button";

interface CouponProp {
    coupon?: any | {};
};

export default function CouponCard(props: CouponProp) {
    const {coupon} = props;
    return (
        <View style={[SharedStyles.card, styles.card]}>
            <View style={SharedStyles.fill}>
                <Text style={[styles.title, styles.fontAndColor]}>{coupon?.cupon_title}</Text>
                <Text>{coupon?.discount}% de descuento</Text>
                <Text>Código: <Text style={[styles.boldCode, styles.fontAndColor]}>{coupon?.name}</Text></Text>
            </View>
            <View>
                <Button
                    textStyle={SharedStyles.smallButtonText} 
                    style={SharedStyles.smallButton}>
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
        marginVertical: 10,
        marginHorizontal: 15,
        alignItems: 'flex-end',
    },
    fontAndColor: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#3D4451',
    },
    title: {
        fontSize: 18,
        paddingVertical: 4,
    },
    boldCode: {
        fontSize: 16,
        paddingVertical: 4,
    },
});