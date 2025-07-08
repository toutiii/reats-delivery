import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { colorPrimary } from "@/constants/colors";
import Feather from "@expo/vector-icons/Feather";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import React from "react";
import { Alert, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

// Type pour les méthodes de paiement
type PaymentMethod = {
  id: string;
  type: "card" | "paypal" | "apple" | "google";
  isDefault: boolean;
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  email?: string;
  icon: string;
  backgroundColor: string;
  textColor: string;
};

const PaymentMethodsScreen = () => {
  // État pour les méthodes de paiement
  const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethod[]>([
    {
      id: "card1",
      type: "card",
      isDefault: true,
      cardNumber: "•••• •••• •••• 4242",
      cardHolder: "RONALD RICHARDS",
      expiryDate: "12/25",
      icon: "credit-card",
      backgroundColor: "bg-primary-500",
      textColor: "text-white",
    },
    {
      id: "paypal1",
      type: "paypal",
      isDefault: false,
      email: "ronald.richards@example.com",
      icon: "dollar-sign",
      backgroundColor: "bg-blue-500",
      textColor: "text-white",
    },
    {
      id: "apple1",
      type: "apple",
      isDefault: false,
      email: "ronald.richards@icloud.com",
      icon: "smartphone",
      backgroundColor: "bg-gray-800",
      textColor: "text-white",
    },
  ]);

  // Pour définir une méthode comme défaut
  const setDefaultPaymentMethod = (id: string) => {
    const updatedMethods = paymentMethods.map((method) => ({
      ...method,
      isDefault: method.id === id,
    }));
    setPaymentMethods(updatedMethods);
  };

  // Pour supprimer une méthode de paiement
  const deletePaymentMethod = (id: string) => {
    Alert.alert("Supprimer la méthode de paiement", "Êtes-vous sûr de vouloir supprimer cette méthode de paiement ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          // Si la méthode supprimée était celle par défaut et qu'il y en a d'autres,
          // définir la première comme défaut
          const isDefault = paymentMethods.find((m) => m.id === id)?.isDefault;
          const filtered = paymentMethods.filter((method) => method.id !== id);

          if (isDefault && filtered.length > 0) {
            filtered[0].isDefault = true;
          }

          setPaymentMethods(filtered);
        },
      },
    ]);
  };

  // Pour ajouter une nouvelle carte (juste un placeholder pour l'instant)
  const addNewCard = () => {
    // Simule l'ajout d'une nouvelle carte
    Alert.alert("Ajouter une carte", "Fonctionnalité à venir", [{ text: "OK" }]);
  };

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: isWeb
? 32
: 100,
          }}
          className="flex-1"
        >
          <VStack space="xl" className="px-5 py-6">
            {/* En-tête */}
            <Heading size="xl" className="text-gray-800 mb-2">
              Méthodes de paiement
            </Heading>

            <Text className="text-gray-600 mb-2">Gérez vos méthodes de paiement et définissez votre option par défaut</Text>

            {/* Liste des méthodes de paiement */}
            <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-4">
              <VStack>
                {paymentMethods.map((method, index) => (
                  <React.Fragment key={method.id}>
                    <Box className="p-4">
                      <VStack space="md">
                        {/* En-tête de la carte avec le logo */}
                        <HStack className="justify-between items-center">
                          <HStack space="sm" className="items-center">
                            <Box className={`${method.backgroundColor} rounded-lg p-2 w-10 h-10 items-center justify-center`} style={{ alignItems: "center", justifyContent: "center" }}>
                              <Feather name={method.icon as keyof typeof Feather.glyphMap} size={18} color="#FFFFFF" style={{ textAlign: "center", alignSelf: "center" }} />
                            </Box>
                            <VStack>
                              <Text className="font-semibold text-gray-800 capitalize">{method.type === "card"
? "Carte bancaire"
: method.type === "paypal"
? "PayPal"
: method.type === "apple"
? "Apple Pay"
: "Google Pay"}</Text>
                              {method.isDefault && (
                                <Text size="xs" className="text-blue-500 font-medium">
                                  Par défaut
                                </Text>
                              )}
                            </VStack>
                          </HStack>
                          <Box>
                            <TouchableOpacity onPress={() => deletePaymentMethod(method.id)}>
                              <Feather name="trash-2" size={18} color="#EF4444" />
                            </TouchableOpacity>
                          </Box>
                        </HStack>

                        {/* Détails de la méthode de paiement */}
                        {method.type === "card"
? (
                          <Box className={`${method.backgroundColor} rounded-xl p-4`}>
                            <VStack space="sm">
                              <Text className={`${method.textColor} text-lg font-medium`}>{method.cardNumber}</Text>
                              <HStack className="justify-between">
                                <Text className={`${method.textColor} text-xs`}>TITULAIRE: {method.cardHolder}</Text>
                                <Text className={`${method.textColor} text-xs`}>EXP: {method.expiryDate}</Text>
                              </HStack>
                            </VStack>
                          </Box>
                        )
: (
                          <Box className="bg-gray-50 rounded-xl p-4">
                            <Text className="text-gray-700">Email: {method.email}</Text>
                          </Box>
                        )}

                        {/* Option pour définir comme défaut */}
                        {!method.isDefault && (
                          <Button size="sm" variant="outline" className="border-primary-400 self-start" onPress={() => setDefaultPaymentMethod(method.id)}>
                            <Text className="text-primary-500 font-medium">Définir par défaut</Text>
                          </Button>
                        )}
                      </VStack>
                    </Box>
                    {index < paymentMethods.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </VStack>
            </Box>

            {/* Bouton pour ajouter une méthode de paiement */}
            <Button size="lg" variant="outline" className="border-primary-400 mb-2" onPress={addNewCard}>
              <HStack space="sm" className="items-center">
                <Feather name="plus" size={18} color={colorPrimary} />
                <Text className="text-primary-500 font-medium">Ajouter une méthode de paiement</Text>
              </HStack>
            </Button>

            {/* Options de paiement */}
            <Box className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <VStack space="lg">
                <Text className="text-gray-800 font-semibold">Options de paiement</Text>

                <HStack className="justify-between items-center">
                  <VStack>
                    <Text className="text-gray-800">Enregistrer les nouvelles cartes</Text>
                    <Text size="xs" className="text-gray-500">
                      Enregistrer automatiquement les nouvelles cartes
                    </Text>
                  </VStack>
                  <Switch defaultValue={true} size="sm" />
                </HStack>
              </VStack>
            </Box>

            {/* Information de sécurité */}
            <HStack space="sm" className="items-center mt-4 px-2">
              <Feather name="shield" size={16} color="#9CA3AF" />
              <Text size="xs" className="text-gray-400">
                Vos informations de paiement sont sécurisées et chiffrées
              </Text>
            </HStack>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default PaymentMethodsScreen;
