import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { GOOGLE_MAPS_API_KEY } from "@/env";
import { RootStackParamList } from "@/types/navigation";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Location from "expo-location";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Linking, Platform, SafeAreaView, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker, Polyline, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections, { MapDirectionsResponse } from "react-native-maps-directions";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type DeliveryStatus = "en_cours" | "livree" | "annulee";

type LocationPoint = {
  latitude: number;
  longitude: number;
};

// Préfixé avec _ pour indiquer qu'il est utilisé comme référence interne
type _MapRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

interface OrderDetails {
  id: string;
  status: DeliveryStatus;
  createdAt: string;
  estimatedDeliveryTime: string;
  totalPrice: number;
  client: {
    id: string;
    name: string;
    address: string;
    location: LocationPoint;
    phone: string;
  };
  restaurant: {
    id: string;
    name: string;
    address: string;
    location: LocationPoint;
    phone: string;
  };
  items: OrderItem[];
}

const LOCATION_TRACKING_OPTIONS = {
  accuracy: Location.Accuracy.Highest,
  distanceInterval: 5,
  timeInterval: 3000,
};

const MAP_PADDING = { top: 100, right: 50, bottom: 350, left: 50 };

// Définir le type des props attendues par la navigation
type DeliveryMapScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "DeliveryMapScreen">;
  route: RouteProp<RootStackParamList, "DeliveryMapScreen">;
};

