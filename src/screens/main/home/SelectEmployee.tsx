import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { SharedStyles } from "../../../styles/shared-styles";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import UserImage from "../../../components/user/UserImage";

export default function SelectEmployee() {
  const employee = [
    {
      id: 1,
      name: "Liliana Berrio Saldabarriga",
    },
  ];
  return (
    <View style={[SharedStyles.mainScreen]}>
      <BackTitledHeader title="Selecciona un empleado" />
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <View style={[SharedStyles.card, styles.card]}>
            <UserImage size={60} />
            <View style={styles.containerMain}>
              <Text style={styles.title}>Manuel Alberto Ortiz</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    flexDirection: "row",
    marginBottom: 25,
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_500SemiBold",
    fontSize: 24,
    fontWeight: "400",
    color: "#35435E",
  },
  containerMain: {
    flex: 1,
  },
});
