import React from "react";
import { View, StyleSheet } from "react-native";
import ServiceTypeButton from "./ServiceTypeButton";

export default function ServiceTypesCatalog() {
    return (
        <View style={styles.servicesCatalogContainer}>
            <ServiceTypeButton />    
            <ServiceTypeButton />    
            <ServiceTypeButton />    
            <ServiceTypeButton />    
            <ServiceTypeButton />    
            <ServiceTypeButton />    
            <ServiceTypeButton />    
            <ServiceTypeButton />    
        </View>
    );
}

const styles = StyleSheet.create({
    servicesCatalogContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '85%',
        justifyContent: 'space-between'
    }
});