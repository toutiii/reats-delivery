import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { StackNavigation } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { Pressable, View } from "react-native";

const DocumentsScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  return (
    <ThemedView className="flex-1">
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

      <View className="px-6 pt-6">
        <Heading className="mb-4">Pending Documents</Heading>

        <VStack space="xl">
          <DocumentMenuItem title="Personal Documents" />

          <DocumentMenuItem title="Vehicle Details" />

          <DocumentMenuItem title="Bank Account Details" />

          <DocumentMenuItem title="Emergency Details" />
        </VStack>
      </View>
      <View className="px-6 pt-6">
        <Heading className="mb-4">Completed Documents</Heading>

        <VStack space="xl">
          <DocumentMenuItem title="Personal Information" completed={true} />
        </VStack>
      </View>

      <Box className="px-6 mt-12">
        <Button size="xl" onPress={() => navigation.navigate("InformationVerificationScreen")}>
          <ButtonText className="text-lg font-medium">Submit</ButtonText>
        </Button>
      </Box>
    </ThemedView>
  );
};

/**
 * Document Menu Item component
 * Reusable component for each document type
 * @param {Object} props - Component props
 * @param {string} props.title - Menu item title
 * @param {boolean} props.completed - Whether document is completed
 */

type DocumentMenuItemProps = {
  title: string;
  completed?: boolean;
};
const DocumentMenuItem: FC<DocumentMenuItemProps> = ({ title, completed = false }) => {
  const navigation = useNavigation<StackNavigation>();
  return (
    <Pressable onPress={() => navigation.push("PersonalDocumentsScreen")}>
      {({ pressed }) => (
        <Box
          className={`bg-white rounded-xl p-4 shadow-sm border border-gray-100
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
          <HStack className="items-center justify-between">
            <HStack className="items-center space-x-3">
              {completed && <Feather name="check-circle" size={24} className="mr-3" color={"#22c55e"} />}
              <Text className="text-gray-800 text-lg font-medium">{title}</Text>
            </HStack>

            <Feather name="chevron-right" size={24} color="#9ca3af" />
          </HStack>
        </Box>
      )}
    </Pressable>
  );
};

export default DocumentsScreen;
