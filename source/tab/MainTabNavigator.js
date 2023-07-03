import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeView from "../views/HomeView";
import SimpleView from "../views/SimpleView";
import all_constants from "../constants";
const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={all_constants.tab.main_tab_navigator.home}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "tomato",
        tabBarinactiveTintColor: "gray",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === all_constants.tab.main_tab_navigator.home) {
            iconName = focused
            ? "home"
            : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (
            route.name === all_constants.tab.main_tab_navigator.pending
          ) {
            iconName = focused
            ? "hourglass"
            : "hourglass-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (
            route.name === all_constants.tab.main_tab_navigator.delivery
          ) {
            iconName = focused
            ? "delivery-dining"
            : "delivery-dining";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name={all_constants.tab.main_tab_navigator.home} component={HomeView} />
      <Tab.Screen name={all_constants.tab.main_tab_navigator.pending} component={SimpleView}/>
      <Tab.Screen name={all_constants.tab.main_tab_navigator.delivery} component={SimpleView}/>
    </Tab.Navigator>
  );
}
