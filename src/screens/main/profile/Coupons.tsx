import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

export default function Coupons() {
    return (
        <View style={styles.screen}>
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
    screen: { flex: 1, backgroundColor: '#fff' },
});