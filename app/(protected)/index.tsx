import Orders from '@/src/components/orders';
import { ThemedView } from '@/src/components/themed-view';
import React from 'react';

export default function HomeScreen() {
   return (
      <ThemedView className="flex-1">
         <Orders />
      </ThemedView>
   );
}
