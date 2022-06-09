import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from './UserProfile';
import Coupons from './Coupons';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="Coupons" component={Coupons} />
        </Stack.Navigator>
    );
}