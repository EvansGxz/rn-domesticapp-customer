import React from "react";
import { ScrollView, StyleSheet, View, Text, FlatList } from 'react-native';
import { SharedStyles } from "../../../styles/shared-styles";

// COMPONENTs
import ServiceStatusCard from "../../../components/cards/ServiceStatusCard";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import useFetch from "use-http";
import Loader from "../../../components/Loader";

export default function ServiceHistory() {
  const {loading, error, data = []} = useFetch('/services/', {}, []);

  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Tus Ultimos Servicios" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentScrollView}>
        <Text style={SharedStyles.h2}>Servicios en Curso</Text>
        {loading ? (<Loader />) : error ? (<Text>{error.message}</Text>) : (
          <FlatList
            data={data}
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            updateCellsBatchingPeriod={6}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            keyExtractor={(key: any) => key.id}
            renderItem={({item}) => <ServiceStatusCard service={item} />}
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
  }
});