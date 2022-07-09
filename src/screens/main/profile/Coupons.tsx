import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import useFetch from "use-http";
import CouponCard from "../../../components/cards/CouponCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Button from "../../../components/ui/Button";
import UnderlinedInput from "../../../components/ui/UnderlinedInput";
import { AuthContext } from "../../../contexts/auth-context";
import { SharedStyles } from "../../../styles/shared-styles";

export default function Coupons() {
    const state = useContext(AuthContext);
    const {error, data = []} = useFetch(`/cupon_users/${state.getState().user.user_id}`,{},[]);
    console.log(error);
    console.log(data);

    const [isValid, setIsValid] = useState(false);
    const [cupon, setCupon] = useState("");
    const [isPress, setIsPress] = useState(false);

    const dataCupon = "limp20";
    const validate = () => {
        setIsPress(true);
        setTimeout(() =>{
            setIsPress(false);
        },2500)
        if (cupon == dataCupon) {
            console.log("Cupon valido")
            setIsValid(true)
        } else {
            console.log("Cupon invalido")
            setIsValid(false)
        }
    }
    console.log(cupon);
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Cupones" />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={[SharedStyles.card, styles.couponValidation]}>
                    <UnderlinedInput
                        style={styles.input}
                        placeholder="Ingresa tu cupon"
                        value={cupon}
                        onChangeText={setCupon}
                    />
                    <Button
                        textStyle={SharedStyles.smallButtonText}
                        style={SharedStyles.smallButton}
                        onPress={validate}
                    >
                        Validar
                    </Button>
                </View>
                <View style={styles.validation}>
                    {
                        isPress ? (
                            isValid ? (
                                <Text style={styles.textValidateTrue}>¡Cupón válido!</Text>
                            ):(<Text style={styles.textValidateFalse}>¡Cupón inválido!</Text>)
                        ): <View></View>
                    }
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
    },
    validation: {
        top: 10,
        left: "10%",
        textAlignVertical: "center",
    },
    textValidateTrue: {
        color: "green"
    },
    textValidateFalse: {
        color: "red"
    }
});