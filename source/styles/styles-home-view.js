import { StyleSheet } from "react-native";

let styles_home_view;

export default styles_home_view = StyleSheet.create({
  container: {
    flex: 1,
    margin: "3%",
    flexDirection: "column",
    alignItems: "center",
  },
  container_amount: {
    flex: 1,
    aspectRatio: 2,
    margin: "3%",
    alignItems: "center",
  },
  card: {
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
  },
  container_card_icon: {
    padding: "5%",
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
    alignItems: "flex-start",
    padding: "5%",
  },
  container_delivery: {
    flex: 2,
    margin: "3%",
    aspectRatio: 1.5,
  },
  delivery_title: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  container_order: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    aspectRatio: 2 / 1,
  },
  container_order_image: {
    flex: 1,
    padding: "3%",
  },
  container_order_text: {
    flex: 1,
    justifyContent: "center",
    padding: "3%",
  },
  order_title: {
    fontSize: 17,
    fontWeight: "bold",
  },
  order_text_color: {
    color: "grey",
  },
  container_dashboard: {
    flex: 3,
    margin: "3%",
  },
  dasboard_title: {
    fontSize: 20,
    textAlign: "center",
  },
  container_barchart: {
    aspectRatio: 1.25,
    margin: "3%",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#232B5D",
    flex: 1,
  },
  barchart_title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  barchart: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
