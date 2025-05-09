import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
   Linking,
   Platform,
   Pressable,
   SafeAreaView,
   ScrollView,
   TouchableOpacity,
   View,
} from 'react-native';
import { OrderStatus } from '../orders/order-status';
import { TimeLeft } from '../orders/time-left';
import { ThemedView } from '../themed-view';
import { Button, ButtonText } from '../ui/button';
import { Text } from '../ui/text';

interface OrderDetailScreenProps {
   order: Order;
   onBack: () => void;
}

export const OrderDetails: React.FC<OrderDetailScreenProps> = ({
   order,
   onBack,
}) => {
   const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
   const [statusOpen, setStatusOpen] = useState(false);

   // Options de statut pour le menu déroulant
   const statusOptions = ['En cours', 'En route', 'Livré', 'Annulé'];

   // Vérification des données
   if (!order.customer || !order.pickup) {
      return (
         <View className="flex-1 justify-center items-center bg-white">
            <Feather name="alert-circle" size={48} color="#f87171" />
            <Text className="text-gray-800 font-medium text-lg mt-4">
               Informations de commande incomplètes
            </Text>
            <Button onPress={onBack} className="mt-6 px-6">
               <ButtonText>Retour</ButtonText>
            </Button>
         </View>
      );
   }

   const handleCall = () => {
      const phoneNumber = order.customer?.phone || '+33123456789';
      Linking.openURL(`tel:${phoneNumber}`);
   };

   const handleOpenMap = () => {
      const address = encodeURIComponent(order.customer.address);
      const url = Platform.select({
         ios: `maps:0,0?q=${address}`,
         android: `geo:0,0?q=${address}`,
      });
      if (url) Linking.openURL(url);
   };

   return (
      <ThemedView className="flex-1">
         <SafeAreaView className="flex-1">
            {/* En-tête fixe */}
            <View className="bg-white pt-3 pb-3 px-5 shadow-xs z-10">
               <View className="flex-row justify-between items-center">
                  <View>
                     <Text className="text-gray-400 text-xs">Commande N°</Text>
                     <Text className="text-gray-800 font-semibold">
                        #{order.id}
                     </Text>
                  </View>
                  <OrderStatus status={order.status} />
               </View>
            </View>

            <ScrollView
               className="flex-1"
               showsVerticalScrollIndicator={false}
               contentContainerClassName="pb-6"
            >
               <View className="bg-white mx-4 mt-4 rounded-xl shadow-sm overflow-hidden">
                  <View className="p-4 border-b border-gray-100">
                     <Text className="text-gray-400 text-xs uppercase mb-1">
                        Détails de la commande
                     </Text>
                     <View className="flex-row justify-between items-center">
                        <Text className="text-gray-800 font-medium">
                           {order.type}
                        </Text>
                        <Text className="text-gray-600">{order.time}</Text>
                     </View>
                  </View>

                  <View className="p-4 border-b border-gray-100">
                     <Text className="text-gray-400 text-xs uppercase mb-3">
                        Client
                     </Text>
                     <View className="flex-row mb-3">
                        <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center mr-3">
                           <Feather name="user" size={20} color="#f87171" />
                        </View>
                        <View className="flex-1 justify-center">
                           <Text className="text-gray-800 font-medium">
                              {order.customer.name}
                           </Text>
                           {order.customer.email && (
                              <Text className="text-gray-500 text-sm">
                                 {order.customer.email}
                              </Text>
                           )}
                        </View>
                        <TouchableOpacity
                           onPress={handleCall}
                           className="w-10 h-10 bg-green-50 rounded-full items-center justify-center"
                           accessibilityLabel="Appeler le client"
                           accessibilityRole="button"
                        >
                           <Feather name="phone" size={18} color="#10b981" />
                        </TouchableOpacity>
                     </View>
                  </View>

                  {/* Adresse de livraison */}
                  <Pressable
                     onPress={handleOpenMap}
                     className="p-4 border-b border-gray-100 active:bg-gray-50"
                     accessibilityLabel="Voir l'adresse sur la carte"
                     accessibilityRole="button"
                  >
                     <View className="flex-row justify-between items-center mb-2">
                        <Text className="text-gray-400 text-xs uppercase">
                           Adresse de livraison
                        </Text>
                        <View className="bg-blue-50 rounded-full p-1">
                           <Feather name="map" size={14} color="#3b82f6" />
                        </View>
                     </View>
                     <View className="flex-row items-center">
                        <View className="w-8 h-8 bg-blue-50 rounded-full items-center justify-center mr-3">
                           <Feather name="map-pin" size={16} color="#3b82f6" />
                        </View>
                        <Text className="text-gray-700 flex-1">
                           {order.customer.address}
                        </Text>
                     </View>
                  </Pressable>

                  <View className="p-4">
                     <Text className="text-gray-400 text-xs uppercase mb-2">
                        Retrait prévu
                     </Text>
                     <View className="bg-red-50 rounded-lg p-3">
                        <View className="flex-row justify-between items-center mb-2">
                           <View className="flex-row items-center">
                              <Feather name="clock" size={16} color="#f87171" />
                              <Text className="text-red-500 font-medium ml-2">
                                 Départ dans
                              </Text>
                           </View>
                           <TimeLeft hours={order.pickup.timeLeft} />
                        </View>
                        <Text className="text-gray-700">
                           {order.pickup.date} à {order.pickup.time}
                        </Text>
                     </View>
                  </View>
               </View>

               <View className="bg-white mx-4 mt-4 rounded-xl shadow-sm overflow-hidden">
                  <View className="p-4">
                     <Text className="text-gray-400 text-xs uppercase mb-3">
                        Mise à jour du statut
                     </Text>

                     {/* Bouton de confirmation */}
                     <Button
                        onPress={() => {
                           router.push('/order-details/delivery/1');
                        }}
                        size="lg"
                     >
                        <ButtonText>Confirmer la course</ButtonText>
                     </Button>
                  </View>
               </View>

               {/* Informations supplémentaires */}
               <View className="bg-white mx-4 mt-4 rounded-xl shadow-sm overflow-hidden">
                  <View className="p-4">
                     <Text className="text-gray-400 text-xs uppercase mb-3">
                        Notes
                     </Text>
                     <Text className="text-gray-700">
                        {order.notes || 'Aucune note pour cette commande.'}
                     </Text>
                  </View>
               </View>
            </ScrollView>
         </SafeAreaView>
      </ThemedView>
   );
};
