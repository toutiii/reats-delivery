import React, { Component } from "react";
import { Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import HorizontalLine from "../components/HorizontalLine";
import styles_home_view from "../styles/styles-home-view";
import all_constants from "../../constants";

export default class HomeView extends Component {
    intervalID;

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            listdata: [
            ],
            bardata: [
            ],
            balancedata: [
            ],
            isFetching: false,
        };
    }

    render() {
        return (
            <View style={styles_home_view.container}>
                <View style={styles_home_view.container_amount}>
                    <View style={styles_home_view.card}>
                        <View style={styles_home_view.container_card}>
                            <View style={styles_home_view.container_card_icon}>
                                <FontAwesome5 name="coins" size={50} color="gold" />
                            </View>
                            <View style={styles_home_view.container_card_text}>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 28 }}>
                                        {this.state.balancedata} {all_constants.homeview.currency}
                                    </Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontSize: 20 }}>
                                        {all_constants.homeview.balance}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ alignItems: "center" }}>
                    <HorizontalLine width="75%" line_color="tomato" />
                </View>

                <View style={styles_home_view.container_delivery}>
                    <View style={styles_home_view.delivery_title}>
                        <View>
                            <Text style={{ fontSize: 20 }}>
                                {all_constants.homeview.title_delivery}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
