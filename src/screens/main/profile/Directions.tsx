import React, { useContext, useState, useRef, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Alert } from "react-native";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import MenuOption from "../../../components/ui/MenuOption";
import OutlinedInput from "../../../components/ui/OutlinedInput";
import { SharedStyles } from "../../../styles/shared-styles";
import WoldSVG from "../../../resources/img/ui/gps.svg";
import CheckSVG from "../../../resources/img/ui/check.svg";
import useFetch from "use-http";
import { AuthContext } from "../../../contexts/auth-context";
import Button from "../../../components/ui/Button";
import { createAddress, showAddress } from "../../../services/address-services";
import { httpClient } from "../../../controllers/http-client";
import { AxiosError } from "axios";

export default function Directions() {
  const auth = useContext(AuthContext);
  const {
    loading,
    error,
    data = [],
  } = useFetch("/address/" + auth.getState().user.id, {}, []);

  useEffect(() => {
    auth.getState().user.id;
  }, [auth.getState().user.id]);

  const [dataChange, setDataChange] = useState([] as any);
  const [datos, setDatos] = useState([] as any);

  const [dataList, setDataList] = useState({
    address: "",
    customer_id: auth.getState().user.id,
  });

  const onChangeText = (name: string, value: string) => {
    setDataList({ ...dataList, [name]: value });
  };

  const originRef = useRef();

  const newAddress = async () => {
    if (dataChange === "") {
      return;
    }
    try {
      const getAddress = await httpClient.post("/address", dataList);
      setDatos([...datos, getAddress]);
    } catch (err) {
      console.log(err);
      console.log((err as AxiosError).response);
      const errors: any = ((err as AxiosError).response?.data as any).errors;
      Alert.alert(
        "Error",
        Object.keys(errors)
          .map((key: string) => errors[key].join(" "))
          .join(", ")
      );
    }

    /* createAddress(getAddress).then(() => {
        // window.location.reload();
        console.log("add")
      }); */
  };

  console.log("Direction", data);
  console.log(loading);
  console.log(error);
  console.log(dataChange);
  console.log("userID = " + auth.getState().user.id);

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Direcciones" />
      <ScrollView
        style={SharedStyles.fill}
        contentContainerStyle={SharedStyles.mainPadding}
      >
        <OutlinedInput
          style={styles.input}
          placeholder="Ingresa direccion a laborar"
          value={dataChange}
          onChangeText={(value: string) => onChangeText("address", value)}
          onSubmitEditing={() => {
            (originRef.current as any).focus();
          }}
        />
        <View style={SharedStyles.mainPadding}>
          <Button style={SharedStyles.backgroundPrimary} onPress={newAddress}>
            Agregar
          </Button>
        </View>
        <View style={{ marginTop: 20 }}>
          {loading ? (
            <Text>Cargando...</Text>
          ) : error ? (
            <Text>{error.message}</Text>
          ) : (
            data.map((direction: any) => (
              <MenuOption
                key={`direction-${direction.id}`}
                icon={CheckSVG}
                size={30}
                text={direction.address}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
  },
});
