import React, { Component } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import all_constants from "../../constants";
import DeliveryHistoryFlatList from "../flatlist/DeliveryHistoryFlatList";
import OrderView from "../views/OrderView";

const Stack = createStackNavigator();

export default class DeliveryHistoryStack extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name={this.props.route.name + "Home"}
                    component={DeliveryHistoryFlatList}
                    options={{
                        headerShown: true,
                        title: all_constants.drawercontent.drawer_item.orders_history.title,
                    }}
                />
                <Stack.Screen
                    name="HistoryOrderDetailView"
                    component={OrderView}
                    options={{
                        headerShown: true,
                        title: "",
                    }}
                />
            </Stack.Navigator>
        );
    }
}
