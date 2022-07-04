import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
// import DashImg from "../../resources/img/ui/dashboard-img.png";

export default function HomeHero() {
    return (
        <View style={styles.heroContainer}>
            <HomeHeroSVG width="100%"   />
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
    width: "100%",
  },
  stretch: {
    height: 310,
    width: "100%",
    marginVertical: -15,
  },
});
