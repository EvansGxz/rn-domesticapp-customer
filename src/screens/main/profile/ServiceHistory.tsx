/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ScrollView, StyleSheet, View, Text, FlatList, StatusBar } from 'react-native';
import { SharedStyles } from "../../../styles/shared-styles";

// COMPONENTs
import ServicesCard from "../../../components/cards/ServicesCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import useFetch from "use-http";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../hooks/use-auth";

export default function ServiceHistory() {
  const {state} = useAuth();
  // const {loading, error, data = []} = useFetch('/services/', {}, []);
  const { loading, error, data = [] } =
    useFetch(`/order_customer/${state.user.id}`, {}, []);
  const DATASERVICEACTIVE = data.filter((active: boolean) => !!active);
  console.log(DATASERVICEACTIVE);

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Tus Ultimos Servicios" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentScrollView}>
        <Text style={SharedStyles.h2}>Servicios en Curso</Text>
        {loading ? (<Loader />) : error ? (<Text>{error.message}</Text>) : (
          <FlatList
            data={DATASERVICEACTIVE}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            updateCellsBatchingPeriod={6}
            keyExtractor={(key: any) => key.id}
            ListHeaderComponent={() => (
              <View style={[SharedStyles.mainScreen]}>
                {!data.length && (
                  <View style={styles.card}>
                    <Text style={styles.text}>No se han añadido servicios</Text>
                  </View>
                )}
              </View>
            )}
            renderItem={({item}) => <ServicesCard onlyService item={item} />}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentScrollView: {
    padding: 10,
    paddingBottom: 35
  },
  card: {
    marginVertical: (StatusBar.currentHeight as number) * 5,
  },
  text: {
    fontSize: 14,
    color: "#787B82",
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
  },
});