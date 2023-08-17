import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import OrderFlatList from "../flatlist/OrderFlatList";
import OrderView from "../views/OrderView";
const Stack = createStackNavigator();

export default function OrderFlatlistStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="FlatlistStackNavigatorHome">
      <Stack.Screen
        name="FlatlistStackNavigatorHome"
        component={OrderFlatList}
        options={{
          headerShown: false,
          headerMode: "none",
        }}
      />
      <Stack.Screen
        name="FlatlistStackNavigatorOrderView"
        component={OrderView}
        options={{
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}
