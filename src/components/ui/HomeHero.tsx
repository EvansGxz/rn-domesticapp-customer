import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import HomeHeroSVG from '../../resources/img/ui/home-hero.svg';

export default function HomeHero() {
    return (
        <View style={styles.heroContainer}>
            <HomeHeroSVG width="100%" />
            <View
                style={styles.heroTextContainer}
            >
                <Text style={styles.heroText}>Ambientes limpios,</Text>
                <Text style={[styles.heroText, { marginLeft: 5 }]}>personas felices.</Text>                 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    heroContainer: {
        position: 'relative',
        marginTop: -20
    },
    heroTextContainer: {
        position: 'absolute',
        left: 15,
        top: 28,
    },
    heroText: {
        fontSize: 25,
        marginBottom: -7
    }
});