import { GOOGLE_MAPS_API_KEY } from "@/env";
import React, { FC } from "react";
import { Dimensions, Text, View } from "react-native";
import MapViewDirections, { MapDirectionsResponse } from "react-native-maps-directions";

type MapsDirectionsProps = {
  selectedItem: any;
  mapView: React.MutableRefObject<any>;
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  setMapDirectionsResponse: React.Dispatch<React.SetStateAction<MapDirectionsResponse | null>>;
};

const MapsDirections: FC<MapsDirectionsProps> = ({ selectedItem, initialRegion, mapView, setMapDirectionsResponse }) => {
  const { height, width } = Dimensions.get("window");

  // Coordonnées de destination
  const destinationLatitude = selectedItem?.latitude;
  const destinationLongitude = selectedItem?.longitude;

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>Clé Google Maps API non disponible. Veuillez redémarrer l'application.</Text>
      </View>
    );
  }

  return (
    <MapViewDirections
      origin={{
        latitude: initialRegion.latitude,
        longitude: initialRegion.longitude,
      }}
      destination={{
        latitude: destinationLatitude,
        longitude: destinationLongitude,
      }}
      apikey={GOOGLE_MAPS_API_KEY}
      strokeWidth={3}
      strokeColor="hotpink"
      optimizeWaypoints={true}
      onStart={(params) => {
        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
      }}
      onReady={(result) => {
        console.log(`Distance: ${result.distance} km`);
        console.log(`Duration: ${result.duration} min.`);
        setMapDirectionsResponse(result);

        if (result.coordinates.length > 0) {
          mapView.current.fitToCoordinates(result.coordinates, {
            edgePadding: {
              right: width / 20,
              bottom: height / 20,
              left: width / 20,
              top: height / 20,
            },
          });
        } else {
          console.warn("No coordinates found for directions");
        }
      }}
      onError={(errorMessage) => {
        console.error("Error with Directions API:", errorMessage);
        if (errorMessage === "ZERO_RESULTS") {
          console.warn("No route found between the origin and destination");
          setMapDirectionsResponse(null);
        } else if (errorMessage && errorMessage.includes("enable Billing")) {
          console.warn("Google Maps API error: Billing not enabled on Google Cloud Project");
          setMapDirectionsResponse(null);
        } else if (errorMessage && errorMessage.includes("API key")) {
          console.warn("Google Maps API error: Invalid or restricted API key");
          setMapDirectionsResponse(null);
        } else {
          console.warn("An error occurred while fetching directions:", errorMessage);
          setMapDirectionsResponse(null);
        }
      }}
    />
  );
};

export default MapsDirections;
