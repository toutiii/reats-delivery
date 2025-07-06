import { ThemedView } from "@/components/themed-view";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { StackNavigation } from "@/types/navigation";
import Feather from "@expo/vector-icons/Feather";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, SafeAreaView, ScrollView, Switch } from "react-native";

// Définition correcte du type pour les éléments de menu
type MenuItem = {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  description?: string;
  action?: () => void;
  rightElement?: React.ReactNode;
  showDivider?: boolean;
};

// Définition du type pour les sections
type MenuSection = {
  title: string;
  description?: string;
  items: MenuItem[];
};

// Composant pour un élément de menu
const MenuItemComponent: React.FC<MenuItem> = ({ icon, label, description, action, rightElement, showDivider = true }) => {
  // Effet de pression
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <>
      <Pressable onPress={action} onPressIn={() => setIsPressed(true)} onPressOut={() => setIsPressed(false)} className={`py-3.5 px-1 ${isPressed
? "opacity-80"
: "opacity-100"}`}>
        <HStack space="md" className="items-center justify-between">
          <HStack space="md" className="items-center flex-1">
            <Box className="bg-gray-50 rounded-full flex items-center justify-center w-10 h-10 shadow-sm" style={{ alignItems: "center", justifyContent: "center" }}>
              <Feather name={icon} color="#FF5A5F" size={20} style={{ textAlign: "center", alignSelf: "center" }} />
            </Box>
            <VStack space="xs" className="flex-1">
              <Text size="md" className="font-medium text-gray-800">
                {label}
              </Text>
              {description && (
                <Text size="xs" className="text-gray-500 pr-4">
                  {description}
                </Text>
              )}
            </VStack>
          </HStack>
          {rightElement || <Feather name="chevron-right" color="#9CA3AF" size={16} style={{ alignSelf: "center" }} />}
        </HStack>
      </Pressable>
      {showDivider && <Divider className="my-0.5 opacity-70" />}
    </>
  );
};

// Composant pour une section de menu
const MenuSectionComponent: React.FC<{ section: MenuSection }> = ({ section }) => {
  return (
    <VStack space="sm" className="mb-7">
      <VStack className="px-1">
        <Text size="sm" className="text-gray-500 font-semibold uppercase tracking-wider">
          {section.title}
        </Text>
        {section.description && (
          <Text size="2xs" className="text-gray-400 mt-0.5">
            {section.description}
          </Text>
        )}
      </VStack>
      <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <VStack className="px-3">
          {section.items.map((item, index) => (
            <MenuItemComponent key={`${section.title}-${index}`} {...item} showDivider={index < section.items.length - 1} />
          ))}
        </VStack>
      </Box>
    </VStack>
  );
};

// Switch personnalisé avec animation et style cohérent
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledSwitch: React.FC<{ value: boolean; onValueChange: (value: boolean) => void }> = ({ value: isEnabled, onValueChange }) => {
  return <Switch value={isEnabled} onValueChange={onValueChange} trackColor={{ false: "#E5E7EB", true: "#FFBFC1" }} thumbColor={isEnabled
? "#FF5A5F"
: "#FFFFFF"} ios_backgroundColor="#E5E7EB" style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }} />;
};

