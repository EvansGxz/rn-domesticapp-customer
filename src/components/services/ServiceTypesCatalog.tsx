/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, Text, Animated } from 'react-native';
import useFetch from 'use-http';
import { COLORS } from '../../../config';
import { useAuth } from '../../hooks/use-auth';
import ServiceTypeButton from './ServiceTypeButton';
import Loader from '../Loader';

interface CarouselProps {
  Otros: [] | any;
  Hogares: [] | any;
  Hotelero: [] | any;
  Comercial: [] | any;
  Empresarial: [] | any;
}
export default function ServiceTypesCatalog() {
  const {state} = useAuth();
  const { loading, error, data = [] } = useFetch('/categories', {}, []);
  const [dataRecort, setDataRecort] = useState<CarouselProps | any>({
    Otros: null,
    Hogares: null,
    Hotelero: null,
    Comercial: null,
    Empresarial: null,
  });

  const translateLeftX = useRef(new Animated.Value(-100)).current;
  const translateRightX = useRef(new Animated.Value(100)).current;

  const sector = ['Hogares', 'Empresarial', 'Comercial', 'Hotelero', 'Otros'];
  const carousel1: any[] = [];
  const carousel2: any[] = [];
  const carousel3: any[] = [];
  const carousel4: any[] = [];
  const carousel5: any[] = [];

  useFocusEffect(useCallback(() => {
    Animated.parallel([
      Animated.timing(translateLeftX, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true
      }),
      Animated.timing(translateRightX, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true
      }),
    ]).start();
  }, []));

  useEffect(() => {
    if (data.length > 0) {
      const dataCountry = data.filter(
        (country: any) => state.user.country.trimEnd() === country.region);
        dataCountry.filter((category: any) => {
          switch (category.sector) {
            case sector[0]:
              carousel1.push(category);
              break;
            case sector[1]:
              carousel2.push(category);
              break;
            case sector[2]:
              carousel3.push(category);
              break;
            case sector[3]:
              carousel4.push(category);
              break;
            case sector[4]:
              carousel5.push(category);
              break;
          }
      });
      setDataRecort({
        Hogares: carousel1,
        Empresarial: carousel2,
        Comercial: carousel3,
        Hotelero: carousel4,
        Otros: carousel5
      });
    }
  }, [data]);

  return (
    <View style={styles.servicesCatalogContainer}>
      {loading ? (<Loader />) : error ? (<Text>{error.message}</Text>) : (
        <>
          {Object.keys(dataRecort).map((sector, index) => (
            <View key={sector}>
              {dataRecort[sector]?.length > 0 && (
                <Text style={styles.heading}>{sector}</Text>
              )}
              <Animated.FlatList
                bounces={false}
                horizontal={true}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                data={dataRecort[sector]}
                updateCellsBatchingPeriod={5}
                keyExtractor={(item: any) => item?.id}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <ServiceTypeButton category={item} />}
                style={{transform: [{translateX: index === 0 ? translateLeftX : translateRightX}]}}
            />
            </View>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  servicesCatalogContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heading: {
    fontSize: 28,
    margin: 10,
    color: COLORS.primary,
    alignSelf: 'flex-start',
  },
  objetivo: {
    justifyContent: 'space-between',
  },
});
