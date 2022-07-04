import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import useFetch from "use-http";
import ServiceStatusCard from "../../../components/cards/ServiceStatusCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { AuthContext } from "../../../contexts/auth-context";
import { SharedStyles } from "../../../styles/shared-styles";
import { showOrderDetail } from "../../../services/order-details-services";

export default function MeetTheTeam() {
  const auth = useContext(AuthContext);
  const {
    loading,
    error,
    data = [],
  } = useFetch("/order_details/26" + auth.getState().user.id, {}, []);

  console.log("datos= " + data);
  console.log(loading);
  console.log(error);

  const [serviceDetail, setServiceDetail] = useState([]);
  const user = auth.getState().user.id;
  useEffect(() => {
    showOrderDetail(user).then(setServiceDetail);
  }, [user]);

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Conoce al equipo" />
      <ScrollView
        style={styles.cardsContainer}
        contentContainerStyle={styles.contentContainerCards}
      >
        {loading ? (
          <Text>Cargando...</Text>
        ) : error ? (
          <Text>{error.message}</Text>
        ) : (
          serviceDetail.map((status: any) => (
            <ServiceStatusCard key={`status-${status.id}`} status={status} />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    padding: 10,
  },
  contentContainerCards: {
    paddingBottom: 35,
  },
});
