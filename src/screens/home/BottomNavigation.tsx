import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./Home";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
    return (
        <SafeAreaView style={style.mainContainer}>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={Home} />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});