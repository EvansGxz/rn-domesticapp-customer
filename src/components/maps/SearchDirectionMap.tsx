import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import OutlinedInput from "../ui/OutlinedInput";

export default function SearchDirectionMap() {
    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <OutlinedInput 
                    style={styles.input}
                    placeholder="Ingresa dirección a laboral"
                />
            </View>
            <MapView 
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    longitude: -76.5205,
                    latitude: 3.42158,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 20,
        marginBottom: 20
    },
    inputContainer: {
        zIndex: 1,
        top: 10,
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        width: '90%',
        padding: 10,
        backgroundColor: '#fff',
        fontSize: 15
    },
    map: {
        overflow: 'hidden',
        width: '100%',
        height: 500,
    }
});