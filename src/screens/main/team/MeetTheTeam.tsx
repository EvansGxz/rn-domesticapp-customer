/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SharedStyles } from "../../../styles/shared-styles";
import { StackScreenProps } from "@react-navigation/stack";
import { useFetch } from "use-http";

// COMPONENTs
import FlatCard from "../calendar/FlatCard";
import Loader from "../../../components/Loader";
import Button from "../../../components/ui/Button";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";

// UTILs
import { useAuth } from "../../../hooks/use-auth";
import { COLORS } from "../../../../config";
import { HomeStackParamList } from "../home";

type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>

export default function CalendarScreen({navigation}: Props) {
  const {state} = useAuth();
  const { loading, error, data = [] } =
    useFetch(`/order_customer/${state.user.id}`,{}, []);
  const dataActive = data.filter((active: boolean) => !!active);

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Conoce al equipo" />
      {loading ? (<Loader />) : error ? (<Text>{error.message}</Text>) : (
        dataActive.length > 0 ? (
          <>
            <FlatList
              data={dataActive}
              keyExtractor={(key: any) => key.id}
              style={
                [SharedStyles.mainScreen,
                  {flex: 1,
                  padding: 10,
                  paddingHorizontal: 15}
                ]}
              renderItem={({item}): any => (
                <FlatCard item={item} />
              )}
            />
          </>
        ) : (
          <View style={styles.container}>
            <Text style={styles.textEmployee}>Aun no cuentas con servicios</Text>
            <Button
              style={styles.button}
              onPress={navigation.goBack}>
              Contratar un servicio
            </Button>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: "#f7f7f7",
  },
  textEmployee: {
    fontSize: 20,
  },
  button: {
    width: "100%",
    padding: 20,
    marginVertical: 20,
    backgroundColor: COLORS.primary,
  },
});
