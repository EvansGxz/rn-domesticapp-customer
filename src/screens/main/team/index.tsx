import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import MeetTheTeam from './MeetTheTeam';
import MeetTheTeamDetail from './Detail';

const Stack: any = createStackNavigator();

export default function TeamNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MeetTheTeam" component={MeetTheTeam} />
            <Stack.Screen name="MeetTheTeamDetail" component={MeetTheTeamDetail} />
        </Stack.Navigator>
    );
}