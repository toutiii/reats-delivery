import { Feather } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import { OrderStatus } from '../orders/order-status';
import { TimeLeft } from '../orders/time-left';
import { Text } from '../ui/text';

interface OrderDetailScreenProps {
   order: Order;
   onBack: () => void;
}

export const OrderDetails: React.FC<OrderDetailScreenProps> = ({
   order,
   onBack,
}) => {
   if (!order.customer || !order.pickup) {
      return (
         <SafeAreaView className="flex-1 bg-gray-50">
            <View className="bg-white px-4 py-4 flex-row items-center border-b border-gray-100">
               <TouchableOpacity onPress={onBack} className="mr-3">
                  <Feather name="arrow-left" size={22} color="#374151" />
               </TouchableOpacity>
               <Text className="text-lg font-medium text-gray-800">
                  Order Details
               </Text>
            </View>
            <View className="p-5">
               <Text>Informations de commande incomplètes</Text>
            </View>
         </SafeAreaView>
      );
   }

   return (
      <SafeAreaView className="flex-1 bg-gray-50">
         {/* Header avec bouton retour */}
         <View className="bg-white px-4 py-4 flex-row items-center border-b border-gray-100">
            <TouchableOpacity onPress={onBack} className="mr-3">
               <Feather name="arrow-left" size={22} color="#374151" />
            </TouchableOpacity>
            <Text className="text-lg font-medium text-gray-800">
               Order Details
            </Text>
         </View>

         <ScrollView className="flex-1">
            {/* En-tête de commande */}
            <View className="bg-white px-5 py-4 border-b border-gray-100">
               <Text className="text-gray-800 font-medium mb-1">
                  Order No. #{order.id}
               </Text>
               <View className="flex-row justify-between items-center">
                  <Text className="text-gray-800 font-medium">
                     {order.type} | {order.time}
                  </Text>
                  <OrderStatus status={order.status} />
               </View>
            </View>

            <View className="px-5 py-4">
               {/* Informations client */}
               <View className="flex-row items-start mb-5">
                  <View className="w-6 h-6 mr-3 flex-row justify-center items-center">
                     <Feather name="user" size={20} color="#f87171" />
                  </View>
                  <View>
                     <Text className="text-gray-800 font-medium">
                        {order.customer.name}
                     </Text>
                     <TouchableOpacity className="mt-2">
                        <Feather name="phone" size={20} color="#f87171" />
                     </TouchableOpacity>
                  </View>
               </View>

               {/* Adresse de livraison */}
               <View className="flex-row items-start mb-5">
                  <View className="w-6 h-6 mr-3 flex-row justify-center items-center">
                     <Feather name="map-pin" size={20} color="#f87171" />
                  </View>
                  <View>
                     <Text className="text-gray-800 font-medium mb-1">
                        Delivery
                     </Text>
                     <Text className="text-gray-600 leading-tight">
                        {order.customer.address}
                     </Text>
                  </View>
               </View>

               {/* Informations de ramassage */}
               <View className="bg-red-50 rounded-lg p-4 mb-5">
                  <View className="flex-row justify-between items-center mb-2">
                     <Text className="text-red-500 font-medium">
                        Delivery Pickup By
                     </Text>
                     <TimeLeft hours={order.pickup.timeLeft} />
                  </View>
                  <Text className="text-gray-700 leading-tight">
                     {order.pickup.date}
                     {'\n'}
                     {order.pickup.time}
                  </Text>
               </View>

               {/* Mise à jour du statut */}
               <View className="mb-6">
                  <Text className="text-gray-600 mb-1.5">Update Status</Text>
                  <TouchableOpacity className="bg-white border border-gray-200 rounded-lg px-3 py-3 flex-row justify-between items-center">
                     <Text className="text-gray-400">Select an option</Text>
                     <Feather name="chevron-down" size={18} color="#9CA3AF" />
                  </TouchableOpacity>
               </View>

               {/* Bouton de confirmation */}
               <TouchableOpacity
                  activeOpacity={0.8}
                  className="bg-red-500 rounded-lg py-4 items-center mb-6"
               >
                  <Text className="text-white font-medium">Confirm Pickup</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>

         {/* Indicateur de bas */}
         <View className="items-center py-3">
            <View className="w-12 h-1 bg-gray-300 rounded-full"></View>
         </View>
      </SafeAreaView>
   );
};
