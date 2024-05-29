import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import HorizontalLine from "../components/HorizontalLine";
import { getHomeViewData } from "../helpers/delivery_helpers";
import styles_home_view from "../styles/styles-home-view";
import Delivery from "../components/Delivery";
import all_constants from "../constants";

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

    componentDidMount() {
        this.fetchData();
        this.intervalID = setInterval(this.fetchData.bind(this), 1000000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    async fetchData() {
        this.setState({ isFetching: true });
        let newData = await getHomeViewData();
        this.setState({
            listdata: newData.data.delivery_data,
            bardata: newData.data.bardata,
            balancedata: newData.data.balance,
            isFetching: false,
        });
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

                    {this.state.isFetching
                        ? (
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "center",
                                }}
                            >
                                <ActivityIndicator size="large" color="tomato" />
                            </View>
                        )
                        : (
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    data={this.state.listdata}
                                    ItemSeparatorComponent={
                                        <View
                                            style={{
                                                justifyContent: "center",
                                                alignItems: "center",
                                                backgroundColor: "#C8C8C8",
                                                height: 2.5,
                                                marginLeft: "10%",
                                                marginRight: "10%",
                                            }}
                                        />
                                    }
                                    renderItem={({ item }) => (
                                        <Delivery
                                            id={item.id}
                                            delivery_number={item.delivery_number}
                                            delivery_amount={item.delivery_amount}
                                            delivery_time={item.delivery_time}
                                            photo={item.photo}
                                        />
                                    )}
                                />
                            </View>
                        )}
                </View>
            </View>
        );
    }
}
