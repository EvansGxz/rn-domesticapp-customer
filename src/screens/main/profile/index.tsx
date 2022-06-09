import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from './UserProfile';
import Coupons from './Coupons';
import ServiceHistory from './ServiceHistory';
import Directions from './Directions';
import Notifications from './Notifications';
import NewsLetter from './NewsLetter';
import TermsAndConditions from './TermsAndConditions';
import PrivacyPolicy from './PrivacyPolicy';
import AuthorizationAndData from './AuthorizationAndData';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="Coupons" component={Coupons} />
            <Stack.Screen name="ServiceHistory" component={ServiceHistory} />
            <Stack.Screen name="Directions" component={Directions} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="NewsLetter" component={NewsLetter} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="AuthorizationAndData" component={AuthorizationAndData} />
        </Stack.Navigator>
    );
}