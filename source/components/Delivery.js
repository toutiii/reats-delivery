import React from "react";
import { Text, View, Image } from "react-native";
import styles_home_view from "../styles/styles-home-view";

export default function Delivery({ ...props }) {
  return (
    <View style={styles_home_view.container_order}>
      <View style={styles_home_view.container_order_image}>
        <Image
          style={{ flex: 1, borderRadius: 15 }}
          source={{
            uri: props.photo,
          }}
        />
      </View>
      <View style={styles_home_view.container_order_text}>
        <View style={{ flex: 1 }}>
          <Text style={styles_home_view.order_title}>
            {props.delivery_number}
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles_home_view.order_text_color}>
            Temps de livraison : {props.delivery_time} min
          </Text>
          <Text style={styles_home_view.order_text_color}>
            gain : {props.delivery_amount}€
          </Text>
        </View>
      </View>
    </View>
  );
}
