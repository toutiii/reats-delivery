import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Checkbox, CheckboxIcon, CheckboxIndicator } from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import Feather from "@expo/vector-icons/Feather";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import React, { useEffect } from "react";
import { Alert, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

// Types pour les zones de livraison
type ZoneStatus = "active" | "pending" | "inactive";

type DeliveryZone = {
  id: string;
  name: string;
  postalCode: string;
  status: ZoneStatus;
  selected: boolean;
  requestDate?: Date;
  approvalDate?: Date;
};

const DeliveryZoneScreen = () => {
  // État pour les zones disponibles et sélectionnées
  const [zones, setZones] = React.useState<DeliveryZone[]>([
    {
      id: "zone1",
      name: "Paris (Centre)",
      postalCode: "75001-75004",
      status: "active",
      selected: true,
      approvalDate: new Date(2023, 5, 15),
    },
    {
      id: "zone2",
      name: "Paris (Ouest)",
      postalCode: "75016, 75017",
      status: "inactive",
      selected: true,
      approvalDate: new Date(2023, 6, 20),
    },
    {
      id: "zone3",
      name: "Paris (Nord)",
      postalCode: "75018, 75019",
      status: "pending",
      selected: true,
      requestDate: new Date(),
    },
    {
      id: "zone4",
      name: "Paris (Sud)",
      postalCode: "75013, 75014",
      status: "inactive",
      selected: false,
    },
    {
      id: "zone5",
      name: "Boulogne-Billancourt",
      postalCode: "92100",
      status: "inactive",
      selected: false,
    },
    {
      id: "zone6",
      name: "Saint-Denis",
      postalCode: "93200",
      status: "inactive",
      selected: false,
    },
    {
      id: "zone7",
      name: "Versailles",
      postalCode: "78000",
      status: "inactive",
      selected: false,
    },
  ]);

  const [hasChanges, setHasChanges] = React.useState(false);
  const [lastRequestDate, setLastRequestDate] = React.useState<Date | null>(null);

  // Vérifier s'il y a une demande en attente
  useEffect(() => {
    const pendingZone = zones.find((zone) => zone.status === "pending");
    if (pendingZone && pendingZone.requestDate) {
      setLastRequestDate(pendingZone.requestDate);
    }
  }, []);

  // Pour sélectionner une nouvelle zone de livraison
  const toggleZone = (id: string) => {
    // Ne permet pas de désélectionner une zone active ou en attente
    const zoneToToggle = zones.find((z) => z.id === id);
    if (zoneToToggle?.status === "active" || zoneToToggle?.status === "pending") {
      Alert.alert("Zone déjà activée", "Cette zone est déjà active ou en attente de validation.", [{ text: "OK" }]);
      return;
    }

    // Si on clique sur une zone déjà sélectionnée, on ne fait rien
    if (zoneToToggle?.selected) {
      return;
    }

    // Désélectionner toutes les zones inactives et sélectionner uniquement la nouvelle
    const updatedZones = zones.map((zone) => {
      if (zone.status === "inactive") {
        return { ...zone, selected: zone.id === id };
      }
      return zone;
    });
    setZones(updatedZones);
    setHasChanges(true);
  };

  // Soumettre une demande de modification des zones
  const submitZoneRequest = () => {
    // Vérifier s'il y a une demande en attente
    const hasPending = zones.some((zone) => zone.status === "pending");
    if (hasPending) {
      Alert.alert("Demande déjà en cours", "Vous avez déjà une demande de modification en attente. Veuillez attendre sa validation avant d'en soumettre une nouvelle.", [{ text: "OK" }]);
      return;
    }

    // Vérifier le délai minimum entre les demandes (30 jours)
    const now = new Date();
    if (lastRequestDate) {
      const daysSinceLastRequest = Math.floor((now.getTime() - lastRequestDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysSinceLastRequest < 30) {
        Alert.alert("Délai non respecté", `Vous devez attendre 30 jours entre chaque demande de modification. Jours restants: ${30 - daysSinceLastRequest}.`, [{ text: "OK" }]);
        return;
      }
    }

    // Confirmer avant de soumettre
    Alert.alert("Soumettre la demande", "Êtes-vous sûr de vouloir soumettre cette demande de modification de vos zones de livraison? Cette action nécessitera une validation par l'administration.", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Confirmer",
        onPress: () => {
          const updatedZones = zones.map((zone) => {
            if (zone.selected && zone.status === "inactive") {
              return {
                ...zone,
                status: "pending" as ZoneStatus,
                requestDate: new Date(),
              };
            }
            return zone;
          });

          setZones(updatedZones);
          setHasChanges(false);
          setLastRequestDate(new Date());

          Alert.alert("Demande soumise", "Votre demande a été soumise et est en attente de validation par l'administration. Vous recevrez une notification dès qu'elle sera traitée.", [{ text: "OK" }]);
        },
      },
    ]);
  };

  // Afficher les détails d'une zone
  const showZoneDetails = (zone: DeliveryZone) => {
    let statusMessage = "";
    let dateInfo = "";

    switch (zone.status) {
      case "active":
        statusMessage = "Zone active - Vous êtes autorisé à livrer dans cette zone";
        dateInfo = zone.approvalDate
? `Activée le ${zone.approvalDate.toLocaleDateString()}`
: "";
        break;
      case "pending":
        statusMessage = "Demande en attente de validation par l'administration";
        dateInfo = zone.requestDate
? `Demande soumise le ${zone.requestDate.toLocaleDateString()}`
: "";
        break;
      case "inactive":
        statusMessage = "Zone inactive - Sélectionnez cette zone et soumettez votre demande pour y être autorisé";
        break;
    }

    Alert.alert(`Zone: ${zone.name}`, `${statusMessage}\n\nCodes postaux: ${zone.postalCode}\n${dateInfo}`, [{ text: "OK" }]);
  };

  // Regroupement des zones par statut pour l'affichage
  const activeZones = zones.filter((zone) => zone.status === "active");
  const pendingZones = zones.filter((zone) => zone.status === "pending");
  const inactiveZones = zones.filter((zone) => zone.status === "inactive");

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: isWeb
? 16
: 100,
          }}
          className="flex-1"
        >
          <VStack space="xl" className="px-5 py-6">
            {/* En-tête */}
            <Heading size="xl" className="text-gray-800 mb-2">
              Zones de livraison
            </Heading>

            <Text className="text-gray-600 mb-2">Sélectionnez les zones où vous souhaitez effectuer des livraisons. Les modifications nécessitent une validation administrative.</Text>

            {/* Informations importantes */}
            <Box className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <HStack space="sm" className="items-start max-w-full">
                <Box className="bg-blue-100 rounded-full p-2 mt-1" style={{ alignItems: "center", justifyContent: "center" }}>
                  <Feather name="info" size={16} color="#3B82F6" style={{ textAlign: "center", alignSelf: "center" }} />
                </Box>
                <VStack space="xs" className="flex-1">
                  <Text className="font-medium text-blue-800">Information importante</Text>
                  <Text className="text-blue-700 text-sm">Vous ne pouvez soumettre une demande de modification qu'une fois tous les 30 jours. Les zones actives ne peuvent pas être désélectionnées sans validation administrative.</Text>
                </VStack>
              </HStack>
            </Box>

            {/* Zones actives */}
            {activeZones.length > 0 && (
              <VStack space="sm">
                <Heading size="md" className="text-gray-700">
                  Zones actives
                </Heading>
                <Box className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <VStack>
                    {activeZones.map((zone, index) => (
                      <React.Fragment key={zone.id}>
                        <Box className="p-4">
                          <HStack className="justify-between items-center">
                            <HStack space="sm" className="items-center flex-1">
                              <Box className="bg-green-100 rounded-full p-2" style={{ alignItems: "center", justifyContent: "center" }}>
                                <Feather name="check-circle" size={18} color="#10B981" />
                              </Box>
                              <VStack className="flex-1">
                                <Text className="font-semibold text-gray-800">{zone.name}</Text>
                                <Text className="text-gray-500 text-xs">Code postal: {zone.postalCode}</Text>
                              </VStack>
                            </HStack>
                            <TouchableOpacity onPress={() => showZoneDetails(zone)}>
                              <Feather name="info" size={18} color="#3B82F6" />
                            </TouchableOpacity>
                          </HStack>
                        </Box>
                        {index < activeZones.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            )}

            {/* Zones en attente de validation */}
            {/* {pendingZones.length > 0 && (
              <VStack space="sm">
                <Heading size="md" className="text-gray-700">
                  Zones en attente de validation
                </Heading>
                <Box className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <VStack>
                    {pendingZones.map((zone, index) => (
                      <React.Fragment key={zone.id}>
                        <Box className="p-4">
                          <HStack className="justify-between items-center">
                            <HStack space="sm" className="items-center flex-1">
                              <Box className="bg-yellow-100 rounded-full p-2" style={{ alignItems: "center", justifyContent: "center" }}>
                                <Feather name="clock" size={18} color="#FBBF24" />
                              </Box>
                              <VStack className="flex-1">
                                <HStack className="items-center" space="sm">
                                  <Text className="font-semibold text-gray-800">{zone.name}</Text>
                                  <Badge variant="outline" className="border-yellow-400 rounded-full" size="sm">
                                    <Text className="text-xs text-yellow-600">En attente</Text>
                                  </Badge>
                                </HStack>
                                <Text className="text-gray-500 text-xs">Code postal: {zone.postalCode}</Text>
                              </VStack>
                            </HStack>
                            <TouchableOpacity onPress={() => showZoneDetails(zone)}>
                              <Feather name="info" size={18} color="#3B82F6" />
                            </TouchableOpacity>
                          </HStack>
                        </Box>
                        {index < pendingZones.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </VStack>
                </Box>
              </VStack>
            )} */}

            {/* Zones disponibles */}
            <VStack space="sm">
              <Heading size="md" className="text-gray-700">
                Choisir une ville de livraison
              </Heading>
              <Box className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <VStack>
                  {inactiveZones.map((zone, index) => (
                    <React.Fragment key={zone.id}>
                      <Box className="p-4">
                        <HStack className="justify-between items-center">
                          <TouchableOpacity className="flex-1" onPress={() => toggleZone(zone.id)}>
                            <HStack space="sm" className="items-center">
                              <Checkbox value="inactive" isChecked={zone.selected} onChange={() => toggleZone(zone.id)} accessibilityLabel={`Sélectionner ${zone.name}`}>
                                <CheckboxIndicator>
                                  <CheckboxIcon />
                                </CheckboxIndicator>
                              </Checkbox>
                              <VStack>
                                <Text className="font-semibold text-gray-800">{zone.name}</Text>
                                <Text className="text-gray-500 text-xs">Code postal: {zone.postalCode}</Text>
                              </VStack>
                            </HStack>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => showZoneDetails(zone)}>
                            <Feather name="info" size={18} color="#3B82F6" />
                          </TouchableOpacity>
                        </HStack>
                      </Box>
                      {index < inactiveZones.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </VStack>
              </Box>
            </VStack>

            {/* Bouton de soumission */}
            <Button size="lg" variant="solid" className="mt-4" isDisabled={!hasChanges || pendingZones.length > 0} onPress={submitZoneRequest}>
              <ButtonText className="text-white font-medium">Demander l'accès à cette ville</ButtonText>
            </Button>

            {/* {pendingZones.length > 0 && <Text className="text-yellow-600 text-center text-sm mt-2">Vous avez déjà une demande en attente de validation</Text>} */}

            {/* Légende */}
            <Box className="bg-gray-50 rounded-xl p-4 border border-gray-100 mt-4">
              <VStack space="md">
                <Text className="font-medium text-gray-700">Légende des statuts</Text>
                <VStack space="sm">
                  <HStack space="sm" className="items-center">
                    <Box className="bg-green-100 rounded-full p-1.5" style={{ alignItems: "center", justifyContent: "center" }}>
                      <Feather name="check-circle" size={14} color="#10B981" />
                    </Box>
                    <Text className="text-gray-700">Zone active - Vous pouvez livrer dans cette zone</Text>
                  </HStack>
                  {/* <HStack space="sm" className="items-center">
                    <Box className="bg-yellow-100 rounded-full p-1.5" style={{ alignItems: "center", justifyContent: "center" }}>
                      <Feather name="clock" size={14} color="#FBBF24" />
                    </Box>
                    <Text className="text-gray-700">Zone en attente - Validation en cours</Text>
                  </HStack> */}
                  <HStack space="sm" className="items-center">
                    <Box className="bg-gray-100 rounded-full p-1.5" style={{ alignItems: "center", justifyContent: "center" }}>
                      <Feather name="circle" size={14} color="#6B7280" />
                    </Box>
                    <Text className="text-gray-700 flex-1">Zone inactive - Sélectionnez pour demander l'accès à cette ville</Text>
                  </HStack>
                </VStack>
              </VStack>
            </Box>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default DeliveryZoneScreen;
