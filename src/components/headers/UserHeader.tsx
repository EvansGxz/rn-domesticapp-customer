/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import UserImage from "../user/UserImage";
import MenuIcon from "../../resources/img/menu/menu.svg";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/use-auth";

export default function UserHeader() {
  const navigation = useNavigation<any>();

  const {state} = useAuth();
  const data = state.user;

  return (
    <View style={style.headerContainer}>
      <UserImage src={data?.image_url} />
      <View style={{width: "73%"}}>
        <Text style={style.mainText}>
          Hola, <Text style={style.boldText}>{data?.full_name}</Text>!
        </Text>
        <Text style={style.textEmail} numberOfLines={1}>
          {data?.email}
        </Text>
      </View>
      <View style={{ alignItems: "flex-end", width: "15%" }}>
        <TouchableOpacity
          style={{ margin: 10 }}
          onPress={() => navigation.navigate("Contract")}
        >
          <MenuIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  headerContainer: {
    width: "100%",
    backgroundColor: "#fff",
    zIndex: 1,
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 20,
  },
  mainText: {
    fontSize: 20,
    marginBottom: -5,
  },
  boldText: {
    fontWeight: "bold",
  },
  textEmail: {
    opacity: 0.6,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 150,
    marginRight: 12.5,
  },
  userImageCenter: {
    resizeMode: "center",
    borderRadius: 150,
  },
});
