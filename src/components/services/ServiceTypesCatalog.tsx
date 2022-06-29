import React from "react";
import { View, StyleSheet } from "react-native";
import useFetch from "use-http";
import ServiceTypeButton from "./ServiceTypeButton";

export default function ServiceTypesCatalog() {
  const { loading, error, data = [] } = useFetch("/categories", {}, []);
  console.log(data);
  console.log(loading);
  console.log(error);
  return (
    <View style={styles.servicesCatalogContainer}>
      {data.map((category: any) => (
        <ServiceTypeButton
          key={`category-${category.id}`}
          id={category.id}
          image={category.image_url}
          name={category.category_name}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  servicesCatalogContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
  },
});
