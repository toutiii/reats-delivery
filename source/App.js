import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainDrawerNavigator } from "./legacy/drawer/MainDrawerNavigator";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

import SignupForm from "./legacy/forms/forms/SignupForm";
import LoginForm from "./legacy/forms/forms/LoginForm";
import OTPView from "./legacy/views/OTPView";

const Stack = createStackNavigator();

export default class App extends Component {
    render() {
        return (
            <AutocompleteDropdownContextProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <NavigationContainer>
                        <Stack.Navigator initialRouteName="LoginForm">
                            <Stack.Screen
                                name="MainDrawerNavigator"
                                component={MainDrawerNavigator}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="OTPView"
                                component={OTPView}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="LoginForm"
                                component={LoginForm}
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen
                                name="SignupForm"
                                component={SignupForm}
                                options={{ headerShown: true, headerTitle: "" }}
                            />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaView>
            </AutocompleteDropdownContextProvider>
        );
    }
}
