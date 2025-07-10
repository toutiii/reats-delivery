import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import AccountScreen from "@/screens/account";
import OrdersScreen from "@/screens/orders";
import Feather from "@expo/vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen from "../screens/home";

type TabParamList = {
  Home: undefined;
  Orders: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const MainNavigator = () => {
  const activeColor = "#FF5A5F";
  const inactiveColor = "#9CA3AF";
  const bgColor = "#FFFFFF";

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
          borderTopWidth: 1,
          height: 90,
          borderTopColor: "#F3F4F6",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Montserrat_500Medium",
          paddingBottom: 5,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <Feather name="home" size={20} color={color} />;
          } else if (route.name === "Orders") {
            return <Feather name="clipboard" size={20} color={color} />;
          } else if (route.name === "Profile") {
            return (
              <Avatar size="xs">
                <AvatarFallbackText>Jane Doe</AvatarFallbackText>
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
                <AvatarBadge />
              </Avatar>
            );
          }

          return <Feather name="home" size={20} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "Accueil" }} />
      <Tab.Screen name="Orders" component={OrdersScreen} options={{ tabBarLabel: "Commandes" }} />
      <Tab.Screen name="Profile" component={AccountScreen} options={{ tabBarLabel: "Mon compte" }} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
