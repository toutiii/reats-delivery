import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { StackNavigation } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";

/**
 * Type de statut pour un document
 */
type DocumentStatus = "approved" | "pending" | "incomplete";

/**
 * Props pour le composant DocumentListItem
 */
type DocumentListItemProps = {
  title: string;
  status: DocumentStatus;
  onPress?: () => void;
};

const DocumentListItem: FC<DocumentListItemProps> = ({ title, status, onPress }) => {
  // Déterminer le statut à afficher et la couleur appropriée
  const getStatusDisplay = () => {
    switch (status) {
      case "approved":
        return {
          text: "Approved",
          color: "#22c55e", // vert
        };
      case "pending":
        return {
          text: "Verification Pending",
          color: "#f87171", // rouge
        };
      case "incomplete":
        return {
          text: "",
          color: "#9ca3af", // gris
        };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <Box
          className={`bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100
            ${pressed
? "opacity-90"
: "opacity-100"}`}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-800 text-lg font-medium">{title}</Text>
              {statusDisplay.text && <Text style={{ color: statusDisplay.color, marginTop: 4 }}>{statusDisplay.text}</Text>}
            </View>
            <Feather name="chevron-right" size={24} color="#9ca3af" />
          </View>
        </Box>
      )}
    </Pressable>
  );
};

const InformationVerificationScreen: FC = () => {
  const navigation = useNavigation<StackNavigation>();

  return (
    <ThemedView className="flex-1 bg-gray-50">
      {/* Header avec gradient */}
      <View className="w-full rounded-b-3xl overflow-hidden">
        <LinearGradient colors={["#FFAF70", "#FF5963"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
          <View className="px-6 pt-24 pb-12">
            <Heading className="text-white mb-2" size="2xl">
              Welcome to EatFit
            </Heading>
            <Text className="text-white text-base font-normal">
              Just a few steps to complete and then you{"\n"}
              can start earning with Us
            </Text>
          </View>
        </LinearGradient>
      </View>

      <ScrollView className="flex-1 pt-6">
        <VStack className="p-6" space="lg">
          {/* Documents List */}
          <DocumentListItem title="Personal Information" status="approved" onPress={() => navigation.navigate("PersonalDocumentsScreen")} />

          <DocumentListItem title="Personal Documents" status="pending" onPress={() => navigation.navigate("PersonalDocumentsScreen")} />

          <DocumentListItem title="Vehicle Details" status="approved" onPress={() => navigation.navigate("PersonalDocumentsScreen")} />

          <DocumentListItem title="Bank Account Details" status="approved" />

          <DocumentListItem title="Emergency Details" status="approved" />

          {/* Help Section */}
          <View className="items-center mt-8 mb-4">
            <Text>
              Need Help? <Text className="text-rose-500 font-medium">Contact Us</Text>
            </Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("MainDrawerNavigator")}>
            <Text>Dashboard</Text>
          </TouchableOpacity>
        </VStack>
      </ScrollView>
    </ThemedView>
  );
};

export default InformationVerificationScreen;
