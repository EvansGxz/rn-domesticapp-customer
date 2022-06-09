import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from './CalendarScreen';

const Stack = createNativeStackNavigator();

export default function CalendarNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        </Stack.Navigator>
    );
}