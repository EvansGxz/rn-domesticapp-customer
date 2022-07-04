import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./home";
import HomeIcon from "../../resources/img/menu/home.svg";
import ContractIcon from "../../resources/img/menu/contract.svg";
import CalendarIcon from "../../resources/img/menu/calendar.svg";
import SupportIcon from "../../resources/img/menu/support.svg";
import ConfigIcon from "../../resources/img/menu/config.svg";
import UserProfile from "./profile";
import Support from "./support";
import CalendarModule from "./calendar";
import MeetTheTeam from "./shared/MeetTheTeam";
import { COLORS } from "../../../config";

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  return (
    <SafeAreaView style={style.mainContainer}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          options={createTabOptions(HomeIcon)}
          component={Home}
        />
        <Tab.Screen
          name="Team"
          options={createTabOptions(ConfigIcon)}
          component={MeetTheTeam}
        />
        <Tab.Screen
          name="Calendar"
          /* options={createTabOptions(CalendarIcon)} */
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }: any) => (
              <View style={[style.tabCalendar, style.shadow]}>
                <CalendarIcon style={{ opacity: focused ? 1 : 0.5 }} />
              </View>
            ),
          }}
          component={CalendarModule}
        />
        <Tab.Screen
          name="Support"
          options={createTabOptions(SupportIcon)}
          component={Support}
        />
        <Tab.Screen
          name="Contract"
          options={createTabOptions(ContractIcon)}
          component={UserProfile}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const createTabOptions = (Component: any) => {
  return {
    tabBarShowLabel: false,
    tabBarIcon: ({ focused }: any) => (
      <Component style={{ opacity: focused ? 1 : 0.5 }} />
    ),
  };
};

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  tabCalendar: {
    backgroundColor: "#ffff",
    /* borderWidth: 1,
    borderColor: COLORS.blue, */
    width: 55,
    height: 55,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    top: -5,
  },
  shadow: {
    shadowColor: "#7f5df4",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
