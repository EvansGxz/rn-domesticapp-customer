import React from "react";
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../../config";

export default function Verification() {
    return (
        <SafeAreaView style={style.mainContainer}>
            <View>
                
            </View>
            <View style={style.content}>

            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primary
    },
    content: {
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    }
});