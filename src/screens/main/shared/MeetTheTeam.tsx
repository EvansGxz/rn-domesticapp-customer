import React, { Suspense, useState } from "react";
import { ScrollView, StyleSheet, View, Image, Alert, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import useFetch from "use-http";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTs
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import Button from "../../../components/ui/Button";

// SVGs
import SvgShield from '../../../resources/img/ui/shield.svg';
import StarFill from '../../../resources/img/ui/star-fill.svg';

// STYLEs
import { SharedStyles } from "../../../styles/shared-styles";
import { COLORS } from "../../../../config";

interface idProp {
  id?: string | number;
}

const useGetData = (id: idProp) => {
  const [data, setData] = useState<any>(null)
  
  const fetch = useFetch('/employee/'+id, {}, [])[0].data;

  React.useEffect(() => {
    if(id){
      setData(fetch);
    }
  }, [id ]);
  return {data}
}

export default function MeetTheTeam({route, navigation}: {} | any) {
  let {idEmployee} = route.params;
  const data = useFetch('/employee/'+idEmployee, {}, [])[0].data;
  const reviews = useFetch('/reviews/'+idEmployee, {}, [])[0].data;
  console.log(reviews);

  return (
    <Suspense fallback={<ActivityIndicator size="large"/>}>
      <View style={SharedStyles.mainScreen}>
        <BackTitledHeader title="Conoce al equipo" />
        <ScrollView
          style={styles.cardsContainer}
          contentContainerStyle={styles.contentContainerCards}>
          <View style={styles.cardsContainer}>
            <View style={styles.row}>
              <Image source={{uri: data?.image_url}} style={styles.avatar} />
              <View style={styles.column}>
                <Text
                  style={[SharedStyles.h3, {color: '#696A6A', fontSize: 14}]}>
                    ID: {data?.user_id}
                </Text>
                <Text style={[SharedStyles.p ,styles.heading]}>{data?.full_name}</Text>
                <Text
                  style={[SharedStyles.h3, {color: '#696A6A', fontSize: 14}]}>
                    EXPERIENCIA: {data?.experience} años
                  </Text>
              </View>
            </View>
            <Text style={[SharedStyles.h2, {marginBottom: 10}]}>Aptitudes</Text>
            <View style={[SharedStyles.card, {padding: 0, marginBottom: 30}]}>
              <View
                style={[
                  styles.row,
                  {margin: 10, marginBottom: 20, alignItems: 'flex-start'}]}>
                <SvgShield />
                <Text
                  style={[
                    SharedStyles.h3, {
                      color: COLORS.colorUserName,
                      padding: 10,
                    }]}>
                    Aprendiendo lo básico
                </Text>
              </View>
              <View
                style={[
                  styles.row,
                  {margin: 10, marginBottom: 20, alignItems: 'flex-start'}]}>
                <SvgShield />
                <Text
                  style={[SharedStyles.h3, {color: COLORS.colorUserName, padding: 10}]}>
                    Obtén Mejores Reseñas
                </Text>
              </View>
              <View
                style={[
                  styles.row,
                  {margin: 10, marginBottom: 10, alignItems: 'flex-start'}]}>
                <SvgShield />
                <Text
                  style={[SharedStyles.h3, {color: COLORS.colorUserName, padding: 10}]}>
                    Tipo de Servicios
                </Text>
              </View>
              <Button
                style={{
                  backgroundColor: COLORS.primary,
                  alignSelf: 'flex-end',
                  maxWidth: 100,
                  padding: 0,
                  borderRadius: 5,
                }}
                textStyle={{
                  ...SharedStyles.p,
                  fontSize: 13,
                }}
                >Ver más</Button>
            </View>
            <View style={styles.review}>
              <Text style={[SharedStyles.h2, {marginBottom: 10}]}>Reseñas</Text>
              <View style={styles.row}>
                <View>
                  <Text style={SharedStyles.h3}>Elon Musk</Text>
                  <Text style={[SharedStyles.h2WithoutMargin, {fontSize: 11}]}>Un trabajo impecable!</Text>
                </View>
                <View style={[styles.row, {justifyContent: 'center', width: '100%', flex: 1}]}>
                  <StarFill style={{marginHorizontal: 3}} />
                  <StarFill style={{marginHorizontal: 3}} />
                  <StarFill style={{marginHorizontal: 3}} />
                  <StarFill style={{marginHorizontal: 3}} />
                  <StarFill style={{marginHorizontal: 3}} />
                </View>
              </View>
              <TouchableOpacity style={{borderBottomColor: '#0BBBEF33', borderBottomWidth: 1}}>
                <Text
                  style={{
                    ...SharedStyles.h2WithoutMargin,
                    fontSize: 11,
                    color: COLORS.primary,
                    alignSelf: 'flex-end',
                  }}>2 más</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Suspense>
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
    alignItems: 'center',
  },
  column: {
    flex: 1,
    width: '100%',
  },
  review: {}
});
