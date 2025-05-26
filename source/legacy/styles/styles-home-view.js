import { StyleSheet } from "react-native";

let styles_home_view = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
    },
    container_amount: {
        flex: 1,
        alignItems: "center",
    },
    card: {
        alignItems: "center",
    },
    container_card_icon: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container_card: {
        flex: 1,
        flexDirection: "row",
        alignItems: "stretch",
    },
    container_card_text: {
        flex: 2,
        padding: "5%",
    },
    container_delivery: {
        flex: 4,
        marginTop: "3%",
    },
    delivery_title: {
        justifyContent: "center",
        alignItems: "center",
    },
    container_order: {
        flex: 1,
        margin: "5%",
    },
    container_order_image: {
        flex: 1,
        aspectRatio: 6 / 2,
        padding: "3%",
    },
    container_order_text: {
        flex: 1,
        justifyContent: "center",
        flexDirection: "row",
    },
    order_title: {
        fontSize: 17,
        fontWeight: "bold",
    },
    order_text_color: {
        color: "grey",
    },
});

export default styles_home_view;
