import React from "react";
import { Text, View, Image } from "react-native";
import styles_home_view from "../styles/styles-home-view";
import all_constants from "../constants";

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
                        {all_constants.delivery.infos.time} {props.delivery_time}{" "}
                        {all_constants.time}
                    </Text>
                    <Text style={styles_home_view.order_text_color}>
                        {all_constants.win} {props.delivery_amount}
                        {all_constants.currency_symbol}
                    </Text>
                </View>
            </View>
        </View>
    );
}
