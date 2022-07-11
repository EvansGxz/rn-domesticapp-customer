/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import useFetch from "use-http";
import { AuthContext } from "../../contexts/auth-context";
import Loader from "../Loader";
import ServiceTypeButton from "./ServiceTypeButton";

interface Carousel {
  carouselOne: [] | any;
  carouselTwo: [] | any;
}

export default function ServiceTypesCatalog() {
  const state = useContext(AuthContext);
  const { loading, error, data = [] } = useFetch('/categories', {}, []);
  const [dataRecort, setDataRecort] = useState<Carousel>({
    carouselOne: null,
    carouselTwo: null,
  });

  useEffect(() => {
    if (data.length > 0) {
      const dataCountry = data.filter(
        (country: any) => state.getState().user.country === country.region);
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


// const d = {
//     "body": "Auxiliares y cargadores para bodegas y establecimientos empresariales ",
//     "category_name": "Aux. Bodega Empresas",
//     "id": 39,
//     "image": Object {
//       "name": "image",
//       "record": Object {
//         "body": "Auxiliares y cargadores para bodegas y establecimientos empresariales ",
//         "category_name": "Aux. Bodega Empresas",
//         "created_at": "2022-07-01T21:51:39.501Z",
//         "id": 39,
//         "price_col_complete": "94500.0",
//         "price_col_half": "68500.0",
//         "price_spain": "16.5",
//         "region": "España",
//         "sector_id": 2,
//         "updated_at": "2022-07-01T21:51:39.516Z",
//       },
//     },
//     "image_url": "https://domesticapp.herokuapp.com//rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBQQT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--980bb8c2d3110d31f7e819b73ce9c4aec18f0771/Aux.%20Bodega%20Empresas.png",
//     "price_col_complete": "94500.0",
//     "price_col_half": "68500.0",
//     "price_spain": "16.5",
//     "region": "España",
//     "sector": "Empresarial",
// }

