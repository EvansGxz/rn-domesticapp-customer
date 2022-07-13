import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export interface BackTitledHeaderProps {
  title: string;
}

export default function BackTitledHeader(props: BackTitledHeaderProps) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.containerButton} onPress={() => navigation.canGoBack() ? navigation.goBack() : null}>
        <Text style={styles.backIcon}>{"<"}</Text>
      </TouchableOpacity>
      {/* <BackIcon
                onPress={() => navigation.canGoBack() ? navigation.goBack() : null}
            /> */}
      <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    height: 75,
    paddingLeft: 20,
    alignItems: 'center',
    flexDirection: 'row'
  },
  title: {
    color: '#82868D',
    fontSize: 20,
    marginLeft: 20,
    paddingTop: 9,
    flex: 1,
    fontFamily: 'Poppins_600SemiBold'
  },
  containerButton: {
    alignItems: 'center',
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 30,
    color: '#0BBBEF',
  }
});