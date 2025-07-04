import { StackNavigation } from "@/types/navigation";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Dimensions, Linking, TouchableOpacity, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { MapDirectionsResponse } from "react-native-maps-directions";
import Animated, { Easing, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Button, ButtonText } from "../ui/button";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

type DeliveryMapInfosProps = {
  mapDirectionsResponse: MapDirectionsResponse | null;
  onExpand?: () => void;
  onCollapse?: () => void;
  isMinimized?: boolean;
};

// Sample order data - in a real app, this would come from API or props
const orderDetails = {
  client: {
    name: "Jean Dupont",
    phone: "+33678901234",
    address: "15 Rue de la Paix, Paris",
  },
  items: [
    { id: "1", name: "Pizza Margherita", price: 12.99, quantity: 1 },
    { id: "2", name: "Coca-Cola", price: 2.5, quantity: 2 },
    { id: "3", name: "Tiramisu", price: 5.99, quantity: 1 },
  ],
  totalPrice: 23.98,
};

const DeliveryMapInfos = ({ mapDirectionsResponse, onExpand, onCollapse, isMinimized = false }: DeliveryMapInfosProps) => {
  const navigation = useNavigation<StackNavigation>();
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  // Get screen dimensions
  const { height: screenHeight } = Dimensions.get("window");
  // Animation values
  const slideUpAnimation = useSharedValue(300); // Start offscreen
  const detailsHeight = useSharedValue(0);
  const panelHeight = useSharedValue(isMinimized
? 0
: 1); // 1 = full height, 0 = minimized

  // Animation for order details height
  useEffect(() => {
    detailsHeight.value = withTiming(showOrderDetails
? 1
: 0, { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  }, [showOrderDetails]);

  // S'assurer que le panneau est visible ou minimisé selon la prop externe isMinimized
  useEffect(() => {
    panelHeight.value = withTiming(isMinimized
? 0
: 1, { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) });
  }, [isMinimized]);

  // Animation pour le slide-up initial du panneau
  useEffect(() => {
    slideUpAnimation.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
    });
  }, []);

  // Extract distance and duration from mapDirectionsResponse
  const distanceToClient = mapDirectionsResponse?.distance
? `${mapDirectionsResponse.distance.toFixed(1)} km`
: "Calcul en cours...";

  const eta = mapDirectionsResponse?.duration
