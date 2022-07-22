/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { View, Text, FlatList, Dimensions } from 'react-native';
import { SharedStyles } from '../../../styles/shared-styles';
import { useFetch } from 'use-http';
// import { orderByDistance, getDistance } from 'geolib';

// COMPONENTs
import Loader from '../../../components/Loader';
import ServiceTeam from '../../../components/cards/ServiceTeam';
import BackTitledHeader from '../../../components/headers/BackTitledHeader';

// UTILs
import { useAuth } from '../../../hooks/use-auth';


const { width, height } = Dimensions.get('screen');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function CalendarScreen() {
  const { state } = useAuth();
  const { loading, error, data = [] } = useFetch(`/employee`, {}, []);
  const COUNTRY = data?.filter(({employee}: any) => employee.country === state.user.country);
  // const newCoodernate:any = [];
  // const getEmployee = async () => {
  //   const REGION = employee?.map(({employee: {region}}: any) => region);
  //   setCoordinate(newCoodernate);
  // }

  // useEffect(() => {
  //   getEmployee();
  // }, [employee]);

  // useEffect(() => {
  //   const ORIGEN = {
  //     latitude: state.location.latitude,
  //     longitude: state.location.longitude };
  //   const calculate: any[] = [];
  //   const pdis = orderByDistance(ORIGEN, coordinate);
  //   pdis.forEach((item: any) => {
  //     const calculateDistance = getDistance(ORIGEN, {latitude: item.latitude, longitude: item.longitude});
  //     calculate.push({km: Math.round(calculateDistance / 1000)});
  //   });
  //   // console.log(calculate);
  // }, [coordinate]);


  return (
    <View style={SharedStyles.mainScreen}>
      <BackTitledHeader title="Conoce al equipo" />
      {loading ? (<Loader />) : error ? (<Text>{error.message}</Text>) : (
        <FlatList
          data={COUNTRY}
          keyExtractor={(key: any) => key.employee.id}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          updateCellsBatchingPeriod={6}
          style={
            [SharedStyles.mainScreen,
              {padding: 10, paddingHorizontal: 15}
            ]}
          renderItem={({ item }): any => <ServiceTeam item={item} />}
        />
      )}
    </View>
  );
}
