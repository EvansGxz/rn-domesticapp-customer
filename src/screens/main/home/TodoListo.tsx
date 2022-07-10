import React from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import BackTitledHeader from "../../../components/headers/BackTitledHeader";
import { SharedStyles } from "../../../styles/shared-styles";

import type {HomeStackParamList} from '.';
type Props = StackScreenProps<HomeStackParamList, 'TodoListo'>;

export default function TodoListo({route}: Props) {
    const { params } = route.params;
    console.log(params.category.price_col_complete)
    return (
        <View style={SharedStyles.mainScreen}>
            <BackTitledHeader title="TODO LISTO" />
            
        </View>
    );
}
