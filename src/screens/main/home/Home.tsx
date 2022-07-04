import React from "react";
import { StyleSheet, ScrollView, View, FlatList } from "react-native";
import { COLORS } from "../../../../config";
import ServiceTypesCatalog from "../../../components/services/ServiceTypesCatalog";
import Button from "../../../components/ui/Button";
import HomeHero from "../../../components/ui/HomeHero";
import UserHeader from "../../../components/headers/UserHeader";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const nav = useNavigation<any>();
  return (
    <ScrollView style={styles.homeContainer}>
      <UserHeader />
      <HomeHero />
      {/* Center Container */}
      <View style={styles.centerCategories}>
        {/* <FlatList
                horizontal={true}
                /> */}
        <ServiceTypesCatalog />
        <Button
          style={styles.button}
          onPress={() => nav.navigate("MeetTheTeam")}
        >
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
