import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HelpCenter from './HelpCenter';
import SupportChat from './SupportChat';
import FaqsMenuScreen from './FaqsMenuScreen';
import FaqsDetail from './FaqsDetail';
import Notifications from '../shared/Notifications';
import Reports from './Reports';
import SeePolicy from './SeePolicy';
import SeeJobSecurity from './SeeJobSecurity';

export type SupportStackParamList = {
  HelpCenter: undefined;
  SupportChat: undefined;
  FaqsMenuScreen: undefined;
  FaqsDetail: {id: number};
  Notifications: undefined;
  Reports: undefined;
  SeePolicyMain: undefined;
  SeeJobSecurity: undefined;
};

const Stack = createStackNavigator<SupportStackParamList>();

export default function SupportNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="SupportChat" component={SupportChat} />
      <Stack.Screen name="FaqsMenuScreen" component={FaqsMenuScreen} />
      <Stack.Screen name="FaqsDetail" component={FaqsDetail} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Reports" component={Reports} />
      <Stack.Screen name="SeePolicyMain" component={SeePolicy} />
      <Stack.Screen name="SeeJobSecurity" component={SeeJobSecurity} />
    </Stack.Navigator>
  );
}
