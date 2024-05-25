import React from "react";
import { Text, View, Image } from "react-native";
import styles_order from "../styles/styles-order";
import all_constants from "../constants";

export default function Order({ ...props }) {
    return (
        <View style={styles_order.container}>
            <View style={styles_order.container_element_image}>
                <View style={styles_order.image}>
                    <Image
                        style={{ flex: 1, borderRadius: 10 }}
                        source={{
                            uri: props.order_photo,
                        }}
                    />
                </View>
                <Text style={{ fontSize: 15, color: "green", margin: "3%" }}>
                    {all_constants.win} {props.order_price}
                    {all_constants.currency_symbol}
                </Text>
            </View>
            <View style={styles_order.container_element_card}>
                <View style={styles_order.card}>
                    <View style={styles_order.card_text_container}>
                        <Text style={{ fontSize: 15 }}>{props.order_number}</Text>
                    </View>
                    <View style={styles_order.card_text_container}>
                        <Text style={{ fontSize: 30 }}>
                            {" "}
                            {props.order_dish_quantity} {all_constants.order.infos.dishe}
                        </Text>
                    </View>
                </View>
                <Text style={{ fontSize: 15, margin: "3%" }}>{props.order_date}</Text>
            </View>
        </View>
    );
}