const AccountScreen = () => {
  // États pour les toggles
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [allowNotifications, setAllowNotifications] = React.useState(true);
  const [locationServices, setLocationServices] = React.useState(true);
  const navigation = useNavigation<StackNavigation>();

  // Données de l'utilisateur
  const user = {
    name: "Ronald Richards",
    phone: "+111 1234 56 89",
    email: "ronaldrichards@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  };

  // Configuration des sections de menu
  const menuSections: MenuSection[] = [
    {
      title: "Compte",
      items: [
        {
          icon: "user",
          label: "Informations personnelles",
          description: "Gérez vos données personnelles",
          action: () => navigation.navigate("PersonalInfoScreen"),
        },
        {
          icon: "credit-card",
          label: "Méthodes de paiement",
          description: "Vos cartes et options de paiement",
          action: () => navigation.navigate("PaymentMethodsScreen"),
        },
        {
          icon: "map-pin",
          label: "Ville de livraison",
          description: "Gérez vos zones de livraison",
          action: () => navigation.navigate("DeliveryZoneScreen"),
        },
      ],
    },
    {
      title: "Préférences",
      description: "Personnalisez votre expérience",
      items: [
        {
          icon: "bell",
          label: "Notifications",
          description: "Gérez les alertes de l'application",
          rightElement: <StyledSwitch value={allowNotifications} onValueChange={setAllowNotifications} />,
        },
        {
          icon: "moon",
          label: "Mode sombre",
          description: "Changez l'apparence de l'application",
          rightElement: <StyledSwitch value={isDarkMode} onValueChange={setIsDarkMode} />,
        },
        {
          icon: "map",
          label: "Services de localisation",
          description: "Permet d'améliorer votre expérience",
          rightElement: <StyledSwitch value={locationServices} onValueChange={setLocationServices} />,
        },
        {
          icon: "globe",
          label: "Langue",
          description: "Français (FR)",
          action: () => console.log("Language"),
        },
      ],
    },
    {
      title: "Support & Légal",
      items: [
        {
          icon: "help-circle",
          label: "Aide & Support",
          description: "Questions fréquentes et assistance",
          action: () => console.log("Help"),
        },
        {
          icon: "file-text",
          label: "Conditions d'utilisation",
          action: () => console.log("Terms"),
        },
        {
          icon: "shield",
          label: "Politique de confidentialité",
          action: () => console.log("Privacy"),
        },
      ],
    },
  ];

  // Gestion de la déconnexion
  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      {
        text: "Annuler",
        style: "cancel",
      },
      {
        text: "Déconnexion",
        onPress: () => console.log("User logged out"),
        style: "destructive",
      },
    ]);
  };

  // Affichage du code parrainage
  const referralCode = "REATS25";

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="flex-1"
          contentContainerStyle={{
            paddingBottom: isWeb
? 32
: 20,
          }}
        >
          <VStack space="xl" className="px-5 pt-6 pb-4">
            {/* En-tête avec profil utilisateur */}
            <HStack space="md" className="items-center mb-5">
              <Avatar size="xl" className="shadow-sm border border-gray-100">
                <AvatarFallbackText>
                  {user.name
                    .split("d")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallbackText>
                <AvatarImage source={{ uri: user.avatar }} className="opacity-95" />
              </Avatar>
              <VStack space="xs">
                <Heading size="lg" className="font-bold text-gray-900 tracking-tight">
                  {user.name}
                </Heading>
                <Text size="sm" className="text-gray-500 font-medium">
                  {user.phone}
                </Text>
                <Text size="sm" className="text-gray-500">
                  {user.email}
                </Text>
              </VStack>
            </HStack>

            {/* Banner de parrainage avec effet de profondeur */}
            <Box className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl overflow-hidden border border-blue-100 shadow-sm mb-3">
              <Box className="absolute right-0 top-0 h-full w-28 opacity-10">
                <Box className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-blue-200" />
                <Box className="absolute right-3 bottom-3 h-12 w-12 rounded-full bg-blue-200" />
              </Box>
              <HStack className="justify-between items-center p-4">
                <HStack space="md" className="items-center flex-1">
                  <Box className="bg-blue-100 rounded-full flex items-center justify-center w-11 h-11 shadow-inner border border-blue-200" style={{ alignItems: "center", justifyContent: "center" }}>
                    <Feather name="gift" color="#3B82F6" size={20} style={{ textAlign: "center", alignSelf: "center" }} />
                  </Box>
                  <VStack>
                    <Text className="font-semibold text-gray-900">Parrainez un ami</Text>
                    <HStack space="xs" className="items-center">
                      <Text className="text-sm text-gray-600">Code:</Text>
                      <Text className="text-sm font-bold text-blue-700 tracking-wide">{referralCode}</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Button variant="solid" size="sm" className="bg-blue-600 shadow-sm" onPress={() => console.log("Referral code copied")}>
                  <Text className="text-white font-medium px-1">Copier</Text>
                </Button>
              </HStack>
            </Box>

            {/* Sections de menu */}
            {menuSections.map((section, index) => (
              <MenuSectionComponent key={`section-${index}`} section={section} />
            ))}

            {/* Bouton de déconnexion */}
            <Button size="lg" variant="outline" action="negative" className="mt-1.5 border-red-100 shadow-sm" onPress={handleLogout}>
              <HStack space="sm" className="items-center">
                <Feather name="log-out" color="#FF5A5F" size={16} style={{ textAlign: "center", alignSelf: "center" }} />
                <Text className="text-red-500 font-medium">Déconnexion</Text>
              </HStack>
            </Button>

            {/* Version de l'application */}
            <Text className="text-center text-gray-400 text-xs mt-3">Version 1.0.3</Text>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default AccountScreen;
