import { ThemedView } from "@/components/themed-view";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

const PersonalInfoScreen = () => {
  // État pour stocker les données du formulaire
  const [formData, setFormData] = React.useState({
    firstName: "Ronald",
    lastName: "Richards",
    email: "ronaldrichards@example.com",
    phone: "+111 1234 56 89",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  });

  // État pour les champs d'entrée modifiés
  const [modified, setModified] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  // Pour choisir une nouvelle image de profil
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData({
        ...formData,
        avatar: result.assets[0].uri,
      });
    }
  };

  // Pour gérer les changements dans le formulaire
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    setModified({
      ...modified,
      [field]: true,
    });
  };

  // Pour sauvegarder les modifications
  const handleSave = () => {
    Alert.alert("Modifications enregistrées", "Vos informations personnelles ont été mises à jour avec succès.", [{ text: "OK" }]);
  };

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView behavior={Platform.OS === "ios"
? "padding"
: "height"} className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }} className="flex-1">
            <VStack space="xl" className="px-5 py-6">
              {/* En-tête */}
              <Heading size="xl" className="text-gray-800 mb-2">
                Informations personnelles
              </Heading>

              {/* Photo de profil */}
              <VStack className="items-center mb-4">
                <Box className="relative">
                  <Avatar size="2xl" className="border-2 border-white shadow-md">
                    <AvatarFallbackText>{formData.firstName[0] + formData.lastName[0]}</AvatarFallbackText>
                    <AvatarImage source={{ uri: formData.avatar }} />
                  </Avatar>
                  <TouchableOpacity onPress={pickImage} className="absolute bottom-0 right-0 bg-primary-500 rounded-full p-2 shadow-md border-2 border-white" style={{ elevation: 3 }}>
                    <Feather name="camera" size={18} color="#FFFFFF" />
                  </TouchableOpacity>
                </Box>
                <Text className="text-gray-500 mt-2">Appuyez pour changer la photo</Text>
              </VStack>

              {/* Formulaire */}
              <Box className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <VStack space="md">
                  {/* Prénom */}
                  <VStack space="xs">
                    <Text size="sm" className="text-gray-600 font-medium ml-1">
                      Prénom
                    </Text>
                    <Input size="md" variant="rounded" className={modified.firstName
? "border-blue-400"
: ""}>
                      <InputField placeholder="Prénom" value={formData.firstName} onChangeText={(text) => handleChange("firstName", text)} />
                    </Input>
                  </VStack>

                  {/* Nom */}
                  <VStack space="xs">
                    <Text size="sm" className="text-gray-600 font-medium ml-1">
                      Nom
                    </Text>
                    <Input size="md" variant="rounded" className={modified.lastName
? "border-blue-400"
: ""}>
                      <InputField placeholder="Nom" value={formData.lastName} onChangeText={(text) => handleChange("lastName", text)} />
                    </Input>
                  </VStack>

                  {/* Email */}
                  <VStack space="xs">
                    <Text size="sm" className="text-gray-600 font-medium ml-1">
                      Email
                    </Text>
                    <Input size="md" variant="rounded" className={modified.email
? "border-blue-400"
: ""}>
                      <InputField placeholder="Email" value={formData.email} onChangeText={(text) => handleChange("email", text)} keyboardType="email-address" />
                    </Input>
                  </VStack>

                  {/* Téléphone */}
                  <VStack space="xs">
                    <Text size="sm" className="text-gray-600 font-medium ml-1">
                      Téléphone
                    </Text>
                    <Input size="md" variant="rounded" className={modified.phone
? "border-blue-400"
: ""}>
                      <InputField placeholder="Téléphone" value={formData.phone} onChangeText={(text) => handleChange("phone", text)} keyboardType="phone-pad" />
                    </Input>
                  </VStack>
                </VStack>
              </Box>

              {/* Sécurité et mot de passe */}
              <Box className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <VStack space="md">
                  <Text className="text-gray-800 font-semibold">Sécurité</Text>

                  <TouchableOpacity>
                    <HStack className="justify-between py-3" space="md">
                      <HStack space="md">
                        <Box className="bg-gray-50 rounded-full flex items-center justify-center w-9 h-9" style={{ alignItems: "center", justifyContent: "center" }}>
                          <Feather name="lock" size={16} color="#4B5563" style={{ textAlign: "center", alignSelf: "center" }} />
                        </Box>
                        <VStack>
                          <Text className="text-gray-800">Modifier le mot de passe</Text>
                          <Text size="xs" className="text-gray-500">
                            Dernier changement il y a 3 mois
                          </Text>
                        </VStack>
                      </HStack>
                      <Feather name="chevron-right" size={16} color="#9CA3AF" />
                    </HStack>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <HStack className="justify-between py-3" space="md">
                      <HStack space="md">
                        <Box className="bg-gray-50 rounded-full flex items-center justify-center w-9 h-9" style={{ alignItems: "center", justifyContent: "center" }}>
                          <Feather name="shield" size={16} color="#4B5563" style={{ textAlign: "center", alignSelf: "center" }} />
                        </Box>
                        <VStack>
                          <Text className="text-gray-800">Authentification à deux facteurs</Text>
                          <Text size="xs" className="text-gray-500">
                            Améliorer la sécurité de votre compte
                          </Text>
                        </VStack>
                      </HStack>
                      <Feather name="chevron-right" size={16} color="#9CA3AF" />
                    </HStack>
                  </TouchableOpacity>
                </VStack>
              </Box>

              {/* Actions sur le compte */}
              <Box className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <VStack space="md">
                  <Text className="text-gray-800 font-semibold">Actions sur le compte</Text>

                  <TouchableOpacity>
                    <HStack className="justify-between py-3" space="md">
                      <HStack space="md">
                        <Box className="bg-red-50 rounded-full flex items-center justify-center w-9 h-9" style={{ alignItems: "center", justifyContent: "center" }}>
                          <Feather name="trash-2" size={16} color="#EF4444" style={{ textAlign: "center", alignSelf: "center" }} />
                        </Box>
                        <VStack>
                          <Text className="text-red-500">Supprimer le compte</Text>
                          <Text size="xs" className="text-gray-500">
                            Effacer toutes vos données
                          </Text>
                        </VStack>
                      </HStack>
                      <Feather name="chevron-right" size={16} color="#9CA3AF" />
                    </HStack>
                  </TouchableOpacity>
                </VStack>
              </Box>

              {/* Bouton de sauvegarde */}
              <Button size="lg" variant="solid" className="mt-4 shadow-sm" onPress={handleSave}>
                <Text className="text-white font-medium">Enregistrer les modifications</Text>
              </Button>
            </VStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default PersonalInfoScreen;
