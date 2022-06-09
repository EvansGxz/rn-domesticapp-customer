import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HelpCenter from './HelpCenter';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HelpCenter" component={HelpCenter} />
        </Stack.Navigator>
    );
}