import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from './Home';
import MeetTheTeam from '../shared/MeetTheTeam';
import SelectService from './SelectService';
import ServiceCalendar from './ServiceCalendar';
import ServiceRecurrentSelection from './ServiceRecurrentSelection';
import ServiceDetails from './ServiceDetails';

const Stack: any = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="SelectService" component={SelectService} />
            <Stack.Screen name="ServiceCalendar" component={ServiceCalendar} />
            <Stack.Screen name="ServiceRecurrentSelection" component={ServiceRecurrentSelection} />
            <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
            <Stack.Screen name="MeetTheTeam" component={MeetTheTeam} />
        </Stack.Navigator>
    );
}