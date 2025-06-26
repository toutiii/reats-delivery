import { OrderDetails } from "@/components/order-details";
import { ThemedView } from "@/components/themed-view";
import { Order } from "@/types/orders";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native";

const OrderDetailsScreen = () => {
  const navigation = useNavigation();
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <OrderDetails onBack={() => navigation.goBack()} order={order} />
      </SafeAreaView>
    </ThemedView>
  );
};

export default OrderDetailsScreen;

const order: Order = {
  id: "11250",
  status: "Pickup Pending",
  type: "Dinner",
  time: "07:30 PM",
  customer: {
    name: "Aman Sharma",
    address: "201/D, Ananta Apts, Near Jai Bhawan, Andheri 400069",
    email: "mdaveglad@gmail.com",
  },
  pickup: {
    date: "Tomorrow",
    time: "5:30 PM, Thu, 25/08/2023",
    timeLeft: "1:04",
  },
  notes: "Mon texte pour la note",
};
