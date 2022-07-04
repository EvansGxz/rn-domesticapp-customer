import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HelpCenter from './HelpCenter';
import SupportChat from './SupportChat';
import FaqsMenuScreen from './FaqsMenuScreen';
import FaqsDetail from './FaqsDetail';
import Notifications from '../shared/Notifications';
import Reports from './Reports';

const Stack: any = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HelpCenter" component={HelpCenter} />
            <Stack.Screen name="SupportChat" component={SupportChat} />
            <Stack.Screen name="FaqsMenuScreen" component={FaqsMenuScreen} />
            <Stack.Screen name="FaqsDetail" component={FaqsDetail} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Reports" component={Reports} />
        </Stack.Navigator>
    );
}