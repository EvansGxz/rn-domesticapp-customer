import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

// SCREENs
import Profile from '../../shared/Profile';
import Dashboard from './Dashboard';
import Coupons from './Coupons';
import ServiceHistory from './ServiceHistory';
import Directions from './Directions';
import Notifications from '../shared/Notifications';
import NewsLetter from './NewsLetter';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
import AuthorizationAndData from './AuthorizationAndData';
import SupportChat from '../support/SupportChat';

export type ProfileStackParamList = {
    Dashboard: undefined;
    Profile: undefined;
    Coupons: undefined;
    ServiceHistory: undefined;
    Directions: undefined;
    Notifications: undefined;
    SupportChat: undefined;
    NewsLetter: undefined;
    TermsAndConditions: undefined;
    PrivacyPolicy: undefined;
    AuthorizationAndData: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

export default function HomeNavigator() {
    return (
        <Stack.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Coupons" component={Coupons} />
            <Stack.Screen name="ServiceHistory" component={ServiceHistory} />
            <Stack.Screen name="Directions" component={Directions} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="SupportChat" component={SupportChat} />
            <Stack.Screen name="NewsLetter" component={NewsLetter} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="AuthorizationAndData" component={AuthorizationAndData} />
        </Stack.Navigator>
    );
}