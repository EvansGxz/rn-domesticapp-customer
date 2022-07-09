import React, { createContext, useContext, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import MeetTheTeam from "../team";
import SelectService from "./SelectService";
import ServiceCalendar from "./ServiceCalendar";
import ServiceRecurrentSelection from "./ServiceRecurrentSelection";
import ServiceDetails from "./ServiceDetails";
import TodoListo from "./TodoListo";
import EmployeeProfile from "../profile/EmployeeProfile";
import SelectEmployee from "./SelectEmployee";

const Stack: any = createNativeStackNavigator();

type TCalendarContext = {
  category_id: string;
  setcategory_id: (category_id: string) => void;
  workday: string;
  setworkday: (workday: string) => void;
  start_date: string;
  setstart_date: (start_date: string) => void;
  finish_date: string;
  setfinish_date: (finish_date: string) => void;
  service_time: string;
  setservice_time: (service_time: string) => void;
  address: string;
  setaddress: (address: string) => void;
  customer_id: string;
  setcustomer_id: (customer_id: string) => void;
};

const CalendarContext = createContext<TCalendarContext>({} as any);

const CalendarProvider = (props: any) => {
  const [category_id, setcategory_id] = useState("");
  const [workday, setworkday] = useState("");
  const [start_date, setstart_date] = useState("");
  const [finish_date, setfinish_date] = useState("");
  const [service_time, setservice_time] = useState("");
  const [address, setaddress] = useState("");
  const [customer_id, setcustomer_id] = useState("");
  return (
    <CalendarContext.Provider
      value={{
        category_id,
        setcategory_id,
        workday,
        setworkday,
        start_date,
        setstart_date,
        service_time,
        setservice_time,
        address,
        setaddress,
        customer_id,
        setcustomer_id,
        finish_date,
        setfinish_date,
      }}
    >
      {props.children}
    </CalendarContext.Provider>
  );
};

export const getCalendarContext = () => {
  return useContext(CalendarContext);
};

export default function HomeNavigator() {
  return (
    <CalendarProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
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
        {/* <Stack.Screen name="MeetTheTeam" component={MeetTheTeam} /> */}
      </Stack.Navigator>
    </CalendarProvider>
  );
}
