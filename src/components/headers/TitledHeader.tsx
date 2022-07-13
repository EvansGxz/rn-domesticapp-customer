import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface TitledHeaderProps {
  title: string;
}

export default function TitledHeader(props: TitledHeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    height: 75,
    justifyContent: 'center',
    paddingLeft: 20
  },
  title: {
    color: '#82868D',
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold'
  }
});