// Définir le composant comme FC avec le bon type de props
const DeliveryMapScreen: React.FC<DeliveryMapScreenProps> = ({ navigation, route }) => {
  const orderId = route.params?.id
? String(route.params.id)
: "ORDER123";

  const mapRef = useRef<MapView | null>(null);
  const locationSubscription = useRef<Location.LocationSubscription | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationPoint | null>(null);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [showOrderDetails, setShowOrderDetails] = useState<boolean>(false);
  const [etat, setEtat] = useState<string>("15 minutes");
  const [distanceToClient, setDistanceToClient] = useState<string>("Calcul...");

  const { height, width } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0421;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const mockOrderDetails: OrderDetails = useMemo(
    () => ({
      id: orderId,
      status: "en_cours",
      createdAt: "2025-05-07T14:30:00Z",
      estimatedDeliveryTime: "2025-05-07T15:00:00Z",
      totalPrice: 32.5,
      client: {
        id: "client123",
        name: "Marie Dupont",
        address: "15 Avenue des Champs-Élysées, 75008 Paris",
        location: {
          // Coordonnées réelles des Champs-Élysées à Paris
          latitude: 48.8698,
          longitude: 2.3075,
        },
        phone: "+33612345678",
      },
      restaurant: {
        id: "rest456",
        name: "Le Bistrot Parisien",
        address: "42 Rue de Rivoli, 75004 Paris",
        location: {
          // Coordonnées réelles de la Rue de Rivoli à Paris
          latitude: 48.8566,
          longitude: 2.3522,
        },
        phone: "+33123456789",
      },
      items: [
        { id: "item1", name: "Steak Frites", price: 18.5, quantity: 1 },
        { id: "item2", name: "Salade César", price: 9.0, quantity: 1 },
        { id: "item3", name: "Eau Minérale", price: 2.5, quantity: 2 },
      ],
    }),
    [orderId]
  );

  useEffect(() => {
    async function loadOrderData() {
      try {
        setLoading(true);
        setOrderDetails(mockOrderDetails);
        await requestLocationPermissions();
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de charger les détails de la commande");
        setLoading(false);
      }
    }

    loadOrderData();

    return () => {
      stopLocationTracking();
    };
  }, [orderId, mockOrderDetails]);

  const requestLocationPermissions = async (): Promise<boolean> => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("L'autorisation de localisation est nécessaire pour le suivi");
        return false;
      }

      startLocationTracking();
      return true;
    } catch (err) {
      console.error("Erreur lors de la demande de permissions:", err);
      setError("Impossible d'accéder à votre localisation");
      return false;
    }
  };

  const startLocationTracking = async (): Promise<void> => {
    try {
      stopLocationTracking();

      const initialPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });

      const { latitude, longitude } = initialPosition.coords;
      const newLocation: LocationPoint = { latitude, longitude };
      setCurrentLocation(newLocation);

      setTimeout(() => {
        fitMapToShowAll();
      }, 500);

      locationSubscription.current = await Location.watchPositionAsync(LOCATION_TRACKING_OPTIONS, (location) => {
        const { latitude, longitude } = location.coords;
        const newLocation: LocationPoint = { latitude, longitude };

        setCurrentLocation(newLocation);

        if (orderDetails) {
          calculateManualETA(newLocation, orderDetails.client.location);
        }
      });
    } catch (err) {
      console.error("Erreur lors du suivi de localisation:", err);
      setError("Impossible de suivre votre position");
    }
  };

  const stopLocationTracking = (): void => {
    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
  };

  const calculateManualETA = (currentPos: LocationPoint, destination: LocationPoint): void => {
    try {
      const distance = calculateDistance(currentPos, destination);
      setDistanceToClient(`${(distance / 1000).toFixed(1)} km`);

      const avgSpeedKmPerHour = 20;
      const distanceInKm = distance / 1000;
      const timeInMinutes = Math.round((distanceInKm / avgSpeedKmPerHour) * 60);

      if (timeInMinutes < 1) {
        setEtat("moins d'une minute");
      } else if (timeInMinutes === 1) {
        setEtat("1 minute");
      } else {
        setEtat(`${timeInMinutes} minutes`);
      }
    } catch (err) {
      console.error("Erreur lors du calcul de l'ETA:", err);
    }
  };

  const calculateDistance = (point1: LocationPoint, point2: LocationPoint): number => {
    const R = 6371e3;
    const lat1 = (point1.latitude * Math.PI) / 180;
    const lat2 = (point2.latitude * Math.PI) / 180;
    const deltaLat = ((point2.latitude - point1.latitude) * Math.PI) / 180;
    const deltaLon = ((point2.longitude - point1.longitude) * Math.PI) / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fitMapToShowAll = (): void => {
    if (!mapRef.current || !orderDetails || !currentLocation) return;

    // Inclure le livreur, le restaurant et le client dans la vue
    const coordinates = [currentLocation, orderDetails.restaurant.location, orderDetails.client.location];

    // Ajuster la vue avec animation
    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: MAP_PADDING,
      animated: true,
    });
  };

  const centerOnCurrentLocation = (): void => {
    if (!mapRef.current || !currentLocation) return;

    mapRef.current.animateToRegion(
      {
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  // Utilisez le type importé de la bibliothèque pour assurer la compatibilité

  const onDirectionsReady = (result: MapDirectionsResponse) => {
    // Mettre à jour la distance et l'estimation du temps de livraison
    setDistanceToClient(`${result.distance.toFixed(1)} km`);

    // Calculer une estimation du temps plus précise en fonction du trafic
    const eta = result.duration;
    setEtat(eta < 1
? "moins d'une minute"
: eta === 1
? "1 minute"
: `${Math.round(eta)} minutes`);

    // Ajuster la vue de la carte pour montrer tout l'itinéraire
    if (result.coordinates && result.coordinates.length > 0) {
      fitMapToCoordinates(result.coordinates);
    }
  };

  // Ajuster la vue de la carte pour montrer un ensemble de coordonnées
  const fitMapToCoordinates = (coordinates: LocationPoint[]) => {
    if (!mapRef.current || coordinates.length === 0) return;

    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: MAP_PADDING,
      animated: true,
    });
  };

  const contactClient = (method: "phone" | "message"): void => {
    if (!orderDetails) return;

    const phoneNumber = orderDetails.client.phone;

    if (method === "phone") {
      const url = `tel:${phoneNumber}`;
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(url);
          }
          Alert.alert("Erreur", "Impossible d'effectuer l'appel");
        })
        .catch((err) => {
          console.error("Erreur lors de l'appel:", err);
          Alert.alert("Erreur", "Impossible d'effectuer l'appel");
        });
    } else if (method === "message") {
      const url = `sms:${phoneNumber}`;
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(url);
          }
          Alert.alert("Erreur", "Impossible d'envoyer un message");
        })
        .catch((err) => {
          console.error("Erreur lors de l'envoi du message:", err);
          Alert.alert("Erreur", "Impossible d'envoyer un message");
        });
    }
  };

  const markAsDelivered = (): void => {
    Alert.alert(
      "Livraison terminée",
      "Confirmez-vous avoir livré cette commande ?",
      [
        {
          text: "Non",
          style: "cancel",
        },
        {
          text: "Oui",
          style: "default",
          onPress: async () => {
            try {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
                // Notifier l'utilisateur que la livraison est terminée
                Alert.alert("Livraison terminée", "Merci d'avoir effectué cette livraison !", [
                  {
                    text: "Voir mes commandes",
                    onPress: () => navigation.goBack(),
                    style: "default",
                  },
                ]);
                // Retourner à l'écran précédent après délai
                setTimeout(() => {
                  navigation.goBack();
                }, 1000);
              }, 1000);
            } catch (err) {
              console.error("Erreur lors de la confirmation de livraison:", err);
              setLoading(false);
              Alert.alert("Erreur", "Impossible de confirmer la livraison");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#10B981" />
        <Text className="mt-4 text-gray-600">Chargement de la livraison...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Feather name="alert-circle" size={50} color="#EF4444" />
        <Text className="mt-4 text-lg font-semibold text-gray-800">{error}</Text>
        <Button className="mt-6" onPress={() => navigation.goBack()}>
          <ButtonText>Retour</ButtonText>
        </Button>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <SafeAreaView>
        <View className="flex-row items-start justify-between px-6 pt-6">
          <TouchableOpacity className="flex-row items-center justify-center rounded-full py-2 px-4 border border-gray-200 bg-gray-100 shadow-md mb-2">
            <Text className="text-base leading-6 font-bold text-black tracking-wide">Aide</Text>
          </TouchableOpacity>
          <View className="items-end">
            <TouchableOpacity onPress={centerOnCurrentLocation} className="bg-primary-500 rounded-full p-3">
              <Feather color="#fff" name="navigation" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <MapView
        ref={mapRef}
        provider={Platform.OS === "android"
? PROVIDER_GOOGLE
: PROVIDER_DEFAULT}
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
        }}
        initialRegion={{
          latitude: currentLocation?.latitude || 48.8566,
          longitude: currentLocation?.longitude || 2.3522,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        showsTraffic={true}
        loadingEnabled={true}
        rotateEnabled={true}
        scrollEnabled={true}
        pitchEnabled={true}
        zoomEnabled={true}
        toolbarEnabled={false}
      >
        {orderDetails?.restaurant.location && (
          <Marker coordinate={orderDetails.restaurant.location} title={orderDetails.restaurant.name} description={orderDetails.restaurant.address}>
            <View className="w-10 h-10 bg-amber-500 rounded-full items-center justify-center border-2 border-white shadow-md">
              <FontAwesome name="cutlery" color="#fff" size={16} />
            </View>
          </Marker>
        )}

        {orderDetails?.client.location && (
          <Marker coordinate={orderDetails.client.location} title={orderDetails.client.name} description={orderDetails.client.address}>
            <View className="w-10 h-10 bg-blue-600 rounded-full items-center justify-center border-2 border-white shadow-md">
              <FontAwesome name="map-marker" color="#fff" size={20} />
            </View>
          </Marker>
        )}

        {currentLocation && <Circle center={currentLocation} radius={200} strokeColor="#10B981" fillColor="rgba(16, 185, 129, 0.1)" />}

        {currentLocation && orderDetails?.client.location && GOOGLE_MAPS_API_KEY && (
          <MapViewDirections
            origin={currentLocation}
            destination={orderDetails.client.location}
            waypoints={[orderDetails.restaurant.location]} // Ajouter le restaurant comme point de passage
            mode="DRIVING" // Mode de transport (DRIVING, WALKING, BICYCLING, TRANSIT)
            precision="high" // Haute précision pour suivre exactement les routes
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#FF6347"
            optimizeWaypoints={true}
            resetOnChange={false} // Évite de recalculer l'itinéraire à chaque petit changement
            timePrecision="now" // Prend en compte le trafic en temps réel
            onReady={onDirectionsReady}
            onError={(errorMessage) => {
              console.error(`Erreur de l'API Directions: ${errorMessage}`);
              calculateManualETA(currentLocation, orderDetails.client.location);
            }}
          />
        )}

        {currentLocation && orderDetails?.client.location && !GOOGLE_MAPS_API_KEY && <Polyline coordinates={[currentLocation, orderDetails.client.location]} strokeColor="#FF6347" strokeWidth={4} lineDashPattern={[0]} lineCap="round" lineJoin="round" />}
      </MapView>

      <View className="flex-1 max-h-96 mt-auto bg-white rounded-t-3xl shadow-2xl">
        <View className="items-center py-2">
          <View className="w-16 h-1 bg-gray-300 rounded-full" />
        </View>

        <View className="p-4 border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900 mb-1">Livraison en cours</Text>

          <View className="flex-row justify-between">
            <Text className="text-sm font-medium text-gray-500">
              Arrivée estimée dans
              <Text className="font-semibold text-green-600">{etat
? ` ${etat}`
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

        <VStack className="px-6 mt-3" space="md">
          <Button onPress={markAsDelivered}>
            <ButtonText>Marquer comme livrée</ButtonText>
          </Button>

          <Button variant="outline" onPress={() => setShowOrderDetails(!showOrderDetails)}>
            <ButtonText>{showOrderDetails
? "Masquer les détails"
: "Voir les détails de la commande"}</ButtonText>
          </Button>
        </VStack>
      </View>
    </View>
  );
};

export default DeliveryMapScreen;
