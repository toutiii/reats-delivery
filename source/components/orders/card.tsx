import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Order } from "@/types/orders";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, LayoutAnimation, Platform, TouchableOpacity, UIManager, View } from "react-native";
import { OrderStatus } from "./order-status";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CardProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

export const Card = ({ order: _order, onViewDetails }: CardProps) => {
  // Reassign to use throughout the component
  const order = _order;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Animations
  const cardScale = useRef(new Animated.Value(0.97)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(5)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const viewButtonScale = useRef(new Animated.Value(1)).current;
  const expandButtonScale = useRef(new Animated.Value(1)).current;

  // Animation d'entrée au montage du composant
  useEffect(() => {
    Animated.timing(cardScale, {
      toValue: 1,
      useNativeDriver: true,
      duration: 250,
      easing: Easing.out(Easing.ease),
    }).start();

    // Animation de fade-in progressive
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.ease,
    }).start();
  }, []);

  // Configuration de l'animation d'expansion/réduction
  const configureLayoutAnimation = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.85,
      },
    });
  };

  const toggleExpand = () => {
    // Animation de feedback pour le bouton
    Animated.sequence([
      Animated.timing(expandButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(expandButtonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(2)),
      }),
    ]).start();

    configureLayoutAnimation();

    // Rotation du chevron
    Animated.timing(rotateAnim, {
      toValue: isExpanded
? 0
: 1,
      duration: 300,
      useNativeDriver: true,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }).start();

    // Gestion des animations de contenu
    if (!isExpanded) {
      // Réinitialisation des valeurs d'animation avant l'expansion
      fadeAnim.setValue(0);
      slideAnim.setValue(10);

      // Animation d'entrée du contenu
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.out(Easing.quad),
        }),
      ]).start();
    }

    setIsExpanded(!isExpanded);
  };

  // Uncomment to debug order info
  // useEffect(() => {
  //    console.log(`Card received order ID: ${order.id}`);
  // }, [order]);

  const handleViewDetails = () => {
    // Animation du bouton lors d'un appui
    Animated.sequence([
      Animated.timing(viewButtonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(viewButtonScale, {
        toValue: 1.05,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(2)),
      }),
      Animated.timing(viewButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Call the passed onViewDetails function with the order
    onViewDetails(order);
  };

  // Interpolation de la rotation de l'icône selon l'état d'expansion
  const iconRotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Animated.View
      style={{
        transform: [{ scale: cardScale }],
        opacity: fadeAnim,
      }}
      className="mb-4"
      accessibilityLabel={`Carte de commande ${order.id}`}
      accessibilityState={{ expanded: isExpanded }}
    >
      <View className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <View className="px-4 pt-4 pb-4">
          <View className="flex-row justify-between items-center">
            {/* Numéro de commande */}
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 bg-gray-50 rounded-full mr-3 items-center justify-center">
                <Text className="text-gray-600 font-bold">{order.id}</Text>
              </View>
              <View>
                <Text className="text-gray-400 text-xs mb-0.5">Commande N°</Text>
                <Text className="text-gray-800 font-semibold">#{order.id}</Text>
              </View>
            </View>

            {/* Statut */}
            <View className="flex-row items-center">
              <OrderStatus status={order.status} />

              {/* Bouton de détails - toujours visible */}
              <Animated.View style={[{ transform: [{ scale: viewButtonScale }] }]}>
                <TouchableOpacity onPress={handleViewDetails} className="ml-3 p-2 bg-blue-50 rounded-full" accessibilityRole="button" accessibilityLabel="Voir les détails de la commande" accessibilityHint="Ouvre la page complète des détails de la commande">
                  <Feather name="eye" size={18} color="#3b82f6" />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>

          <View className="flex-row flex-wrap mt-3">
            {order.type && (
              <View className="mr-3 mb-1 py-1 px-2 bg-gray-50 rounded-md">
                <Text className="text-xs text-gray-600">{order.type}</Text>
              </View>
            )}
            {order.time && (
              <View className="mr-3 mb-1 py-1 px-2 bg-gray-50 rounded-md">
                <Text className="text-xs text-gray-600">{order.time}</Text>
              </View>
            )}
          </View>

          {/* Bouton Développer/Réduire */}
          <View className="mt-3">
            <Animated.View style={{ transform: [{ scale: expandButtonScale }] }}>
              <Button
                onPress={toggleExpand}
                accessibilityRole="button"
                accessibilityLabel={isExpanded
? "Masquer les détails"
: "Afficher les détails"}
                accessibilityHint={isExpanded
? "Masque les informations supplémentaires de la commande"
: "Affiche les informations supplémentaires de la commande"}
                variant="outline"
              >
                <ButtonText className="text-sm font-medium mr-1">{isExpanded
? "Masquer détails"
: "Afficher détails"}</ButtonText>
                <Animated.View
                  style={{
                    transform: [{ rotate: iconRotation }],
                  }}
                >
                  <Feather name="chevron-down" size={18} color="#FF6347" />
                </Animated.View>
              </Button>
            </Animated.View>
          </View>
        </View>

        {isExpanded && (
          <View>
            <View className="h-px bg-gray-100" />
            <View className="p-4">
              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
                className="mb-4"
              >
                {order.customer && (
                  <View className="flex-row items-center mb-4">
                    <View className="w-8 h-8 bg-red-50 rounded-full mr-3 items-center justify-center">
                      <Feather name="user" size={16} color="#f87171" />
                    </View>
                    <View>
                      <Text className="text-xs text-gray-500 mb-0.5">Client</Text>
                      <Text className="text-gray-800 font-medium">{order.customer.name}</Text>
                    </View>
                  </View>
                )}

                <View className="bg-gray-50 p-3 rounded-lg">
                  <Text className="mb-1">Adresse de livraison :</Text>
                  <Text className="text-sm">{"123 Rue Principale, Appartement 4B, Paris, 75001"}</Text>
                </View>
              </Animated.View>

              <Animated.View
                style={{
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }}
              >
                <Button onPress={() => onViewDetails(order)}>
                  <ButtonText>Voir tous les détails</ButtonText>
                </Button>
              </Animated.View>
            </View>
          </View>
        )}
      </View>
    </Animated.View>
  );
};
