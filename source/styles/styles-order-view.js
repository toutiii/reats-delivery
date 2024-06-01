import { StyleSheet } from "react-native";

let styles_order_view = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_image: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        height: 150,
        width: 150,
        borderRadius: 100,
    },
    horizontalline: {
        flex: 1,
        justifyContent: "center",
        borderBottomWidth: 1,
        alignSelf: "center",
        width: "75%",
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        margin: "2%",
    },
    element_center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    element_container: {
        flex: 2,
        borderWidth: 1,
        aspectRatio: 4 / 3,
        alignSelf: "center",
    },
});

export default styles_order_view;
