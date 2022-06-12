import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './Home';
import MeetTheTeam from '../shared/MeetTheTeam';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="MeetTheTeam" component={MeetTheTeam} />
        </Stack.Navigator>
    );
}