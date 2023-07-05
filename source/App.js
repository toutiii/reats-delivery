import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainDrawerNavigator } from "./drawer/MainDrawerNavigator";
const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="MainTabNavigator">
          <Stack.Screen
              name="MainDrawerNavigator"
              component={MainDrawerNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        </SafeAreaView>
    );
  }
}
