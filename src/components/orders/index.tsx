import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { VStack } from '../ui/vstack';
import { Card } from './card';

const Orders: React.FC = () => {
   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
   const viewOrderDetails = (order: Order): void => {
      setSelectedOrder(order);
   };

   return (
      <ScrollView
         className="flex-1 px-6 mb-28"
         showsVerticalScrollIndicator={false}
      >
         <VStack className="flex-1 mt-8" space="lg">
            {orders.map((order, index) => (
               <Card
                  key={`${order.id}-${index}`}
                  order={order}
                  onViewDetails={viewOrderDetails}
               />
            ))}
         </VStack>
      </ScrollView>
   );
};

export default Orders;

const orders: Order[] = [
   {
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
   },
   { id: '11251', status: 'Pickup Failed' },
   { id: '11252', status: 'Pickup Rescheduled' },
   { id: '11251', status: 'Delivery Failed' },
   { id: '11253', status: 'Delivered' },
   { id: '11250', status: 'Delivery Pending' },
   { id: '11252', status: 'Delivery Rescheduled' },
];
