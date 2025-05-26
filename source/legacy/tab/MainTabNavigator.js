import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeView from "../views/HomeView";
import SimpleView from "../views/SimpleView";
import all_constants from "../../constants";
import SettingsPersonalInformationForm from "../forms/forms/SettingsPersonalInformationForm";
import StatsView from "../views/StatsView";
import DeliveryHistoryStack from "../stack/DeliveryHistoryStack";

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
                tabBarButton: [
                    "DeliveryHistory",
                    "SimpleView",
                    "SettingsPersonalInformationForm",
                    "StatsView",
                ].includes(route.name)
                    ? () => {
                        return null;
                    }
                    : undefined,
            })}
        >
            <Tab.Screen
                name={all_constants.tab.main_tab_navigator.home}
                component={HomeView}
            />
            <Tab.Screen
                name={all_constants.tab.main_tab_navigator.delivery}
                component={SimpleView}
            />
            <Tab.Screen name="SimpleView" component={SimpleView} />
            <Tab.Screen
                name="SettingsPersonalInformationForm"
                component={SettingsPersonalInformationForm}
            />
            <Tab.Screen name="StatsView" component={StatsView} />
            <Tab.Screen name="DeliveryHistory" component={DeliveryHistoryStack} />
        </Tab.Navigator>
    );
}
