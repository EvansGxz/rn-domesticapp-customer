/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import useFetch from "use-http";
import { useAuth } from "../../hooks/use-auth";
import Loader from "../Loader";
import ServiceTypeButton from "./ServiceTypeButton";

interface Carousel {
  carouselOne: [] | any;
  carouselTwo: [] | any;
}

export default function ServiceTypesCatalog() {
  const {state} = useAuth()
  const { loading, error, data = [] } = useFetch('/categories', {}, []);
  const [dataRecort, setDataRecort] = useState<Carousel>({
    carouselOne: null,
    carouselTwo: null,
  });

  useEffect(() => {
    if (data.length > 0) {
      const dataCountry = data.filter(
        (country: any) => state.user.country.trimEnd() === country.region);
      const medio = Math.round(dataCountry.length / 2);
      const fin = dataCountry.length - 1;

      setDataRecort({
        carouselOne: dataCountry.slice(0, medio),
        carouselTwo: dataCountry.slice(medio, fin)
      });
    }
  }, [data]);

  return (
    <View style={styles.servicesCatalogContainer}>
      {loading ? (<Loader />) : error ? (<Text>{error.message}</Text>) : (
        <>
          <FlatList
            data={dataRecort.carouselOne}
            keyExtractor={(item: any) => item?.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.objetivo}>
                <ServiceTypeButton
                  key={`category-${item.id}`}
                  category={item}
                />
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
          />
          <FlatList
            data={dataRecort.carouselTwo}
            keyExtractor={(item: any) => item?.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.objetivo}>
                <ServiceTypeButton
                  key={`category-${item.id}`}
                  category={item}
                />
              </View>
            )}
            pagingEnabled
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
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
  objetivo: {
    justifyContent: 'space-between',
  },
});
