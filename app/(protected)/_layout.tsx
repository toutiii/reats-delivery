import { HapticTab } from '@/src/components/HapticTab';
import { IconSymbol } from '@/src/components/ui/IconSymbol';
import TabBarBackground from '@/src/components/ui/TabBarBackground';
import { Colors } from '@/src/constants/Colors';
import { useColorScheme } from '@/src/hooks/useColorScheme';
import { Feather } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
   const colorScheme = useColorScheme();

   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: true,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            // Supprimer la position absolute pour empêcher la disparition
            tabBarStyle: {
               // Styles communs pour tous les écrans
            },
         }}
      >
         <Tabs.Screen
            name="index"
            options={{
               title: 'Mes commandes',
               tabBarIcon: ({ color }) => (
                  <IconSymbol size={28} name="house.fill" color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="explore"
            options={{
               title: 'Mon compte',
               tabBarIcon: ({ color }) => (
                  <IconSymbol size={28} name="paperplane.fill" color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="order-details/[id]"
            options={{
               title: 'Order Details',
               href: null,
               headerShown: true,
               // Assurer que la tabBar reste visible
               tabBarStyle: {
                  display: 'flex',
               },
               headerLeft: () => {
                  return (
                     <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2 mr-3"
                        accessibilityLabel="Retour"
                        accessibilityRole="button"
                     >
                        <Feather name="arrow-left" size={22} color="#374151" />
                     </TouchableOpacity>
                  );
               },
            }}
         />
         <Tabs.Screen
            name="order-details/delivery/[id]"
            options={{
               title: 'Delivery',
               href: null,
               headerShown: true,
               tabBarStyle: {
                  display: 'none',
               },
               headerLeft: () => {
                  return (
                     <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2 mr-3"
                        accessibilityLabel="Retour"
                        accessibilityRole="button"
                     >
                        <Feather name="arrow-left" size={22} color="#374151" />
                     </TouchableOpacity>
                  );
               },
            }}
         />
         <Tabs.Screen
            name="order-details/delivery/confirmation"
            options={{
               title: '',
               href: null,
               headerShown: false,
            }}
         />
      </Tabs>
   );
}
