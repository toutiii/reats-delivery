import { Text } from "@/components/ui/text";
import { OrderStatus as OrderStatusType } from "@/types/orders";
import React from "react";
import { View } from "react-native";

interface OrderStatusProps {
  status: OrderStatusType;
}

export const OrderStatus = ({ status }: OrderStatusProps) => {
  // Configuration précise des couleurs selon le statut exact
  const statusConfig: Record<OrderStatusType, { bg: string; text: string }> = {
    "Pickup Pending": { bg: "bg-red-50", text: "text-red-500" },
    "Pickup Failed": { bg: "bg-red-50", text: "text-red-500" },
    "Pickup Rescheduled": { bg: "bg-blue-50", text: "text-blue-500" },
    "Delivery Failed": { bg: "bg-red-50", text: "text-red-500" },
    Delivered: { bg: "bg-green-50", text: "text-green-500" },
    "Delivery Pending": { bg: "bg-red-50", text: "text-red-500" },
    "Delivery Rescheduled": { bg: "bg-blue-50", text: "text-blue-500" },
  };

  const config = statusConfig[status];

  return (
    <View className={`rounded-full px-3 py-1 ${config.bg}`}>
      <Text className={`text-xs font-medium ${config.text}`}>{status}</Text>
    </View>
  );
};
