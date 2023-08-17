import React from "react";
import { Image, Text, View } from "react-native";
import all_constants from "../constants";
import CustomButton from "../components/CustomButton";
import styles_order_view from "../styles/styles-order-view";
export default function OrderView({ ...props }) {
  return (
    <View style={styles_order_view.container}>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}>
          <View style={styles_order_view.container_image}>
            <Image
              source={{ uri: props.route.params.item.order_owner_profil }}
              style={styles_order_view.image}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 50 }}>
              {props.route.params.item.order_owner}
            </Text>
          </View>
        </View>
        <View style={{ margin: "3%" }}>
          <Text style={{ textAlign: "center" }}>
            {props.route.params.item.order_address}
          </Text>
        </View>
        <View
          style={{ borderBottomWidth: 1, alignSelf: "center", width: "75%" }}
        >
          <Text style={styles_order_view.text}>
            {all_constants.orderview.time} {props.route.params.item.order_time}{" "}
            {all_constants.time}
          </Text>
        </View>
        <View>
          <Text style={styles_order_view.text}>
            {props.route.params.item.order_number}
          </Text>
        </View>
      </View>
      <View style={styles_order_view.element_container}>
        <View style={styles_order_view.horizontalline}>
          <Text style={styles_order_view.text}>
            {props.route.params.dishe} {all_constants.order.infos.dishe}
          </Text>
        </View>
        <View style={styles_order_view.horizontalline}>
          <Text style={styles_order_view.text}>
            {all_constants.orderview.command}
            {props.route.params.item.order_date}
          </Text>
        </View>
        <View style={styles_order_view.element_center}>
          <Text style={styles_order_view.text}>
            {all_constants.win}
            {props.route.params.item.order_price}
          </Text>
        </View>
      </View>
      <View style={styles_order_view.element_center}>
        <CustomButton
          label={all_constants.orderview.take}
          height={50}
          border_width={3}
          font_size={17}
          backgroundColor={"green"}
          label_color={"white"}
          button_width={all_constants.screen.width - 40}
          onPress={() => {
            console.log("PRESSED");
          }}
        />
      </View>
    </View>
  );
}
