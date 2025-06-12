import "react-native-reanimated";
import React, { Component } from "react";
import "./global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainDrawerNavigator } from "./legacy/drawer/MainDrawerNavigator";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

import SignupForm from "./legacy/forms/forms/SignupForm";
import LoginForm from "./legacy/forms/forms/LoginForm";
import OTPView from "./legacy/views/OTPView";
import StartPage from "./screens/onboarding";
import TermsAndConditionsScreen from "./screens/onboarding/terms-and-conditions";
import LoginScreen from "./screens/auth/login";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <GluestackUIProvider mode="light">
        <AutocompleteDropdownContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Onboarding"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Onboarding" component={StartPage} />
              <Stack.Screen
                name="TermsAndConditions"
                component={TermsAndConditionsScreen}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen
                name="MainDrawerNavigator"
                component={MainDrawerNavigator}
              />
              <Stack.Screen name="OTPView" component={OTPView} />
              <Stack.Screen name="LoginForm" component={LoginForm} />
              <Stack.Screen name="SignupForm" component={SignupForm} />
            </Stack.Navigator>
          </NavigationContainer>
        </AutocompleteDropdownContextProvider>
      </GluestackUIProvider>
    );
  }
}
