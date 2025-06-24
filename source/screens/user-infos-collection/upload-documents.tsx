import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import useImagePicker from "@/hooks/useImagePicker";
import { StackNavigation } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ImagePickerAsset } from "expo-image-picker";
import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { ActionSheetIOS, Alert, Image, Platform, SafeAreaView, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * Interface pour les propriétés du composant UploadSection
 */
interface UploadSectionProps {
  title: string;
  image: ImagePickerAsset | null;
  onUpload: () => void;
  testID?: string;
}

type CardSide = "front" | "back";

const UploadDocumentsScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const insets = useSafeAreaInsets();

  // Utilisation optimisée du hook useImagePicker pour les deux faces
  const { selectedImage: frontImage, loading: frontLoading, error: frontError, takePicture: takeFrontPicture, pickImage: pickFrontImage, clearImage: clearFrontImage } = useImagePicker();

  const { selectedImage: backImage, loading: backLoading, error: backError, takePicture: takeBackPicture, pickImage: pickBackImage, clearImage: clearBackImage } = useImagePicker();

  // Vérifier si les images sont téléchargées pour activer le bouton de soumission
  const canSubmit: boolean = !!frontImage && !!backImage;

  // Gestion des erreurs (facultatif)
  React.useEffect(() => {
    if (frontError) {
      Alert.alert("Erreur", frontError);
    }
    if (backError) {
      Alert.alert("Erreur", backError);
    }
  }, [frontError, backError]);

  /**
   * Fonction pour ouvrir le sélecteur d'image pour une face spécifique
   */
  const handleUploadPress = useCallback(
    (side: CardSide) => {
      if (Platform.OS === "ios") {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Annuler", "Prendre une photo", "Choisir depuis la galerie"],
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if (buttonIndex === 1) {
              side === "front"
? takeFrontPicture()
: takeBackPicture();
            } else if (buttonIndex === 2) {
              side === "front"
? pickFrontImage()
: pickBackImage();
            }
          }
        );
      } else {
        // Pour Android, on utilise une approche similaire avec un modal personnalisé
        Alert.alert("Choisir une option", "Comment souhaitez-vous ajouter une photo ?", [
          { text: "Annuler", style: "cancel" },
          {
            text: "Prendre une photo",
            onPress: () => (side === "front"
? takeFrontPicture()
: takeBackPicture()),
          },
          {
            text: "Choisir depuis la galerie",
            onPress: () => (side === "front"
? pickFrontImage()
: pickBackImage()),
          },
        ]);
      }
    },
    [takeFrontPicture, takeBackPicture, pickFrontImage, pickBackImage]
  );

  /**
   * Fonction pour la soumission du formulaire
   */
  const handleSubmit = useCallback(() => {
    if (canSubmit) {
      // Ici vous pourriez ajouter une logique d'envoi des images à un serveur
      // Avant de naviguer en arrière
      navigation.goBack();
    }
  }, [canSubmit]);

  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <StatusBar style="dark" />

        <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          <View className="flex-1 px-6 pt-4">
            <Box className="pt-4 pb-6">
              <Heading className="mb-1" size="2xl">
                Aadhar card details
              </Heading>
              <Text className="text-base">
                Upload focused photo of your Aadhar Card{"\n"}
                for faster verification
              </Text>
            </Box>

            <VStack space="xl">
              {/* Upload Area - Front Side */}
              <UploadSection title="Front side photo of your Aadhar card with your clear name and photo" image={frontImage} onUpload={() => handleUploadPress("front")} testID="upload-front-photo" />

              {/* Upload Area - Back Side */}
              <UploadSection title="Back side photo of your Aadhar card with your clear name and photo" image={backImage} onUpload={() => handleUploadPress("back")} testID="upload-back-photo" />
            </VStack>
          </View>
        </ScrollView>

        {/* Submit Button - Fixed at Bottom */}
        <Box
          className="px-6 pb-4 bg-background-0 absolute bottom-0 py-4 left-0 right-0"
          style={{
            paddingBottom: Math.max(insets.bottom, 16),
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <Button
            size="xl"
            disabled={!canSubmit || frontLoading || backLoading}
            onPress={handleSubmit}
            accessibilityLabel="Submit Aadhar card details"
            accessibilityHint={canSubmit
? "Submit your uploaded documents"
: "Upload both front and back photos to enable submission"}
            testID="submit-button"
          >
            <ButtonText className="text-white text-lg font-medium">{frontLoading || backLoading
? "Chargement..."
: "Submit"}</ButtonText>
          </Button>
        </Box>
      </SafeAreaView>
    </ThemedView>
  );
};

