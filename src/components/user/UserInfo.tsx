import React from "react";
import { View, Text, StyleSheet } from "react-native";
import UserImage from "./UserImage";
import { useAuth } from "../../hooks/use-auth";
import { COLORS } from "../../../config";


export default function UserInfo() {
  const { state } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.directionRow}>
        <UserImage size={65} src={state.user?.image_url} />
        <Text style={styles.textName}>{state.user?.full_name}</Text>
      </View>
      {/*<Text style={styles.servicesCount}>325 Servicios Solicitados</Text>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomColor: COLORS.lightGray,
    borderBottomWidth: 1,
  },
  directionRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  textName: {
    fontSize: 32,
    maxWidth: '70%'
  },
  servicesCount: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#787B82'
  }
});
