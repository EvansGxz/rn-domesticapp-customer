import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// SCREENs
import Home from "./Home";
import SelectService from "./SelectService";
import ServiceCalendar from "./ServiceCalendar";
import ServiceRecurrentSelection from "./ServiceRecurrentSelection";
import ServiceDetails from "./ServiceDetails";
import TodoListo from "./TodoListo";
import EmployeeProfile from "../profile/EmployeeProfile";
import SelectEmployee from "./SelectEmployee";

export type HomeStackParamList = {
  HomeScreen: undefined;
  SelectService: {id: number};
  SelectEmployee: undefined;
  ServiceCalendar: {id: number, workingDayType: string};
  EmployeeProfile: undefined;
  ServiceRecurrentSelection: {id: number, workingHour: Date | null, working: string};
  ServiceDetails: {id: number, quote: string, recurrencyDate: object};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TodoListo: {params: any};
};

import { CalendarProvider } from "../../../contexts/calendarContext";

const Stack = createNativeStackNavigator<HomeStackParamList>();

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
