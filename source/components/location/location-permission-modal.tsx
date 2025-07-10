import React from "react";
import { Modal, View, Platform, Linking } from "react-native";
import { Text } from "@/components/ui/text";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";

interface LocationPermissionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPermissionGranted: () => void;
}

const LocationPermissionModal: React.FC<LocationPermissionModalProps> = ({ isVisible, onClose, onPermissionGranted }) => {
  const navigation = useNavigation();

  const handleRequestPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        onPermissionGranted();
      } else {
        // Permission refusée, on laisse le modal ouvert
        console.log("Permission de localisation refusée");
      }
    } catch (error) {
      console.error("Erreur lors de la demande de permission:", error);
    }
  };

  const handleOpenSettings = async () => {
    try {
      // Ouvrir les paramètres de l'appareil
      if (Platform.OS === "ios") {
        await Linking.openURL("app-settings:");
      } else {
        await Linking.openSettings();
      }
    } catch (error) {
      console.error("Erreur lors de l'ouverture des paramètres:", error);
    }
  };

  const handleCancel = () => {
    onClose();
    navigation.goBack(); // Retourner à l'écran précédent
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="fade" statusBarTranslucent>
      <View className="flex-1 justify-center items-center bg-black/50">
        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} className="w-[90%] bg-white rounded-2xl overflow-hidden">
          <VStack space="lg" className="p-6">
            {/* Icône de localisation */}
            <View className="items-center justify-center py-4">
              <View className="bg-primary-100 rounded-full p-6">
                <MaterialIcons name="location-on" size={80} color="#FF6347" />
              </View>
            </View>

            {/* Titre et description */}
            <VStack space="sm">
              <Heading className="text-center text-xl font-bold">Activer la localisation</Heading>
              <Text className="text-center text-gray-600">Pour vous offrir la meilleure expérience de livraison, nous avons besoin d'accéder à votre position. Cela nous permettra de vous guider efficacement vers votre destination.</Text>
            </VStack>

            {/* Boutons */}
            <VStack space="sm" className="mt-2">
              <Button onPress={handleRequestPermission} className="bg-primary-500">
                <Text className="text-white font-medium">Activer la localisation</Text>
              </Button>

              <Button onPress={handleOpenSettings} variant="outline" className="border-primary-500">
                <Text className="text-primary-500 font-medium">Ouvrir les paramètres</Text>
              </Button>

              <HStack className="justify-center mt-2">
                <Button onPress={handleCancel} variant="link">
                  <Text className="text-gray-500">Annuler</Text>
                </Button>
              </HStack>
            </VStack>
          </VStack>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Pas besoin de styles supplémentaires

export default LocationPermissionModal;