? `${Math.ceil(mapDirectionsResponse.duration)} min`
: "";

  // Gesture handler for swipe up/down
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = panelHeight.value;
    },
    onActive: (event, ctx) => {
      const newValue = ctx.startY - event.translationY / screenHeight;
      // Limit the range between 0 and 1
      panelHeight.value = Math.max(0, Math.min(1, newValue));
    },
    onEnd: (event) => {
      // If swipe is fast enough or panel position is closer to an edge, snap to that position
      if (event.velocityY > 500 || panelHeight.value < 0.3) {
        panelHeight.value = withSpring(0, { damping: 15 });
        if (onCollapse) {
          runOnJS(onCollapse)();
        }
      } else if (event.velocityY < -500 || panelHeight.value > 0.7) {
        panelHeight.value = withSpring(1, { damping: 15 });
        if (onExpand) {
          runOnJS(onExpand)();
        }
      } else {
        // Snap to the closest edge
        const snapTo = panelHeight.value > 0.5
? 1
: 0;
        panelHeight.value = withSpring(snapTo, { damping: 15 });
        if (snapTo === 0 && onCollapse) {
          runOnJS(onCollapse)();
        } else if (snapTo === 1 && onExpand) {
          runOnJS(onExpand)();
        }
      }
    },
  });

  // Toggle panel visibility function
  const togglePanelVisibility = useCallback(() => {
    if (isMinimized) {
      if (onExpand) onExpand();
    } else {
      if (onCollapse) onCollapse();
    }
  }, [isMinimized, onCollapse, onExpand]);

  // Animated styles
  const containerStyle = useAnimatedStyle(() => {
    const translateY = interpolate(panelHeight.value, [0, 1], [screenHeight - 60, slideUpAnimation.value]);

    return {
      transform: [{ translateY }],
    };
  });

  // Function to contact client
  const contactClient = (method: "phone" | "message") => {
    const phoneNumber = orderDetails.client.phone;

    if (!phoneNumber) {
      Alert.alert("Erreur", "Numéro de téléphone non disponible");
      return;
    }

    try {
      if (method === "phone") {
        Linking.openURL(`tel:${phoneNumber}`);
      } else {
        Linking.openURL(`sms:${phoneNumber}`);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de contacter le client");
      console.error("Error contacting client:", error);
    }
  };

  // Function to mark order as delivered
  const markAsDelivered = () => {
    Alert.alert("Confirmation", "Marquer cette commande comme livrée ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Confirmer",
        onPress: () => {
          // Here you would call an API to update the order status
          Alert.alert("Succès", "Commande marquée comme livrée");
          navigation.navigate("DeliveryConfirmationScreen");
        },
      },
    ]);
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={containerStyle} className="flex-1 mt-auto bg-white rounded-t-3xl shadow-2xl absolute bottom-0 w-full pb-12">
        <View className="items-center py-2 flex-row justify-center">
          <View className="w-16 h-1 bg-gray-300 rounded-full" />
        </View>
        <TouchableOpacity onPress={togglePanelVisibility} className="absolute top-2 right-4 p-2 z-10">
          <MaterialIcons name={isMinimized
? "keyboard-arrow-up"
: "keyboard-arrow-down"} size={24} color="#666" />
        </TouchableOpacity>

        <View className="p-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900 mb-1">Livraison en cours</Text>

          <View className="flex-row justify-between">
            <Text className="text-sm font-medium text-gray-500">
              Arrivée estimée dans
              <Text className="font-semibold text-green-600">{eta
? ` ${eta}`
: " calcul en cours..."}</Text>
            </Text>

            <Text className="text-sm font-medium text-gray-500">
              Distance:
              <Text className="font-semibold text-blue-600">{` ${distanceToClient}`}</Text>
            </Text>
          </View>
        </View>

        <View className="flex-row items-center p-4 border-b border-gray-200">
          <View className="mr-auto">
            <Text className="text-lg font-semibold text-gray-900 mb-1">Client</Text>

            <Text className="text-sm text-gray-500">{orderDetails?.client.name || "Client"}</Text>

            <Text className="text-xs text-gray-400 mt-1">{orderDetails?.client.address || "Adresse"}</Text>
          </View>

          <TouchableOpacity onPress={() => contactClient("phone")} className="flex-row items-center justify-center rounded-full py-2 px-4 border border-gray-200 bg-gray-100 ml-1">
            <Feather color="#000" name="phone" size={19} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => contactClient("message")} className="flex-row items-center justify-center rounded-full py-2 px-4 border border-gray-200 bg-gray-100 ml-1">
            <Feather color="#000" name="message-square" size={19} />
          </TouchableOpacity>
        </View>

        {showOrderDetails && orderDetails?.items && (
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold text-gray-900 mb-3">Détails de la commande</Text>

            {orderDetails.items.map((item) => (
              <View key={item.id} className="flex-row justify-between mb-2">
                <Text className="text-gray-700">
                  {item.quantity > 1
? `${item.quantity}x `
: ""}
                  {item.name}
                </Text>
                <Text className="font-medium">{(item.price * item.quantity).toFixed(2)} €</Text>
              </View>
            ))}

            <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-200">
              <Text className="font-bold text-gray-900">Total</Text>
              <Text className="font-bold text-gray-900">{orderDetails.totalPrice.toFixed(2)} €</Text>
            </View>
          </View>
        )}

        <VStack className="px-6 mt-6" space="md">
          <Button onPress={markAsDelivered}>
            <ButtonText>Marquer comme livrée</ButtonText>
          </Button>

          <Button variant="outline" onPress={() => setShowOrderDetails(!showOrderDetails)}>
            <ButtonText>{showOrderDetails
? "Masquer les détails"
: "Voir les détails de la commande"}</ButtonText>
          </Button>
        </VStack>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DeliveryMapInfos;
