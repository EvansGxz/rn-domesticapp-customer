/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { SharedStyles } from '../../../styles/shared-styles';
import { StackScreenProps } from '@react-navigation/stack';
import { useFetch } from 'use-http';
import { orderByDistance, getDistance } from 'geolib';

// COMPONENTs
import FlatCard from '../calendar/FlatCard';
import Loader from '../../../components/Loader';
import Button from '../../../components/ui/Button';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';

// UTILs
import { COLORS } from '../../../../config';
import { HomeStackParamList } from '../home';
import { useAuth } from '../../../hooks/use-auth';
import { apiGooglePlace, apiMapBox } from '../../../controllers/http-client';
import { LocationUser } from '../../../interfaces/interfaces';

type Props = StackScreenProps<HomeStackParamList, 'HomeScreen'>;

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default function CalendarScreen({ navigation }: Props) {
  const { state } = useAuth();
  const { loading, error, data = [] } =
    useFetch(`/order_customer/${state.user.id}`, {}, []);
  const dataActive = data.filter((active: boolean) => !!active);
  const [coordinate, setCoordinate] = useState<any>([]);

  const employee = useFetch(`/employee`, {}, [])[0].data;
  const newCoodernate:any = [];
  const getEmployee = async () => {
    const REGION = employee?.map(({employee: {region}}: any) => region);
    // console.log(REGION)
    const promise = REGION?.map(async (name: string, index: number) => {
      const ORIGIN = `${state.location?.latitude}, ${state.location?.longitude}`;
      const {data} = await apiGooglePlace.get(`/json?${name}`);
      // const {data} = await apiMapBox.get(`/medellin cra 20.json`);
      // console.log(JSON.stringify(data).split('').slice(1000).join(''));
      
      // console.log(data.features[index]);
      // console.log(data.features[index]?.center);
      // if (data.features[index]?.place_name.includes(name)) {
      // }
    });
    // if (REGION !== undefined && REGION !== null) {
    //   const COUNTRY = await Promise.all(promise);
    //   console.log(COUNTRY);
    //   COUNTRY.forEach((item: any, index: number) => {
    //     const DISTANCE = item.data.features[index]?.geometry?.coordinates;
    //     if (Array.isArray(DISTANCE)) {
    //       newCoodernate.push({latitude: DISTANCE[1], longitude: DISTANCE[0]});
    //     }
    //   });
    // }
    setCoordinate(newCoodernate);
  }

  useEffect(() => {
    getEmployee();
  }, [employee]);

  useEffect(() => {
    const ORIGEN = {
      latitude: state.location.latitude,
      longitude: state.location.longitude };
    const calculate: any[] = [];
    const pdis = orderByDistance(ORIGEN, coordinate);
    pdis.forEach((item: any) => {
      const calculateDistance = getDistance(ORIGEN, {latitude: item.latitude, longitude: item.longitude});
      calculate.push({km: Math.round(calculateDistance / 1000)});
    });
    // console.log(calculate);
  }, [coordinate]);


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
                {
                  flex: 1,
                  padding: 10,
                  paddingHorizontal: 15
                }
                ]}
              renderItem={({ item }): any => (
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
  map: {
    overflow: 'hidden',
    width: '100%',
    height: 500,
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

