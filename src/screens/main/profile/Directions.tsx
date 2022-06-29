import React, { useContext, useState, useRef } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
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

export default function Directions() {
  const auth = useContext(AuthContext);
  const {
    loading,
    error,
    response,
    post,
    data = [],
  } = useFetch("/address/" + auth.getState().user.id, {}, []);

  const [dataChange, setDataChange] = useState(data);
  const [dataList, setDataList] = useState({
    customer_id: "",
    address: "",
  });

  const onChangeText = (name: string, value: string) => {
    setDataList({ ...dataList, [name]: value });
  };

  const originRef = useRef();

  const newAddress = async () => {
    if (dataChange === "") {
      return;
    }
    /* const getAddress = await post("/address/", {
      customer_id: auth.getState().user.id,
      address: dataChange,
    });
    if (response.ok) data[getAddress]; */
    /* createAddress(getAddress).then(() => {
        // window.location.reload();
        console.log("add")
      });
      console.log(error) */
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
