import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import HorizontalLine from "../components/HorizontalLine";
import { BarChart } from "react-native-gifted-charts";
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
      listdata: [],
      bardata: [],
      balancedata: [],
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
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
                      {this.state.balancedata}
                      {` `}
                      {all_constants.homeview.currency}
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
          <HorizontalLine width="75%" line_color="tomato" />
          <View style={styles_home_view.container_delivery}>
            <View style={styles_home_view.delivery_title}>
              <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 20 }}>
                  {all_constants.homeview.title_delivery}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              {this.state.isFetching ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    aspectRatio: 2.15,
                  }}
                >
                  <ActivityIndicator size="large" color="tomato" />
                </View>
              ) : (
                <FlatList
                  horizontal={true}
                  data={this.state.listdata}
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
              )}
            </View>
          </View>
          <HorizontalLine width="75%" line_color="tomato" />
          <View style={styles_home_view.container_dashboard}>
            <View>
              <Text style={styles_home_view.dasboard_title}>
                {all_constants.homeview.title_stats}
              </Text>
              <View style={styles_home_view.container_barchart}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles_home_view.barchart_title}>
                    {all_constants.homeview.title_barchart}
                  </Text>
                </View>

                <View style={styles_home_view.barchart}>
                  <BarChart
                    data={this.state.bardata}
                    barWidth={16}
                    initialSpacing={10}
                    barBorderRadius={4}
                    yAxisThickness={0}
                    xAxisType={"dashed"}
                    xAxisColor={"lightgray"}
                    yAxisTextStyle={{ color: "lightgray" }}
                    stepValue={0}
                    maxValue={10}
                    minValue={0}
                    noOfSections={7}
                    xAxisLabelTextStyle={{
                      color: "lightgray",
                      textAlign: "center",
                    }}
                    showScrollIndicator
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
