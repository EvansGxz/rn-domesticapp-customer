import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import { getCalendarContext } from "../../screens/main/home";
export interface ServiceTypeButtonProps {
  id: number;
  image: string;
  name: string;
}

export default function ServiceTypeButton(props: ServiceTypeButtonProps) {
  const navigation = useNavigation<any>();
  const { setcategory_id } = getCalendarContext();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setcategory_id(props.id.toString());
        navigation.navigate("SelectService", { id: props.id })
      }}
    >
      <Image style={styles.serviceImg} source={{ uri: props.image }} />
      <Text style={styles.serviceText}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    // width: "50%",
    alignItems: "center",
    marginVertical: 5,
    marginHorizontal:10,
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

