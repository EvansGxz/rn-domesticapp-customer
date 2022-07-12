/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Location from 'expo-location';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useCalendar} from '../../contexts/calendarContext';
import {apiMapBox} from '../../controllers/http-client';
import OutlinedInput from '../ui/OutlinedInput';
import ListLocationMap from './ListLocationMap';

const SearchDirectionMap = (props: any) => {
  const [location, setLocation] = useState<object | any>();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');
  const [ubicaciones, setUbicaciones] = useState<object | null>();
  const map = useRef<any>(null);
  const {data, setData} = props;

  const updateLocation = (data: any) => {
    setLocation({
      longitude: data?.longitude,
      latitude: data?.latitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
  };

  const searchUbication = async () => {
    if (searchText.length > 0) {
      try {
        const data = await apiMapBox.get(`/${searchText}.json`);
        console.log(data.data)
        setUbicaciones(data?.data?.features);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const {setaddress} = useCalendar();
  const selectLocation = async (d: any) => {
    console.log(d.place_name);
    setaddress && setaddress(d.place_name);
    setData({
      ...data,
      address: d.place_name,
    });
    setLocation({
      latitude: d?.geometry?.coordinates[1],
      longitude: d?.geometry?.coordinates[0],
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    });
    map.current.fitToCoordinates(
      [
        {
          latitude: d?.geometry?.coordinates[1],
          longitude: d?.geometry?.coordinates[0],
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        },
      ],
      {
        edgePadding: {top: 80, right: 80, bottom: 80, left: 80},
        animated: true,
      },
    );
    setSearchText(d?.place_name);
    setUbicaciones(null);
  };

  useEffect(() => {
    if (!location) {
      (async () => {
        const {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation({
          longitude: location?.coords?.longitude,
          latitude: location?.coords?.latitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      })();
    }
  }, [ubicaciones]);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* <Button title="Buscar" onPress={searchUbication} /> */}
        <OutlinedInput
          style={styles.input}
          value={searchText}
          placeholder="Ingresa dirección a laboral"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChangeText={(e: any) => {
            setSearchText(e);
            setTimeout(() => {
              searchUbication();
            }, 500);
          }}
        />
        {ubicaciones && (
          <ListLocationMap
            ubicaciones={ubicaciones}
            selectLocation={selectLocation}
          />
        )}
      </View>

      {location?.latitude && (
        <MapView
          style={styles.map}
          initialRegion={{
            longitude: location.longitude,
            latitude: location.latitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation
          loadingEnabled
          onPress={e => updateLocation(e.nativeEvent.coordinate)}
          ref={map}>
          <Marker key={1} coordinate={location} />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 20,
    marginBottom: 20,
  },
  inputContainer: {
    zIndex: 1,
    top: 10,
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    padding: 10,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  map: {
    overflow: 'hidden',
    width: '100%',
    height: 500,
  },
});

export default SearchDirectionMap;
