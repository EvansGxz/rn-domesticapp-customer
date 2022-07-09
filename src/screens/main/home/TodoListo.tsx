import React, { useState } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";
import OutlinedInput from "../../../components/ui/OutlinedInput";
import Button from "../../../components/ui/Button";
import SearchDirectionMap from "../../../components/maps/SearchDirectionMap";
import Checkbox from 'expo-checkbox';
import { httpClient } from "../../../controllers/http-client";
import { useAuth } from "../../../hooks/use-auth";
import { useNavigation } from "@react-navigation/native";
import useFetch from "use-http";
import { getCalendarContext } from ".";
import axios from "axios";

export default function TodoListo(props:any) {
    const [state] = useAuth();
    const { params } = props.route.params;
    console.log(params.category.price_col_complete)
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="TODO LISTO" />
            
        </View>
    );
}

const styles = StyleSheet.create({
   
});