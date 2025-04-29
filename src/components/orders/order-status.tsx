import React from 'react';
import { View } from 'react-native';
import { Text } from '../ui/text';

interface OrderStatusProps {
   status: OrderStatus;
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
   // Configuration précise des couleurs selon le statut exact
   const statusConfig: Record<OrderStatus, { bg: string; text: string }> = {
      'Pickup Pending': { bg: 'bg-red-50', text: 'text-red-500' },
      'Pickup Failed': { bg: 'bg-red-50', text: 'text-red-500' },
      'Pickup Rescheduled': { bg: 'bg-blue-50', text: 'text-blue-500' },
      'Delivery Failed': { bg: 'bg-red-50', text: 'text-red-500' },
      Delivered: { bg: 'bg-green-50', text: 'text-green-500' },
      'Delivery Pending': { bg: 'bg-red-50', text: 'text-red-500' },
      'Delivery Rescheduled': { bg: 'bg-blue-50', text: 'text-blue-500' },
   };

   const config = statusConfig[status];

   return (
      <View className={`rounded-full px-3 py-1 ${config.bg}`}>
         <Text className={`text-xs font-medium ${config.text}`}>{status}</Text>
      </View>
   );
};
