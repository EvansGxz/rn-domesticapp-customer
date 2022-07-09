import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import { useFetch } from "use-http";
import { AuthContext } from "../../../contexts/auth-context";
import FlatCard from "../calendar/FlatCard";
import { COLORS } from "../../../../config";
import Loader from "../../../components/Loader";

export default function CalendarScreen(props: any) {
  const state = React.useContext(AuthContext);
  const { loading, error, data = [] } =
    useFetch(`/order_customer/${state.getState().user.id}`,{}, []);
  const dataActive = data.filter((active: boolean) => !!active);

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Conoce al equipo" />
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
            renderItem={({item}): any => (
              <FlatCard item={item} />
            )}
          />
        </>
        )
      }
    </View>
  );
}

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