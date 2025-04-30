import { OrderDetails } from '@/src/components/order-details';
import { ThemedView } from '@/src/components/themed-view';
import { router } from 'expo-router';
import React from 'react';

const OrderDetailsScreen = () => {
   return (
      <ThemedView className="flex-1">
         <OrderDetails onBack={() => router.back} order={order} />
      </ThemedView>
   );
};

export default OrderDetailsScreen;

const order: Order = {
   id: '11250',
   status: 'Pickup Pending',
   type: 'Dinner',
   time: '07:30 PM',
   customer: {
      name: 'Aman Sharma',
      address: '201/D, Ananta Apts, Near Jai Bhawan, Andheri 400069',
   },
   pickup: {
      date: 'Tomorrow',
      time: '5:30 PM, Thu, 25/08/2023',
      timeLeft: '1:04',
   },
};
