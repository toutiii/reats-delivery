import DeliveryMapInfos from "@/components/maps/delivery-map-infos";
import MapsDirections from "@/components/maps/direction";
import Marker from "@/components/maps/marker";
import { colorPrimary } from "@/constants/colors";
import { RootStackParamList } from "@/types/navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Platform, TouchableOpacity, useColorScheme, View } from "react-native";
import MapView, { Circle, MapPressEvent, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from "react-native-maps";
import { MapDirectionsResponse } from "react-native-maps-directions";

// Définir le type des props attendues par la navigation
type DeliveryMapScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "DeliveryMapScreen">;
  route: RouteProp<RootStackParamList, "DeliveryMapScreen">;
};

const DeliveryMapScreen: React.FC<DeliveryMapScreenProps> = ({ route }) => {
  const orderId = route.params?.id
? String(route.params.id)
: "ORDER123";
  const colorScheme = useColorScheme();
  const { height, width } = Dimensions.get("window");
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0421;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const mapView = useRef<MapView | null>(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 48.860294,
    longitude: 2.338629,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapDirectionsResponse, setMapDirectionsResponse] = useState<MapDirectionsResponse | null>(null);
  const [_selectedItem, setSelectedItem] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        if (location) {
          setInitialRegion((prevRegion) => ({
            ...prevRegion,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }));
        }
      } catch (error) {
        console.error("Error fetching location: ", error);
      }
    };
    getLocation();
  }, []);

  const onLocationChange = async (region: MapPressEvent) => {
    const pstn = region.nativeEvent.coordinate;
    if (!pstn) return;
    mapView.current?.animateToRegion(
      {
        latitude: pstn.latitude,
        longitude: pstn?.longitude,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA,
      },
      1000
    );
  };

  return (
    <View className="flex-1">
      <MapView
        provider={Platform.OS === "android"
? PROVIDER_GOOGLE
: PROVIDER_DEFAULT}
        userInterfaceStyle={"light"}
        loadingIndicatorColor={colorPrimary}
        ref={(c) => (mapView.current = c)}
        style={{ width: "100%", height: "100%" }}
        region={initialRegion}
        // onUserLocationChange={onLocationChange}
        onPress={onLocationChange}
        mapType={Platform.OS == "android"
? "none"
: "standard"}
        zoomEnabled={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        moveOnMarkerPress={false}
        toolbarEnabled={false}
        rotateEnabled={true}
        loadingEnabled={true}
      >
        <Circle center={initialRegion} radius={1000} strokeColor={colorPrimary} fillColor="rgba(255,0,0,0.1)" />

        <Marker
          post={{
            latitude: 48.860294,
            longitude: 2.338629,
          }}
          key={123}
          onSelectedItem={(item) => setSelectedItem(item)}
        />

        <MapsDirections
          selectedItem={{
            latitude: 48.860294,
            longitude: 2.338629,
          }}
          initialRegion={initialRegion}
          mapView={mapView}
          setMapDirectionsResponse={setMapDirectionsResponse}
        />
      </MapView>

      <DeliveryMapInfos mapDirectionsResponse={mapDirectionsResponse} onCollapse={() => setIsPanelMinimized(true)} onExpand={() => setIsPanelMinimized(false)} isMinimized={isPanelMinimized} />

      {/* Bouton flottant pour faire réapparaître le panneau lorsqu'il est masqué */}
      {isPanelMinimized && (
        <TouchableOpacity onPress={() => setIsPanelMinimized(false)} className="absolute bottom-6 right-6 bg-primary rounded-full p-3 shadow-md" style={{ backgroundColor: colorPrimary }}>
          <MaterialIcons name="keyboard-arrow-up" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default DeliveryMapScreen;
