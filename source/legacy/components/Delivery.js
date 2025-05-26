import React from "react";
import { Text, View, Image } from "react-native";
import styles_home_view from "../styles/styles-home-view";
import all_constants from "../../constants";

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

            <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles_home_view.order_title}>
                    {all_constants.delivery.infos.number} {props.delivery_number}
                </Text>
            </View>
        </View>
    );
}
