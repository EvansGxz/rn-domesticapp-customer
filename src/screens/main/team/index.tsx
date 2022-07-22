import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

// SCREENs
import MeetTheTeam from './MeetTheTeam';
import MeetTheTeamDetail from './Detail';

export type TeamStackParamList = {
    MeetTheTeam: undefined;
    MeetTheTeamDetail: {employeeId?: string | number, id?: string | number};
}

const Stack = createStackNavigator<TeamStackParamList>();

export default function TeamNavigator() {
    return (
        <Stack.Navigator initialRouteName="MeetTheTeam" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MeetTheTeam" component={MeetTheTeam} />
            <Stack.Screen name="MeetTheTeamDetail" component={MeetTheTeamDetail} />
        </Stack.Navigator>
    );
}