import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { COLORS } from "../../../../config";
import { useNavigation } from "@react-navigation/native";

// COMPONENTs
import Button from "../../../components/ui/Button";
import HomeHero from "../../../components/ui/HomeHero";
import UserHeader from "../../../components/headers/UserHeader";
import ServiceTypesCatalog from "../../../components/services/ServiceTypesCatalog";

export default function Home() {
  const nav = useNavigation<any>();
  return (
    <ScrollView style={styles.homeContainer}>
      <UserHeader />
      <HomeHero />
      <View style={styles.centerCategories}>
        <ServiceTypesCatalog />
        <Button
          style={styles.button}
          onPress={() => nav.navigate('Team', {screen: "MeetTheTeam"})}>
          Conoce al Equipo
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    position: "relative",
  },
  centerCategories: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },
  button: {
    width: "85%",
    padding: 20,
    backgroundColor: COLORS.primary,
  },
});
