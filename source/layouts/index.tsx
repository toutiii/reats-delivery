import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
// @ts-ignore - Ignorer l'erreur de typage pour react-native-vector-icons
import Ionicons from "react-native-vector-icons/Ionicons";

// Import your screens here
import AccountScreen from "@/screens/account";
import HomeScreen from "../screens/home";

// Define the tab navigator param list
type TabParamList = {
  Home: undefined;
  Orders: undefined;
  Delivery: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const MainNavigator = () => {
  // Define theme colors
  const activeColor = "#FF5A5F"; // tomato color
  const inactiveColor = "#9CA3AF"; // gray color
  const bgColor = "#FFFFFF"; // white background color

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: bgColor,
          paddingVertical: 10,
          height: 60,
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Montserrat_500Medium",
          paddingBottom: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = focused
? "home"
: "home-outline";
          } else if (route.name === "Orders") {
            iconName = focused
? "list"
: "list-outline";
          } else if (route.name === "Delivery") {
            iconName = focused
? "bicycle"
: "bicycle-outline";
          } else if (route.name === "Profile") {
            iconName = focused
? "person"
: "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "Accueil" }} />

      <Tab.Screen name="Profile" component={AccountScreen} options={{ tabBarLabel: "Profil" }} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
