import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function Coupons() {
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="Cupones" />
            <ScrollView>
                <View></View>
                <View>
                    <Text>Mis cupones</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
});