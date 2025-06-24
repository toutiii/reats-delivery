import { VStack } from "@/components/ui/vstack";
import { Order } from "@/types/orders";
import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Card } from "./card";

const Orders = () => {
  const [_, setSelectedOrder] = useState<Order | null>(null);
  const viewOrderDetails = (order: Order): void => {
    setSelectedOrder(order);
  };

  return (
    <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
      <VStack className="flex-1 mt-8" space="lg">
        {orders.map((order, index) => (
          <Card key={`${order.id}-${index}`} order={order} onViewDetails={viewOrderDetails} />
        ))}
      </VStack>
    </ScrollView>
  );
};

export default Orders;

const orders: Order[] = [
  {
    id: "11250",
    status: "Pickup Pending",
    type: "Dinner",
    time: "07:30 PM",
    customer: {
      name: "Aman Sharma",
      address: "201/D, Ananta Apts, Near Jai Bhawan, Andheri 400069",
      email: "aman.sharma@example.com",
    },
    pickup: {
      date: "Tomorrow",
      time: "5:30 PM, Thu, 25/08/2023",
      timeLeft: "1:04",
    },
    notes: "Livraison à l'entrée du bâtiment",
  },
  {
    id: "11251",
    status: "Pickup Failed",
    customer: {
      name: "Bruno Legrand",
      address: "15 Avenue des Champs, Paris 75008",
      email: "bruno.legrand@example.com",
    },
    notes: "Prévenir 10 minutes avant la livraison",
  },
  {
    id: "11252",
    status: "Pickup Rescheduled",
    customer: {
      name: "Céline Martin",
      address: "27 Rue de la Paix, Lyon 69001",
      email: "celine.martin@example.com",
    },
    notes: "Sonnette en panne, appeler à l'arrivée",
  },
  {
    id: "11253",
    status: "Delivery Failed",
    customer: {
      name: "David Petit",
      address: "8 Boulevard des Alpes, Grenoble 38000",
      email: "david.petit@example.com",
    },
    notes: "Code d'immeuble: 3845",
  },
  {
    id: "11254",
    status: "Delivered",
    customer: {
      name: "Élodie Bernard",
      address: "44 Avenue Victor Hugo, Marseille 13000",
      email: "elodie.bernard@example.com",
    },
    notes: "Laisser le colis chez le concierge si absent",
  },
  {
    id: "11255",
    status: "Delivery Pending",
    customer: {
      name: "François Dubois",
      address: "12 Rue des Lilas, Bordeaux 33000",
      email: "francois.dubois@example.com",
    },
    notes: "Porte au fond du couloir à droite",
  },
  {
    id: "11256",
    status: "Delivery Rescheduled",
    customer: {
      name: "Gabrielle Roux",
      address: "3 Place de la République, Nice 06000",
      email: "gabrielle.roux@example.com",
    },
    notes: "Attention au chien",
  },
];