/**
 * UploadSection Component
 *
 * Composant réutilisable pour les sections d'upload de documents
 * Affiche les instructions et le bouton d'upload ou l'image téléchargée
 */
const UploadSection: React.FC<UploadSectionProps> = ({ title, image, onUpload, testID }) => {
  /**
   * Interface pour les props du render prop de Pressable
   */
  interface PressableRenderProps {
    pressed: boolean;
  }

  const uploaded = !!image;

  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="flex-1">
        <Box
          className="border border-dashed border-gray-300 rounded-xl p-4 items-center"
          style={{
            borderWidth: 1,
            borderStyle: "dashed",
          }}
          testID={testID}
        >
          {uploaded ? (
            // Affichage de l'image téléchargée
            <Box className="w-full items-center">
              <Text
                className="text-gray-700 text-base text-center mb-4"
                style={{
                  lineHeight: 24,
                }}
              >
                {title}
              </Text>

              {/* Afficher l'image téléchargée */}
              <Box className="mb-4 rounded-xl overflow-hidden" style={{ width: "100%", height: 200 }}>
                <Image source={{ uri: image.uri }} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
              </Box>

              {/* Bouton "Uploaded" avec croix pour changer */}
              <Pressable onPress={onUpload} accessibilityRole="button" accessibilityLabel="Change uploaded photo" testID={`${testID}-change-button`}>
                {({ pressed }: PressableRenderProps) => (
                  <Box
                    className={`flex-row items-center justify-center px-5 py-2.5 rounded-full border
                        ${pressed
? "opacity-80"
: "opacity-100"}
                        bg-rose-50 border-rose-300`}
                  >
                    <Text
                      className="text-rose-500 font-medium mr-2"
                      style={{
                        fontSize: 15,
                      }}
                    >
                      Uploaded
                    </Text>
                    <View className="w-5 h-5 rounded-full bg-rose-500 items-center justify-center">
                      <Feather name="x" size={12} color="#fff" />
                    </View>
                  </Box>
                )}
              </Pressable>
            </Box>
          ) : (
            // Affichage du bouton d'upload quand il n'y a pas d'image
            <Box className="items-center p-8">
              <Text
                className="text-gray-700 text-base text-center mb-4"
                style={{
                  lineHeight: 24,
                }}
              >
                {title}
              </Text>

              {/* Upload Photo Button */}
              <Pressable onPress={onUpload} accessibilityRole="button" accessibilityLabel="Upload photo" testID={`${testID}-button`}>
                {({ pressed }: PressableRenderProps) => (
                  <Box
                    className={`flex-row items-center justify-center px-5 py-2.5 rounded-full border
                        ${pressed
? "opacity-80"
: "opacity-100"}
                        bg-white border-rose-300`}
                  >
                    <Feather name="camera" size={20} color="#f87171" className="mr-2" />

                    <Text
                      className="text-rose-500 font-medium"
                      style={{
                        fontSize: 15,
                      }}
                    >
                      Upload Photo
                    </Text>
                  </Box>
                )}
              </Pressable>
            </Box>
          )}
        </Box>
      </ThemedView>
    </SafeAreaView>
  );
};

export default UploadDocumentsScreen;
