import React from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import { useFetch } from "use-http";
import { AuthContext } from "../../../contexts/auth-context";
import FlatCard from "./FlatCard";
import { COLORS } from "../../../../config";
import Loader from "../../../components/Loader";

export default function CalendarScreen(props: any) {
  const state = React.useContext(AuthContext);
  const { loading, error, data = [] } =
    useFetch('/order_customer/'+state.getState().user.data.id,{}, []);
  const dataActive = data.filter((active: boolean) => !!active);

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Mi Calendario" />
      {loading ? (<Loader />) : error ? (<Text>{error.message}</Text>) : (
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
            ListHeaderComponent={() => (
              <View style={SharedStyles.mainScreen}>
                <Text style={SharedStyles.p}>
                  Recuerda que los reportes deben de realizarse dentro de las primeras
                  48 horas.
                </Text>
                <Text style={SharedStyles.h2}>
                  Seleccionar fechas en el calendario:
                </Text>
                <Calendar />
                {!dataActive.length && (
                  <View style={style.card}>
                    <Text style={style.text}>No se han añadido servicios</Text>
                  </View>
                )}
              </View>
            )}
            renderItem={({item}): any => (
              <FlatCard item={item} />
            )}
          />
        </>
        )
      }
      {/*  <View style={[SharedStyles.centerContent, SharedStyles.mainPadding]}>
        <Button style={SharedStyles.backgroundPrimary}>
          Ir a Proximo Servicio
        </Button>
      </View> */}
    </View>
  );
}

/* export function DayCard() {
  return (
    <View style={style.card}>
      <Text style={style.cardTitle}>Jueves, 11 de Mayo</Text>
      <Text style={style.text}>No se han añadido servicios</Text>
    </View>
  );
} */

const style = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightBlue,
    borderBottomColor: "#0BBBEF",
    borderBottomWidth: 1,
    padding: 20,
    paddingVertical: 40,
    marginVertical: 30,
  },
  text: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    textAlign: "center",
    color: "#787B82",
  },
});