import React from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
// import DashImg from "../../resources/img/ui/dashboard-img.png";

export default function HomeHero() {
  return (
    <>
      <Image
        source={require("../../resources/img/ui/dashboard-img.png")}
        style={styles.stretch}
        resizeMode="cover"
      />
      <View style={styles.heroContainer}>
        {/* <DashImg width={"100%"} style={{ backgroundColor: "orange" }} /> */}
      </View>
    </>
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
