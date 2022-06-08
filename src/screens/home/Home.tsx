import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import HomeHero from "../../components/ui/HomeHero";
import UserHeader from "../../components/ui/UserHeader";

export default function Home() {
    return (
        <ScrollView style={styles.homeContainer}>
            <UserHeader />
            <HomeHero />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1, 
        backgroundColor: '#fff',
        position: 'relative'
    }
});