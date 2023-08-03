import React from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  TouchableHighlight,
} from "react-native";

import { getOrders } from "../helpers/order_helpers";
import Order from "../components/Order";

export default function OrderFlatList(props) {
  const [orderData, getOrderData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(true);
  React.useEffect(() => {
    if (isFetching) {
      async function getData() {
        const data = await getOrders();
        getOrderData(data.data);
      }
      getData();
    }

    return () => {
      setIsFetching(false);
      console.log(orderData);
    };
  }, [orderData]);

  const getDishQuantity = (dishes) => {
    return dishes.reduce(
      (prevValue, currentValue) =>
        prevValue + parseInt(currentValue.dish_quantity),
      0
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {isFetching ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="tomato" />
        </View>
      ) : (
        <FlatList
          data={orderData}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                props.navigation.navigate("FlatlistStackNavigatorOrderView", {
                  item: item,
                });
              }}
              underlayColor="#ffd700"
            >
              <Order
                id={item.id}
                order_number={item.order_number}
                delivery_amount={item.delivery_amount}
                order_date={item.order_date}
                order_photo={item.order_photo}
                order_price={item.order_price}
                order_dish_quantity={getDishQuantity(item.dishes)}
              />
            </TouchableHighlight>
          )}
        />
      )}
    </View>
  );
}
