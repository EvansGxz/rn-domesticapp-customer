import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../../../config";
import UserImage from "../user/UserImage";

interface ServiceProp {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: any;
}

export default function ServiceStatusCard(props: ServiceProp) {
  const { service } = props;

  return (
    <>
      <View style={styles.card}>
        <UserImage size={60} />
        <View style={styles.rightSide}>
          <Text style={styles.name}>{service.category_name}</Text>
          <Text numberOfLines={1}>{service.service_name}</Text>
          <View style={styles.statusContainer}>
            {/* <Text style={styles.statusText}>
              {status.active ? "Activo" : "No Activo"}
            </Text> */}
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightBlue,
    borderBottomColor: "#0BBBEF",
    borderBottomWidth: 1,
    padding: 20,
    marginVertical: 15,
    flexDirection: 'row',
  },
  rightSide: {
    flex: 1,
    marginLeft: 10,
  },
  statusContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  name: {
    fontWeight: "500",
    fontSize: 18,
  },
});
