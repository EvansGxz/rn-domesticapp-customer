import React, { FunctionComponent } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import SelectService from "./SelectService";
import ServiceCalendar from "./ServiceCalendar";
import ServiceRecurrentSelection from "./ServiceRecurrentSelection";
import ServiceDetails from "./ServiceDetails";
import TodoListo from "./TodoListo";
import EmployeeProfile from "../profile/EmployeeProfile";
import SelectEmployee from "./SelectEmployee";

type RootStackParamList = {
  HomeScreen: FunctionComponent;
  SelectService: FunctionComponent;
  SelectEmployee: FunctionComponent;
  ServiceCalendar: FunctionComponent;
  EmployeeProfile: FunctionComponent;
  ServiceRecurrentSelection: FunctionComponent;
  ServiceDetails: FunctionComponent;
  TodoListo: FunctionComponent;
};

import { CalendarProvider } from "../../../contexts/calendarContext";

const Stack: any = createNativeStackNavigator<RootStackParamList>();

export default function HomeNavigator() {
  return (
    <CalendarProvider>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="SelectService" component={SelectService} />
        <Stack.Screen name="SelectEmployee" component={SelectEmployee} />
        <Stack.Screen name="ServiceCalendar" component={ServiceCalendar} />
        <Stack.Screen name="EmployeeProfile" component={EmployeeProfile} />
        <Stack.Screen
          name="ServiceRecurrentSelection"
          component={ServiceRecurrentSelection}
        />
        <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
        <Stack.Screen name="TodoListo" component={TodoListo} />
      </Stack.Navigator>
    </CalendarProvider>
  );
}
