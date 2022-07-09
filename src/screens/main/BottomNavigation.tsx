import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./home";
import HomeIcon from '../../resources/img/menu/home.svg';
import ContractIcon from '../../resources/img/menu/contract.svg';
import CalendarIcon from '../../resources/img/menu/calendar.svg';
import SupportIcon from '../../resources/img/menu/support.svg';
import Group from '../../resources/img/menu/group.svg';
import Contract from "./profile";
import Support from "./support";
import CalendarModule from "./calendar";
import MeetTheTeam from "./team";
import { COLORS } from "../../../config";



const Tab: any = createBottomTabNavigator();

export default function BottomNavigation() {

    return (
        <SafeAreaView style={style.mainContainer}>
            <Tab.Navigator 
            screenOptions={({route}: any) => ({
                headerShown: false,
                tabBarItemStyle:{
                    borderRadius:200, 
                    width:2,
                    backgroundColor:route.name === 'Calendar' ? COLORS.primary : 'white',
                    borderWidth:4,
                    borderColor:route.name === 'Calendar' ? '#e2f8fd' : 'white',
                    
                },             
                tabBarStyle:{height:67},
                tabBarIconStyle:{opacity:route.name === 'Calendar' ? 1 : 0.9}
                
            })}
            
            >
                <Tab.Screen 
                    name="Home" 
                    options={createTabOptions(HomeIcon)} 
                    component={Home} 
                />
                <Tab.Screen 
                    name="Team"
                    options={createTabOptions(Group)} 
                    component={MeetTheTeam} 
                />
                <Tab.Screen 
                    name="Calendar" 
                    options={createTabOptions(CalendarIcon)}
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
                    component={Contract}
                />
            </Tab.Navigator>
        </SafeAreaView>
    );
}

const createTabOptions = (Component: any) => {
    const item = Component()
    
    
    
    return { 
        tabBarShowLabel: false,
        tabBarIcon: ({ focused } : any) => (
            <Component 
            
            style={{ 
                opacity: focused ? 1 : 0.5 ,
                
            }} 
            
            />
        ),
        
    }
}

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
