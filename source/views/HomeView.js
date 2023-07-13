import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import HorizontalLine from "../components/HorizontalLine";
import { BarChart } from "react-native-gifted-charts";

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
        <View
          style={{
            flex: 1,
            margin: "3%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              aspectRatio: 2,
              margin: "3%",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "center",
                shadowOpacity: 0.2,
                borderRadius: 10,
                elevation: 3,
                shadowOffset: { width: 1, height: 1 },
                shadowColor: "#333",
                shadowOpacity: 0.3,
                shadowRadius: 2,
                backgroundColor: "whitesmoke",
                aspectRatio: 2.5,
              }}
            >
              <View
                style={{ flex: 1, flexDirection: "row", alignItems: "stretch" }}
              >
                <View
                  style={{
                    padding: "5%",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FontAwesome5 name="coins" size={50} color="gold" />
                </View>
                <View
                  style={{ flex: 2, alignItems: "flex-start", padding: "5%" }}
                >
                  <View style={{ flex: 1, justifyContent: "flex-end" }}>
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
          <View
            style={{
              flex: 2,
              margin: "3%",
              aspectRatio: 1.5,
            }}
          >
            <View
              style={{
                flex: 0.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ margin: 15 }}>
                <Text style={{ fontSize: 20 }}>Activité Récente</Text>
              </View>
            </View>

            <ScrollView style={{ flex: 1 }} horizontal={true}>
              <View
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderColor: "red",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                  aspectRatio: 2 / 1,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    padding: "3%",
                  }}
                >
                  <Image
                    style={{ flex: 1, borderRadius: 15 }}
                    source={{
                      uri: "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: "3%",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                      N °de commande
                    </Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ color: "grey" }}>
                      Temps de livraison : 15 min
                    </Text>
                    <Text style={{ color: "grey" }}>gain : 5,00€</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderColor: "red",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                  aspectRatio: 2 / 1,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    padding: "3%",
                  }}
                >
                  <Image
                    style={{ flex: 1, borderRadius: 15 }}
                    source={{
                      uri: "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: "3%",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                      N °de commande
                    </Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ color: "grey" }}>
                      Temps de livraison : 15 min
                    </Text>
                    <Text style={{ color: "grey" }}>gain : 5,00€</Text>
                  </View>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  borderRightWidth: 1,
                  borderColor: "red",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  flexDirection: "row",
                  aspectRatio: 2 / 1,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    padding: "3%",
                  }}
                >
                  <Image
                    style={{ flex: 1, borderRadius: 15 }}
                    source={{
                      uri: "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    padding: "3%",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                      N °de commande
                    </Text>
                  </View>
                  <View style={{ flex: 2 }}>
                    <Text style={{ color: "grey" }}>
                      Temps de livraison : 15 min
                    </Text>
                    <Text style={{ color: "grey" }}>gain : 5,00€</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
          <HorizontalLine width="75%" line_color="tomato" />
          <View
            style={{
              flex: 3,
              margin: "3%",
            }}
          >
            <View>
              <Text style={{ fontSize: 20, textAlign: "center" }}>
                Statistique
              </Text>
              <View
                style={{
                  aspectRatio: 1.25,
                  margin: "3%",
                  alignItems: "center",
                  borderRadius: 20,
                  backgroundColor: "#232B5D",
                  flex: 1,
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                  >
                    Hebdomadaire
                  </Text>
                </View>

                <View
                  style={{
                    padding: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
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
