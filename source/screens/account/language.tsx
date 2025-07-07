import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import Feather from "@expo/vector-icons/Feather";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import React from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const LanguageScreen = () => {
  const languages: Language[] = [
    { code: "fr", name: "Français", nativeName: "Français", flag: "🇫🇷" },
    { code: "en", name: "Anglais", nativeName: "English", flag: "🇬🇧" },
  ];

  const [selectedLanguage, setSelectedLanguage] = React.useState("fr");

  const changeLanguage = (languageCode: string) => {
    setSelectedLanguage(languageCode);
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
              Langue
            </Heading>

            <Text className="text-gray-600 mb-2">Sélectionnez votre langue préférée pour l'application</Text>

            {/* Liste des langues */}
            <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 mb-4">
              <VStack>
                {languages.map((language, index) => (
                  <React.Fragment key={language.code}>
                    <TouchableOpacity onPress={() => changeLanguage(language.code)} className="active:bg-gray-50">
                      <Box className="p-4">
                        <HStack className="justify-between items-center">
                          <HStack space="md" className="items-center">
                            <Box className="w-8 h-8 items-center justify-center">
                              <Text style={{ fontSize: 24 }}>{language.flag}</Text>
                            </Box>
                            <VStack>
                              <Text className="font-medium text-gray-800">{language.name}</Text>
                              <Text className="text-gray-500 text-sm">{language.nativeName}</Text>
                            </VStack>
                          </HStack>
                          {selectedLanguage === language.code && (
                            <Box className="bg-primary-500 rounded-full p-1">
                              <Feather name="check" size={16} color="#FFFFFF" />
                            </Box>
                          )}
                        </HStack>
                      </Box>
                    </TouchableOpacity>
                    {index < languages.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </VStack>
            </Box>

            {/* Notes sur la langue */}
            <Box className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <VStack space="sm">
                <HStack space="sm" className="items-start">
                  <Box className="bg-gray-200 rounded-full p-2 mt-1" style={{ alignItems: "center", justifyContent: "center" }}>
                    <Feather name="info" size={16} color="#4B5563" style={{ textAlign: "center", alignSelf: "center" }} />
                  </Box>
                  <VStack space="xs">
                    <Text className="font-medium text-gray-800">À propos des langues</Text>
                    <Text className="text-gray-600 text-sm">La modification de la langue affecte tous les textes de l'application. Certains contenus générés par les utilisateurs peuvent rester dans leur langue d'origine.</Text>
                  </VStack>
                </HStack>
              </VStack>
            </Box>

            {/* Bouton pour appliquer les changements */}
            <Button size="lg" variant="solid" className="mt-4 shadow-sm" onPress={() => {}}>
              <Text className="text-white font-medium">Appliquer les changements</Text>
            </Button>

            {/* Détection automatique */}
            <Button size="lg" variant="outline" className="border-gray-300 mt-2" onPress={() => {}}>
              <HStack space="sm" className="items-center">
                <Feather name="smartphone" size={18} color="#4B5563" />
                <Text className="text-gray-700">Utiliser la langue de l'appareil</Text>
              </HStack>
            </Button>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default LanguageScreen;
