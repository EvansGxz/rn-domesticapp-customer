import React from "react";
import { ScrollView, StyleSheet, View, Image, Text } from "react-native";
import useFetch from "use-http";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

export default function MeetTheTeam({route}: {} | any) {
  const {idEmployee} = route.params;
  const { loading, error, data = {} } = useFetch('/employee/'+idEmployee, {}, []);
  console.log(data);
  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Conoce al equipo" />
      <ScrollView
        style={styles.cardsContainer}
        contentContainerStyle={styles.contentContainerCards}>
        {
          loading ? (
            <Text>Cargando...</Text>
          ) : error ? (
            <Text>{error.message}</Text>
          ) : (
            <View style={styles.cardsContainer}>
              <View style={styles.row}>
                <Image source={{uri: data?.image_url}} style={styles.avatar} />
                <View style={styles.column}>
                  <Text
                    style={[SharedStyles.h3, {color: '#696A6A', fontSize: 14}]}>
                      ID: {data.user_id}
                  </Text>
                  <Text style={[SharedStyles.p ,styles.heading]}>{data.full_name}</Text>
                  <Text
                    style={[SharedStyles.h3, {color: '#696A6A', fontSize: 14}]}>
                      EXPERIENCIA: 3 años
                    </Text>
                </View>
              </View>
            </View>
            // data.map(
            //   (status: any) => (
            //   )
            // )
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    padding: 10,
    paddingHorizontal: 15
  },
  contentContainerCards: {
    paddingBottom: 35,
  },
  avatar: {
    borderRadius: 100,
    width: 84,
    height: 84,
    alignSelf: 'center',
    marginRight: 15,
  },
  heading: {
    color: '#35435E',
    fontSize: 22,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    width: '100%',
  },
});
