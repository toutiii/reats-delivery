import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
   Animated,
   Easing,
   LayoutAnimation,
   Platform,
   TouchableOpacity,
   UIManager,
   View,
} from 'react-native';
import { Button, ButtonText } from '../ui/button';
import { Text } from '../ui/text';
import { OrderStatus } from './order-status';

if (
   Platform.OS === 'android' &&
   UIManager.setLayoutAnimationEnabledExperimental
) {
   UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CardProps {
   order: Order;
   onViewDetails: (order: Order) => void;
}

export const Card: React.FC<CardProps> = ({ order, onViewDetails }) => {
   const [isExpanded, setIsExpanded] = useState<boolean>(false);

   // Native animations (useNativeDriver: true)
   const scaleAnim = useRef(new Animated.Value(1)).current;
   const buttonScaleAnim = useRef(new Animated.Value(1)).current;
   const iconAnim = useRef(new Animated.Value(0)).current;
   const shakeAnim = useRef(new Animated.Value(0)).current;
   const contentItemOpacity = useRef(new Animated.Value(0)).current;
   const contentItemTranslateY = useRef(new Animated.Value(15)).current;

   // Animation d'entrée au montage du composant
   useEffect(() => {
      Animated.sequence([
         Animated.timing(scaleAnim, {
            toValue: 1.03,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.out(Easing.back(1.5)),
         }),
         Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
         }),
      ]).start();
   }, []);

   // Animation pour indicateur de statut
   useEffect(() => {
      if (order.status === 'Delivered') {
         pulseAnimation();
      }
   }, [order.status]);

   const pulseAnimation = () => {
      Animated.loop(
         Animated.sequence([
            Animated.timing(buttonScaleAnim, {
               toValue: 1.08,
               duration: 800,
               useNativeDriver: true,
               easing: Easing.out(Easing.ease),
            }),
            Animated.timing(buttonScaleAnim, {
               toValue: 1,
               duration: 800,
               useNativeDriver: true,
               easing: Easing.in(Easing.ease),
            }),
         ]),
         { iterations: 3 }
      ).start();
   };

   // Animation de secousse pour attirer l'attention
   const triggerShakeAnimation = () => {
      shakeAnim.setValue(0);
      Animated.sequence([
         Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.linear,
         }),
         Animated.timing(shakeAnim, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.linear,
         }),
         Animated.timing(shakeAnim, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.linear,
         }),
         Animated.timing(shakeAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.linear,
         }),
      ]).start();
   };

   const toggleExpand = (): void => {
      // Animation de l'icône de chevron
      Animated.timing(iconAnim, {
         toValue: isExpanded ? 0 : 1,
         duration: 300,
         useNativeDriver: true,
         easing: Easing.bezier(0.25, 1, 0.5, 1),
      }).start();

      // Animation d'opacité et de translation du contenu
      if (!isExpanded) {
         // Réinitialiser au début du déploiement
         contentItemOpacity.setValue(0);
         contentItemTranslateY.setValue(15);

         // Animer l'entrée du contenu
         Animated.parallel([
            Animated.timing(contentItemOpacity, {
               toValue: 1,
               duration: 300,
               useNativeDriver: true,
               easing: Easing.in(Easing.quad),
            }),
            Animated.timing(contentItemTranslateY, {
               toValue: 0,
               duration: 300,
               useNativeDriver: true,
               easing: Easing.in(Easing.quad),
            }),
         ]).start();
      }

      // Utiliser LayoutAnimation pour la hauteur
      LayoutAnimation.configureNext({
         duration: 350,
         update: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.scaleXY,
         },
      });

      // Effet de rebond pour le bouton de détails
      if (!isExpanded) {
         setTimeout(() => {
            Animated.sequence([
               Animated.timing(buttonScaleAnim, {
                  toValue: 1.1,
                  duration: 150,
                  useNativeDriver: true,
                  easing: Easing.out(Easing.back(2)),
               }),
               Animated.timing(buttonScaleAnim, {
                  toValue: 1,
                  duration: 100,
                  useNativeDriver: true,
               }),
            ]).start();
         }, 250);
      }

      setIsExpanded(!isExpanded);
   };

   // Effets d'animation au clic sur le bouton de détails
   const handleViewDetails = () => {
      Animated.sequence([
         Animated.timing(buttonScaleAnim, {
            toValue: 0.9,
            duration: 100,
            useNativeDriver: true,
         }),
         Animated.timing(buttonScaleAnim, {
            toValue: 1.05,
            duration: 100,
            useNativeDriver: true,
            easing: Easing.out(Easing.back(2)),
         }),
         Animated.timing(buttonScaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
         }),
      ]).start(() => {
         onViewDetails(order);
      });

      router.push('/(protected)/order-details/1');
   };

   // Styles dynamiques
   const iconRotation = iconAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
   });

   const cardStyle = {
      transform: [{ scale: scaleAnim }, { translateX: shakeAnim }],
   };

   const buttonScale = {
      transform: [{ scale: buttonScaleAnim }],
   };

   // Effet d'entrée pour les éléments du contenu
   const contentItemStyle = {
      opacity: contentItemOpacity,
      transform: [{ translateY: contentItemTranslateY }],
   };

   return (
      <Animated.View style={[cardStyle]} className="mb-3">
         {/* Header toujours visible avec effet 3D subtil */}
         <TouchableOpacity
            onPress={() => {
               toggleExpand();
               if (!isExpanded) triggerShakeAnimation();
            }}
            activeOpacity={0.7}
            className={`bg-white px-5 py-4 ${isExpanded ? 'rounded-t-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]' : 'rounded-xl shadow-[0_2px_5px_rgba(0,0,0,0.05)]'}`}
            accessibilityRole="button"
            accessibilityLabel={`Order ${order.id}, ${order.status}. Tap to ${isExpanded ? 'collapse' : 'expand'}.`}
         >
            <View className="flex-row justify-between items-center">
               <View>
                  <Text className="text-gray-800 font-medium text-base">
                     Order No.
                  </Text>
                  <Text className="text-gray-800 font-medium text-base">
                     #{order.id}
                  </Text>
               </View>

               <View className="flex-row items-center">
                  <Animated.View
                     style={order.status === 'Delivered' ? buttonScale : null}
                  >
                     <OrderStatus status={order.status} />
                  </Animated.View>
                  <Animated.View
                     style={{
                        marginLeft: 8,
                        transform: [{ rotate: iconRotation }],
                     }}
                  >
                     <Feather name="chevron-down" size={20} color="#666" />
                  </Animated.View>
               </View>
            </View>
         </TouchableOpacity>

         {/* Contenu avec animations d'entrée */}
         {isExpanded && (
            <View className="bg-white rounded-b-xl px-5 pt-1 pb-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
               {order.type && (
                  <Animated.View
                     style={contentItemStyle}
                     className="flex-row mb-3"
                  >
                     <Text className="text-gray-800 font-medium">
                        {order.type} | {order.time}
                     </Text>
                  </Animated.View>
               )}

               {order.customer && (
                  <Animated.View
                     style={contentItemStyle}
                     className="flex-row items-center mb-4"
                  >
                     <View className="w-6 h-6 mr-3 flex-row justify-center items-center">
                        <Feather name="user" size={18} color="#f87171" />
                     </View>
                     <Text className="text-gray-800 font-medium">
                        {order.customer.name}
                     </Text>
                  </Animated.View>
               )}

               <Animated.View style={contentItemStyle}>
                  <Button onPress={handleViewDetails}>
                     <Animated.View style={buttonScale}>
                        <ButtonText>View Details</ButtonText>
                     </Animated.View>
                  </Button>
               </Animated.View>
            </View>
         )}
      </Animated.View>
   );
};
