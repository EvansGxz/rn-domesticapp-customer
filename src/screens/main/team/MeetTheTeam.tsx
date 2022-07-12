/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { View, Text, FlatList } from "react-native";
import { SharedStyles } from "../../../styles/shared-styles";
import { useFetch } from "use-http";

// COMPONENTs
import FlatCard from "../calendar/FlatCard";
import Loader from "../../../components/Loader";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { useAuth } from "../../../hooks/use-auth";

export default function CalendarScreen() {
  const {state} = useAuth();
  const { loading, error, data = [] } =
    useFetch(`/order_customer/${state.user.id}`,{}, []);
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