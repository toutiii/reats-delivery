import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import HorizontalLine from "../components/HorizontalLine";
import { BarChart } from "react-native-gifted-charts";
import styles_home_view from "../styles/styles-home-view";

export default class HomeView extends Component {
  render() {
    const barData = [
      {
        value: 2,
        frontColor: "#006DFF",
        gradientColor: "#009FFF",
        label: "Lun",
      },

      {
        value: 3,
        frontColor: "#006DFF",
        gradientColor: "#009FFF",
        label: "Mar",
      },

      {
        value: 4,
        frontColor: "#006DFF",
        gradientColor: "#009FFF",
        label: "Mer",
      },

      {
        value: 5,
        frontColor: "#006DFF",
        gradientColor: "#009FFF",
        label: "Jed",
      },
      {
        value: 6,
        frontColor: "#006DFF",
        gradientColor: "#009FFF",
        label: "Ven",
      },
      {
        value: 7,
        frontColor: "#006DFF",
        gradientColor: "#009FFF",
        label: "Sam",
      },
    ];
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
                    <Text style={{ fontSize: 28 }}>20,00 EUR</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20 }}>Solde</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <HorizontalLine width="75%" line_color="tomato" />
          <View style={styles_home_view.container_delivery}>
            <View style={styles_home_view.delivery_title}>
              <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 20 }}>Activité Récente</Text>
              </View>
            </View>
            <ScrollView style={{ flex: 1 }} horizontal={true}>
              <View style={styles_home_view.container_order}>
                <View style={styles_home_view.container_order_image}>
                  <Image
                    style={{ flex: 1, borderRadius: 15 }}
                    source={{
                      uri: "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    }}
                  />
                </View>
                <View style={styles_home_view.container_order_text}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles_home_view.order_title}>
                      N °de commande
                    </Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={styles_home_view.order_text_color}>
                      Temps de livraison : 15 min
                    </Text>
                    <Text style={styles_home_view.order_text_color}>
                      gain : 5,00€
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles_home_view.container_order}>
                <View style={styles_home_view.container_order_image}>
                  <Image
                    style={{ flex: 1, borderRadius: 15 }}
                    source={{
                      uri: "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    }}
                  />
                </View>
                <View style={styles_home_view.container_order_text}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles_home_view.order_title}>
                      N °de commande
                    </Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={styles_home_view.order_text_color}>
                      Temps de livraison : 15 min
                    </Text>
                    <Text style={styles_home_view.order_text_color}>
                      gain : 5,00€
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles_home_view.container_order}>
                <View style={styles_home_view.container_order_image}>
                  <Image
                    style={{ flex: 1, borderRadius: 15 }}
                    source={{
                      uri: "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    }}
                  />
                </View>
                <View style={styles_home_view.container_order_text}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles_home_view.order_title}>
                      N °de commande
                    </Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={styles_home_view.order_text_color}>
                      Temps de livraison : 15 min
                    </Text>
                    <Text style={styles_home_view.order_text_color}>
                      gain : 5,00€
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          <HorizontalLine width="75%" line_color="tomato" />
          <View style={styles_home_view.container_dashboard}>
            <View>
              <Text style={styles_home_view.dasboard_title}>Statistique</Text>
              <View style={styles_home_view.container_barchart}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles_home_view.barchart_title}>
                    Hebdomadaire
                  </Text>
                </View>

                <View style={styles_home_view.barchart}>
                  <BarChart
                    data={barData}
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
