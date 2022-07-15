import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from './CalendarScreen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Stack: any = createNativeStackNavigator();

export default function CalendarNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        </Stack.Navigator>
    );
}