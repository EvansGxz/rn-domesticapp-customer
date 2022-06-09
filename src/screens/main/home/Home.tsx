import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { COLORS } from "../../../../config";
import ServiceTypesCatalog from "../../../components/services/ServiceTypesCatalog";
import Button from "../../../components/ui/Button";
import HomeHero from "../../../components/ui/HomeHero";
import UserHeader from "../../../components/headers/UserHeader";

export default function Home() {
    return (
        <ScrollView style={styles.homeContainer}>
            <UserHeader />
            <HomeHero />
            {/* Center Container */}
            <View style={styles.centerCategories}>
                <ServiceTypesCatalog />
                <Button style={styles.button}>Conoce al Equipo</Button>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1, 
        backgroundColor: '#f7f7f7',
        position: 'relative'
    },
    centerCategories: {
        alignItems: 'center',
        marginTop: 25,
        marginBottom: 25
    },
    button: {
        width: '85%',
        padding: 20,
        backgroundColor: COLORS.primary
    }
});