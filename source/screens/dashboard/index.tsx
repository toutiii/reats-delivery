import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { colorPrimary } from "@/constants/colors";
import { StackNavigation } from "@/types/navigation";
import { Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import { Alert, Dimensions, RefreshControl, SafeAreaView, ScrollView, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

// Type pour les commandes actives
type ActiveOrder = {
  id: string;
  restaurant: string;
  restaurantAddress: string;
  customer: string;
  address: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  price: number;
  tip?: number;
  time: string;
  distance: string;
  status: "pickup" | "delivering" | "completed";
};

// Type pour les statistiques du livreur
type DeliveryStats = {
  todayEarnings: number;
  weekEarnings: number;
  monthEarnings: number;
  totalDeliveries: number;
  completionRate: number;
  rating: number;
  performance: number;
  weeklyData: {
    labels: string[];
    data: number[];
  };
};

const DashboardScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const [refreshing, setRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [activeOrders, setActiveOrders] = useState<ActiveOrder[]>([
    {
      id: "ORD-7845",
      restaurant: "Burger Palace",
      restaurantAddress: "123 Avenue des Champs-Élysées",
      customer: "Marie Dupont",
      address: "456 Rue de la République",
      items: [
        { name: "Burger Deluxe", quantity: 1, price: 12.5 },
        { name: "Frites Maison", quantity: 1, price: 4.5 },
        { name: "Soda", quantity: 1, price: 3.5 },
      ],
      price: 20.5,
      tip: 4,
      time: "14:30",
      distance: "3.2 km",
      status: "pickup",
    },
    {
      id: "ORD-7846",
      restaurant: "Pizza Express",
      restaurantAddress: "78 Boulevard Saint-Michel",
      customer: "Jean Martin",
      address: "92 Rue de Rivoli",
      items: [
        { name: "Pizza Margherita", quantity: 1, price: 14 },
        { name: "Tiramisu", quantity: 2, price: 12 },
      ],
      price: 26,
      tip: 3,
      time: "15:15",
      distance: "2.8 km",
      status: "delivering",
    },
  ]);

  const [stats, setStats] = useState<DeliveryStats>({
    todayEarnings: 87.5,
    weekEarnings: 645.75,
    monthEarnings: 2450.25,
    totalDeliveries: 142,
    completionRate: 78,
    rating: 4.1,
    performance: 75,
    weeklyData: {
      labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
      data: [65, 85, 72, 95, 105, 120, 90],
    },
  });

  // Fonction pour rafraîchir les données
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simuler un chargement de données
    setTimeout(() => {
      // Mettre à jour les statistiques avec de nouvelles valeurs
      setStats({
        ...stats,
        todayEarnings: stats.todayEarnings + Math.random() * 10,
        totalDeliveries: stats.totalDeliveries + 1,
        weeklyData: {
          ...stats.weeklyData,
          data: stats.weeklyData.data.map((val) => val * (0.95 + Math.random() * 0.1)),
        },
      });
      setRefreshing(false);
    }, 1500);
  }, [stats]);

  // Gérer le changement de statut en ligne/hors ligne
  const toggleOnlineStatus = () => {
    Alert.alert(isOnline
? "Passer hors ligne"
: "Passer en ligne", isOnline
? "Voulez-vous vraiment vous déconnecter ? Vous ne recevrez plus de commandes."
: "Voulez-vous vous connecter et commencer à recevoir des commandes ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Confirmer",
        onPress: () => {
          setIsOnline(!isOnline);
        },
      },
    ]);
  };

  // Accepter une commande
  const acceptOrder = (orderId: string) => {
    Alert.alert("Accepter la commande", "Voulez-vous accepter cette commande ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Accepter",
        onPress: () => {
          const updatedOrders = activeOrders.map((order) => (order.id === orderId
? { ...order, status: "delivering" as const }
: order));
          setActiveOrders(updatedOrders);
          navigation.navigate("DeliveryMapScreen", {
            id: orderId,
          });
        },
      },
    ]);
  };

  // Compléter une commande
  const completeOrder = (orderId: string) => {
    Alert.alert("Terminer la commande", "Confirmez-vous avoir livré cette commande ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Confirmer",
        onPress: () => {
          // Trouver la commande à compléter
          const orderToComplete = activeOrders.find((order) => order.id === orderId);

          // Mettre à jour la liste des commandes actives
          const updatedOrders = activeOrders.filter((a) => a.id !== orderId);
          setActiveOrders(updatedOrders);

          // Mettre à jour les statistiques
          if (orderToComplete) {
            setStats({
              ...stats,
              todayEarnings: stats.todayEarnings + orderToComplete.price + (orderToComplete.tip || 0),
              totalDeliveries: stats.totalDeliveries + 1,
              completionRate: Math.min(100, stats.completionRate + 0.1),
            });
          }

          // Afficher une confirmation
          Alert.alert("Succès", "Commande marquée comme livrée avec succès!");
        },
      },
    ]);
  };

  // Couleurs pour le graphique
  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(${parseInt(colorPrimary.slice(1, 3), 16)}, ${parseInt(colorPrimary.slice(3, 5), 16)}, ${parseInt(colorPrimary.slice(5, 7), 16)}, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForDots: {
      r: "5",
      strokeWidth: "2",
      stroke: colorPrimary,
    },
  };

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 bg-gray-50" refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <VStack className="p-4 pb-20">
            {/* En-tête avec statut en ligne */}
            <HStack className="justify-between items-center mb-4">
              <VStack>
                <Text className="text-gray-500 font-medium">Bonjour,</Text>
                <Heading className="text-2xl font-bold">Thomas D.</Heading>
              </VStack>

              <Pressable className={`px-4 py-2 rounded-full flex-row items-center ${isOnline
? "bg-green-100"
: "bg-gray-200"}`} onPress={toggleOnlineStatus}>
                <View className={`h-3 w-3 rounded-full mr-2 ${isOnline
? "bg-green-500"
: "bg-gray-500"}`} />
                <Text className={isOnline
? "text-green-800 font-medium"
: "text-gray-800 font-medium"}>{isOnline
? "En ligne"
: "Hors ligne"}</Text>
              </Pressable>
            </HStack>

            {/* Résumé des gains */}
            <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-4">
              <LinearGradient colors={[colorPrimary, colorPrimary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ padding: 16 }}>
                <Text className="text-white font-medium mb-1">Gains du jour</Text>
                <HStack className="items-baseline">
                  <Heading className="text-white text-3xl">{stats.todayEarnings.toFixed(2)}€</Heading>
                  <Text className="text-white ml-2">+{(stats.todayEarnings * 0.15).toFixed(2)}€ aujourd'hui</Text>
                </HStack>
              </LinearGradient>

              <HStack className="p-4 justify-between">
                <VStack className="items-center">
                  <Text className="text-gray-500 text-sm">Cette semaine</Text>
                  <Text className="text-gray-800 font-bold">{stats.weekEarnings.toFixed(2)}€</Text>
                </VStack>

                <Divider orientation="vertical" />

                <VStack className="items-center">
                  <Text className="text-gray-500 text-sm">Ce mois</Text>
                  <Text className="text-gray-800 font-bold">{stats.monthEarnings.toFixed(2)}€</Text>
                </VStack>

                <Divider orientation="vertical" />

                <VStack className="items-center">
                  <Text className="text-gray-500 text-sm">Livraisons</Text>
                  <Text className="text-gray-800 font-bold">{stats.totalDeliveries}</Text>
                </VStack>
              </HStack>
            </Box>

            {/* Graphique des gains hebdomadaires */}
            <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-4">
              <VStack className="p-4">
                <Text className="text-gray-800 font-semibold mb-3">Gains hebdomadaires</Text>
                <LineChart
                  data={{
                    labels: stats.weeklyData.labels,
                    datasets: [
                      {
                        data: stats.weeklyData.data,
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width - 20}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                    borderRadius: 16,
                    marginVertical: 8,
                  }}
                />
              </VStack>
            </Box>

            {/* Statistiques de performance */}
            <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-4">
              <VStack className="p-4">
                <Text className="text-gray-800 font-semibold mb-3">Performance</Text>

                <HStack className="justify-between mb-4">
                  <VStack className="flex-1 mr-4">
                    <HStack className="justify-between mb-1">
                      <Text className="text-gray-600">Taux de complétion</Text>
                      <Text className="text-gray-800 font-medium">{stats.completionRate}%</Text>
                    </HStack>
                    <Progress value={stats.completionRate} max={100} className="h-2 rounded-full bg-gray-200">
                      <ProgressFilledTrack />
                    </Progress>
                  </VStack>
                </HStack>

                <HStack className="justify-between mb-4">
                  <VStack className="flex-1 mr-4">
                    <HStack className="justify-between mb-1">
                      <Text className="text-gray-600">Satisfaction client</Text>
                      <Text className="text-gray-800 font-medium">{stats.rating}/5</Text>
                    </HStack>
                    <Progress value={stats.rating} max={5} className="h-2 rounded-full bg-gray-200">
                      <ProgressFilledTrack />
                    </Progress>
                  </VStack>
                </HStack>

                <HStack className="justify-between">
                  <VStack className="flex-1 mr-4">
                    <HStack className="justify-between mb-1">
                      <Text className="text-gray-600">Performance globale</Text>
                      <Text className="text-gray-800 font-medium">{stats.performance}%</Text>
                    </HStack>
                    <Progress value={stats.performance} max={100} className="h-2 rounded-full bg-gray-200">
                      <ProgressFilledTrack />
                    </Progress>
                  </VStack>
                </HStack>
              </VStack>
            </Box>

            {/* Commandes actives */}
            <Text className="text-gray-800 font-semibold mb-2">Commandes actives ({activeOrders.length})</Text>

            {activeOrders.length > 0
? (
              <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-4">
                <VStack className="divide-y divide-gray-100">
                  {activeOrders.map((order) => (
                    <VStack key={order.id} className="p-4">
                      <HStack className="justify-between items-start mb-2">
                        <VStack>
                          <HStack className="items-center">
                            <Text className="text-gray-800 font-bold">{order.restaurant}</Text>
                            <View className={`ml-2 px-2 py-1 rounded-full ${order.status === "pickup"
? "bg-amber-100"
: "bg-blue-100"}`}>
                              <Text className={`text-xs ${order.status === "pickup"
? "text-amber-800"
: "text-blue-800"}`}>{order.status === "pickup"
? "À récupérer"
: "En livraison"}</Text>
                            </View>
                          </HStack>
                          <Text className="text-gray-500 text-sm">{order.restaurantAddress}</Text>
                        </VStack>
                        <Text className="text-gray-800 font-bold">{order.price.toFixed(2)}€</Text>
                      </HStack>

                      <HStack className="items-center mb-2">
                        <FontAwesome5 name="user" size={14} color="#4B5563" />
                        <Text className="text-gray-600 ml-2">{order.customer}</Text>
                      </HStack>

                      <HStack className="items-center mb-3">
                        <Feather name="map-pin" size={14} color="#4B5563" />
                        <Text className="text-gray-600 ml-2">{order.address}</Text>
                      </HStack>

                      <HStack className="justify-between items-center">
                        <HStack>
                          <HStack className="items-center mr-4">
                            <Feather name="clock" size={14} color="#4B5563" />
                            <Text className="text-gray-600 ml-1">{order.time}</Text>
                          </HStack>

                          <HStack className="items-center">
                            <MaterialCommunityIcons name="map-marker-distance" size={14} color="#4B5563" />
                            <Text className="text-gray-600 ml-1">{order.distance}</Text>
                          </HStack>
                        </HStack>

                        {order.status === "pickup"
? (
                          <Button onPress={() => acceptOrder(order.id)}>
                            <Text className="text-white">Accepter</Text>
                          </Button>
                        )
: (
                          <Button className="bg-green-500" onPress={() => completeOrder(order.id)}>
                            <Text className="text-white">Terminer</Text>
                          </Button>
                        )}
                      </HStack>
                    </VStack>
                  ))}
                </VStack>
              </Box>
            )
: (
              <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-4">
                <VStack className="p-4 items-center justify-center">
                  <Feather name="inbox" size={40} color="#9CA3AF" />
                  <Text className="text-gray-500 mt-2">Aucune commande active</Text>
                </VStack>
              </Box>
            )}

            {/* Actions rapides */}
            <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <VStack className="p-4">
                <Text className="text-gray-800 font-semibold mb-3">Actions rapides</Text>

                <HStack className="justify-between">
                  <Pressable
                    className="bg-blue-50 rounded-xl p-3 items-center justify-center flex-1 mr-2"
                    onPress={() => {
                      navigation.navigate("OrdersScreen");
                    }}
                  >
                    <Feather name="list" size={24} color="#3B82F6" />
                    <Text className="text-blue-700 font-medium mt-1">Historique</Text>
                  </Pressable>

                  <Pressable
                    className="bg-green-50 rounded-xl p-3 items-center justify-center flex-1 mx-2"
                    onPress={() => {
                      navigation.navigate("DeliveryZoneScreen");
                    }}
                  >
                    <Feather name="map" size={24} color="#10B981" />
                    <Text className="text-green-700 font-medium mt-1">Zones</Text>
                  </Pressable>

                  <Pressable
                    className="bg-purple-50 rounded-xl p-3 items-center justify-center flex-1 ml-2"
                    onPress={() => {
                      navigation.navigate("PersonalInfoScreen");
                    }}
                  >
                    <Feather name="user" size={24} color="#8B5CF6" />
                    <Text className="text-purple-700 font-medium mt-1">Profil</Text>
                  </Pressable>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default DashboardScreen;
