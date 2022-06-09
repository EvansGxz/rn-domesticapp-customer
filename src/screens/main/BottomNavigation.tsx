import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./home";
import HomeIcon from '../../resources/img/menu/home.svg';
import ContractIcon from '../../resources/img/menu/contract.svg';
import CalendarIcon from '../../resources/img/menu/calendar.svg';
import SupportIcon from '../../resources/img/menu/support.svg';
import ConfigIcon from '../../resources/img/menu/config.svg';
import UserProfile from "./profile";

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
                    component={Home} 
                />
                <Tab.Screen 
                    name="Calendar" 
                    options={createTabOptions(CalendarIcon)} 
                    component={Home} 
                />
                <Tab.Screen 
                    name="Support"
                    options={createTabOptions(SupportIcon)} 
                    component={Home} 
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
        tabBarIcon: ({ focused } : any) => (
            <Component style={{ opacity: focused ? 1 : 0.5 }} />
        ),

    }
}

const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
    }
});