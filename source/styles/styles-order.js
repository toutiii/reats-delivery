import { StyleSheet } from "react-native";

let styles_order = StyleSheet.create({
    container: {
        flex: 1,
        margin: "6%",
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 20,
    },
    container_element_image: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "3%",
    },
    container_element_card: {
        flex: 1,
        flexDirection: "column",
        padding: "3%",
    },
    card_text_container: {
        flex: 1,
    },
    image: {
        flex: 1,
        height: 100,
        width: "75%",
        margin: "3%",
    },
    card: {
        flex: 1,
        margin: "3%",
        alignItems: "center",
        shadowOpacity: 0.2,
        borderRadius: 10,
        elevation: 3,
        shadowOffset: { width: 1, height: 1 },
        shadowColor: "#333",
        shadowRadius: 2,
        backgroundColor: "whitesmoke",
        height: 100,
    },
});

export default styles_order;
