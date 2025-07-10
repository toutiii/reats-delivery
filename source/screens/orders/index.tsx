import { Card } from "@/components/orders/card";
import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { StackNavigation } from "@/types/navigation";
import { Order } from "@/types/orders";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Alert, RefreshControl, SafeAreaView, ScrollView } from "react-native";

const allOrders: Order[] = [
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
  {
    id: "11250",
    status: "Delivered",
    customer: {
      name: "Alice Dubois",
      address: "123 Rue de la République, Paris 75001",
      email: "alice.dubois@example.com",
    },
    notes: "Livraison à l'entrée du bâtiment",
  },
];

const OrdersScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState<Order[]>(allOrders);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [_searchQuery, _setSearchQuery] = useState<string>("");

  // Filtres disponibles
  const filters = [
    { id: "all", label: "Tous" },
    { id: "pending", label: "En attente" },
    { id: "delivered", label: "Livrés" },
    { id: "failed", label: "Échoués" },
  ];

  // Fonction pour filtrer les commandes
  const filterOrders = useCallback((filterId: string) => {
    setActiveFilter(filterId);

    if (filterId === "all") {
      setOrders(allOrders);
      return;
    }

    let filtered: Order[] = [];

    switch (filterId) {
      case "pending":
        filtered = allOrders.filter((order: Order) => {
          return order.status.includes("Pending") || order.status.includes("Rescheduled");
        });
        break;
      case "delivered":
        filtered = allOrders.filter((order: Order) => {
          return order.status === "Delivered";
        });
        break;
      case "failed":
        filtered = allOrders.filter((order: Order) => {
          return order.status.includes("Failed");
        });
        break;
      default:
        filtered = allOrders;
    }

    setOrders(filtered);
  }, []);

  // Fonction pour rafraîchir les données
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simuler une requête API
    setTimeout(() => {
      // Réappliquer le filtre actif
      filterOrders(activeFilter);
      setRefreshing(false);
    }, 1500);
  }, [activeFilter, filterOrders]);

  // Fonction pour voir les détails d'une commande
  const viewOrderDetails = (order: Order) => {
    // @ts-ignore - Ignorer l'erreur de typage pour la navigation avec paramètres
    navigation.navigate("OrderDetailsScreen", { orderId: order.id });
  };

  // Fonction pour trier les commandes (à implémenter)
  const sortOrders = () => {
    Alert.alert("Trier les commandes", "Choisissez un critère de tri", [
      { text: "Plus récent", onPress: () => console.log("Tri par date récente") },
      { text: "Plus ancien", onPress: () => console.log("Tri par date ancienne") },
      { text: "Annuler", style: "cancel" },
    ]);
  };

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF6347" colors={["#FF6347"]} />}>
          <VStack className="flex-1 px-4 py-2" space="md">
            {/* En-tête avec titre et boutons d'action */}
            <HStack className="justify-between items-center py-2">
              <Heading size="xl" className="text-gray-800">
                Commandes
              </Heading>
              <HStack space="sm">
                <Pressable onPress={sortOrders} className="bg-gray-100 rounded-full p-2">
                  <Feather name="filter" size={20} color="#4B5563" />
                </Pressable>
              </HStack>
            </HStack>

            {/* Filtres horizontaux */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="py-2">
              <HStack space="sm" className="px-1">
                {filters.map((filter) => (
                  <Pressable key={filter.id} onPress={() => filterOrders(filter.id)} className={`px-4 py-2 rounded-full ${activeFilter === filter.id
? "bg-primary-500"
: "bg-gray-100"}`}>
                    <Text className={`font-medium ${activeFilter === filter.id
? "text-white"
: "text-gray-700"}`}>{filter.label}</Text>
                  </Pressable>
                ))}
              </HStack>
            </ScrollView>

            {/* Statistiques des commandes */}
            <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-4 mb-2">
              <HStack className="justify-between">
                <VStack>
                  <Text className="text-gray-500 text-sm">Aujourd'hui</Text>
                  <Text className="text-gray-800 font-bold text-xl">{orders.filter((o) => o.status.includes("Pending")).length}</Text>
                  <Text className="text-gray-600">En attente</Text>
                </VStack>
                <Divider orientation="vertical" className="mx-2 bg-gray-100" />
                <VStack>
                  <Text className="text-gray-500 text-sm">Cette semaine</Text>
                  <Text className="text-gray-800 font-bold text-xl">{orders.filter((o) => o.status === "Delivered").length}</Text>
                  <Text className="text-gray-600">Livrées</Text>
                </VStack>
                <Divider orientation="vertical" className="mx-2 bg-gray-100" />
                <VStack>
                  <Text className="text-gray-500 text-sm">Total</Text>
                  <Text className="text-gray-800 font-bold text-xl">{orders.length}</Text>
                  <Text className="text-gray-600">Commandes</Text>
                </VStack>
              </HStack>
            </Box>

            {/* Liste des commandes */}
            <VStack space="md" className="pb-4">
              <HStack className="justify-between items-center">
                <Text className="text-gray-800 font-semibold">Liste des commandes</Text>
                <Text className="text-gray-500 text-sm">{orders.length} commandes</Text>
              </HStack>

              {orders.length > 0
? (
                orders.map((order, index) => <Card key={`${order.id}-${index}`} order={order} onViewDetails={viewOrderDetails} />)
              )
: (
                <Box className="bg-gray-50 p-6 rounded-lg items-center justify-center">
                  <Feather name="inbox" size={40} color="#9CA3AF" />
                  <Text className="text-gray-500 mt-2 text-center">Aucune commande trouvée</Text>
                  <Button onPress={() => filterOrders("all")} variant="outline" className="mt-3">
                    <Text className="text-primary-500">Voir toutes les commandes</Text>
                  </Button>
                </Box>
              )}
            </VStack>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default OrdersScreen;
