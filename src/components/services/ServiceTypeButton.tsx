/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { useCalendar } from "../../contexts/calendarContext";
export interface ServiceTypeButtonProps {
  category: any
}

const ServiceTypeButton = (props: ServiceTypeButtonProps) => {
  const navigation = useNavigation<any>();
  const { setcategory_id } = useCalendar();
  const { id, category_name, image_url } = props.category;

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setcategory_id(id.toString());
        navigation.navigate("SelectService", { id: id })
      }}>
      <Image style={styles.serviceImg} source={{ uri: image_url }} />
      <Text style={styles.serviceText}>{category_name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal: 10,
  },
  serviceImg: {
    width: 60,
    height: 60,
  },
  serviceText: {
    textAlign: "center",
    fontSize: 9,
    marginTop: 5,
    fontFamily: "Poppins_400Regular",
  },
});

export default React.memo(ServiceTypeButton);