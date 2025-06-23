import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { StackNavigation } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { SafeAreaView } from "react-native";

const PersonalDocumentsScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const documents = [
    { id: "aadhar", title: "Aadhar Card" },
    { id: "pan", title: "PAN Card" },
    { id: "license", title: "Driving License" },
  ];

  return (
    <SafeAreaView className="flex-1">
      <ThemedView className="flex-1 pt-4">
        <Box className="px-6 mb-6 mt-2">
          <Heading className="mt-4" size="2xl">
            Personal documents
          </Heading>
          <Text className="text-gray-600 text-base mt-1">
            Upload focused photos of below documents{"\n"}
            for faster verification
          </Text>
        </Box>

        {/* Documents List */}
        <VStack space="md" className="mb-6 px-6">
          {documents.map((doc) => (
            <DocumentItem key={doc.id} title={doc.title} onPress={() => navigation.navigate("MainDrawerNavigator")} />
          ))}
        </VStack>
      </ThemedView>
    </SafeAreaView>
  );
};

/**
 * Document Item component
 * Renders an individual document selection item
 *
 * @param {Object} props Component props
 * @param {string} props.title Document title
 * @param {Function} props.onPress Function called when item is pressed
 */

type DocumentItemProps = {
  title: string;
  onPress: () => void;
};
const DocumentItem: FC<DocumentItemProps> = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`Upload ${title}`} accessibilityHint={`Navigate to ${title} upload screen`}>
      {({ pressed }) => (
        <Box
          className={`border border-gray-200 rounded-xl py-4 px-4
            ${pressed
          ? "bg-gray-50"
          : "bg-white"}`}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: pressed
              ? 0
              : 1,
          }}
        >
          <Box className="flex-row items-center justify-between">
            <Text className="text-gray-800 text-lg font-normal">{title}</Text>
            <Feather name="chevron-right" size={24} color="#9ca3af" />
          </Box>
        </Box>
      )}
    </Pressable>
  );
};

export default PersonalDocumentsScreen;
