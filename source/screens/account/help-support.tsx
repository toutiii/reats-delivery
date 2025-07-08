import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Linking, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

// Type pour les questions fréquentes
interface FAQ {
  id: string;
  question: string;
  answer: string;
  expanded: boolean;
}

// Type pour les catégories d'aide
interface HelpCategory {
  id: string;
  title: string;
  icon: keyof typeof Feather.glyphMap;
  description: string;
  color: string;
}

const HelpSupportScreen = () => {
  // État pour la recherche
  const [searchQuery, setSearchQuery] = React.useState("");

  // État pour les FAQs
  const [faqs, setFaqs] = React.useState<FAQ[]>([
    {
      id: "faq1",
      question: "Comment modifier ma commande ?",
      answer:
        "Vous pouvez modifier votre commande tant qu'elle n'a pas été acceptée par le restaurant. Pour ce faire, accédez à la section 'Commandes' et appuyez sur la commande que vous souhaitez modifier. Si le bouton 'Modifier' est visible, vous pouvez encore apporter des changements.",
      expanded: false,
    },
    {
      id: "faq2",
      question: "Combien de temps pour une livraison ?",
      answer:
        "Le temps de livraison dépend de plusieurs facteurs : la distance entre vous et le restaurant, le temps de préparation des plats, et la disponibilité des livreurs. En moyenne, comptez entre 30 et 45 minutes. Vous pouvez suivre en temps réel l'avancement de votre commande dans l'application.",
      expanded: false,
    },
    {
      id: "faq3",
      question: "Comment contacter mon livreur ?",
      answer: "Une fois votre commande acceptée et attribuée à un livreur, vous pourrez voir ses coordonnées dans l'écran de suivi de commande. Appuyez sur l'icône d'appel ou de message pour communiquer directement avec lui.",
      expanded: false,
    },
    {
      id: "faq4",
      question: "Je n'ai pas reçu ma commande",
      answer:
        "Si le statut de votre commande indique qu'elle a été livrée mais que vous ne l'avez pas reçue, essayez d'abord de contacter le livreur. Si vous n'obtenez pas de réponse, utilisez l'option 'Signaler un problème' dans les détails de la commande pour obtenir de l'aide.",
      expanded: false,
    },
    {
      id: "faq5",
      question: "Comment demander un remboursement ?",
      answer:
        "Pour demander un remboursement, accédez à votre historique de commandes, sélectionnez la commande concernée et appuyez sur 'Signaler un problème'. Suivez les instructions pour expliquer la raison de votre demande de remboursement. Notre équipe l'examinera sous 24 à 48 heures.",
      expanded: false,
    },
  ]);

  // Catégories d'aide
  const helpCategories: HelpCategory[] = [
    {
      id: "cat1",
      title: "Commandes",
      icon: "shopping-bag",
      description: "Problèmes avec vos commandes",
      color: "bg-blue-500",
    },
    {
      id: "cat2",
      title: "Compte",
      icon: "user",
      description: "Gérer votre compte",
      color: "bg-purple-500",
    },
    {
      id: "cat3",
      title: "Paiement",
      icon: "credit-card",
      description: "Questions de facturation",
      color: "bg-green-500",
    },
    {
      id: "cat4",
      title: "Livraison",
      icon: "truck",
      description: "Suivi et problèmes de livraison",
      color: "bg-orange-500",
    },
  ];

  // Pour gérer l'expansion des FAQs
  const toggleFaqExpanded = (id: string) => {
    setFaqs(faqs.map((faq) => (faq.id === id
? { ...faq, expanded: !faq.expanded }
: faq)));
  };

  // Pour filtrer les FAQs en fonction de la recherche
  const filteredFaqs = searchQuery.trim() === ""
? faqs
: faqs.filter((faq) => faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase()));

  // Pour contacter le support
  const contactSupport = (method: "email" | "phone" | "chat") => {
    switch (method) {
      case "email":
        Linking.openURL("mailto:support@reats-delivery.com");
        break;
      case "phone":
        Linking.openURL("tel:+33123456789");
        break;
      case "chat":
        // Simuler l'ouverture d'un chat
        console.log("Ouvrir le chat avec le support");
        break;
    }
  };

  return (
    <ThemedView>
      <SafeAreaView className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }} className="flex-1">
          <VStack space="xl" className="px-5 py-6">
            {/* En-tête */}
            <Heading size="xl" className="text-gray-800 mb-2">
              Aide & Support
            </Heading>

            <Text className="text-gray-600 mb-2">Comment pouvons-nous vous aider aujourd'hui ?</Text>

            {/* Barre de recherche */}
            <Box className="relative mb-3">
              <Input className="my-1" size={"lg"} variant="rounded">
                <InputField type="text" placeholder="Rechercher dans l'aide..." value={searchQuery} onChangeText={setSearchQuery} className="pr-10 bg-white shadow-sm" />
              </Input>

              <Box className="absolute right-3 top-0 bottom-0 justify-center flex">
                <Feather name="search" size={18} color="#9CA3AF" />
              </Box>
            </Box>

            {/* Catégories d'aide */}
            <VStack space="md">
              <Text className="text-gray-800 font-semibold text-lg">Catégories</Text>

              <HStack className="flex-wrap" space="sm">
                {helpCategories.map((category) => (
                  <TouchableOpacity key={category.id} className="w-[48%] mb-3">
                    <Box className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                      <HStack space="sm">
                        <Box className={`${category.color} rounded-lg p-2 w-10 h-10 items-center justify-center`} style={{ alignItems: "center", justifyContent: "center" }}>
                          <Feather name={category.icon} size={18} color="#FFFFFF" style={{ textAlign: "center", alignSelf: "center" }} />
                        </Box>
                        <VStack className="flex-1">
                          <Text className="font-semibold text-gray-800">{category.title}</Text>
                          <Text className="text-gray-500 text-xs">{category.description}</Text>
                        </VStack>
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                ))}
              </HStack>
            </VStack>

            {/* FAQ */}
            <VStack space="md">
              <Text className="text-gray-800 font-semibold text-lg">Questions fréquentes</Text>

              <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                {filteredFaqs.length > 0
? (
                  <VStack>
                    {filteredFaqs.map((faq, index) => (
                      <React.Fragment key={faq.id}>
                        <TouchableOpacity onPress={() => toggleFaqExpanded(faq.id)} className="active:bg-gray-50">
                          <Box className="p-4">
                            <HStack className="justify-between items-center">
                              <Text className="font-medium text-gray-800 flex-1 pr-2">{faq.question}</Text>
                              <Box
                                className={`rounded-full p-1 ${faq.expanded
? "bg-gray-200"
: "bg-gray-100"}`}
                                style={{
                                  transform: [
                                    {
                                      rotate: faq.expanded
? "180deg"
: "0deg",
                                    },
                                  ],
                                }}
                              >
                                <Feather name="chevron-down" size={16} color="#4B5563" />
                              </Box>
                            </HStack>
                            {faq.expanded && (
                              <Box className="mt-3 bg-gray-50 p-3 rounded-lg">
                                <Text className="text-gray-700">{faq.answer}</Text>
                              </Box>
                            )}
                          </Box>
                        </TouchableOpacity>
                        {index < filteredFaqs.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </VStack>
                )
: (
                  <Box className="p-4 items-center">
                    <VStack space="sm" className="items-center py-4">
                      <Feather name="search" size={40} color="#D1D5DB" />
                      <Text className="text-gray-500 text-center">Aucun résultat trouvé pour "{searchQuery}"</Text>
                      <Text className="text-gray-400 text-center text-sm">Essayez d'autres termes ou contactez notre support</Text>
                    </VStack>
                  </Box>
                )}
              </Box>
            </VStack>

            {/* Contactez-nous */}
            <VStack space="md">
              <Text className="text-gray-800 font-semibold text-lg">Contactez-nous</Text>

              <Box className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <VStack>
                  <TouchableOpacity onPress={() => contactSupport("chat")}>
                    <Box className="p-4">
                      <HStack space="md" className="items-center">
                        <Box className="bg-green-100 rounded-full w-10 h-10 items-center justify-center" style={{ alignItems: "center", justifyContent: "center" }}>
                          <Feather name="message-circle" size={18} color="#10B981" style={{ textAlign: "center", alignSelf: "center" }} />
                        </Box>
                        <VStack className="flex-1">
                          <Text className="font-medium text-gray-800">Chat en direct</Text>
                          <Text className="text-gray-500 text-sm">Temps de réponse : ~2 min</Text>
                        </VStack>
                        <Feather name="chevron-right" size={20} color="#9CA3AF" />
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                  <Divider />
                  <TouchableOpacity onPress={() => contactSupport("email")}>
                    <Box className="p-4">
                      <HStack space="md" className="items-center">
                        <Box className="bg-blue-100 rounded-full w-10 h-10 items-center justify-center" style={{ alignItems: "center", justifyContent: "center" }}>
                          <Feather name="mail" size={18} color="#3B82F6" style={{ textAlign: "center", alignSelf: "center" }} />
                        </Box>
                        <VStack className="flex-1">
                          <Text className="font-medium text-gray-800">Email</Text>
                          <Text className="text-gray-500 text-sm">support@reats-delivery.com</Text>
                        </VStack>
                        <Feather name="chevron-right" size={20} color="#9CA3AF" />
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                  <Divider />
                  <TouchableOpacity onPress={() => contactSupport("phone")}>
                    <Box className="p-4">
                      <HStack space="md" className="items-center">
                        <Box className="bg-purple-100 rounded-full w-10 h-10 items-center justify-center" style={{ alignItems: "center", justifyContent: "center" }}>
                          <Feather name="phone" size={18} color="#8B5CF6" style={{ textAlign: "center", alignSelf: "center" }} />
                        </Box>
                        <VStack className="flex-1">
                          <Text className="font-medium text-gray-800">Téléphone</Text>
                          <Text className="text-gray-500 text-sm">+33 1 23 45 67 89 (9h-18h)</Text>
                        </VStack>
                        <Feather name="chevron-right" size={20} color="#9CA3AF" />
                      </HStack>
                    </Box>
                  </TouchableOpacity>
                </VStack>
              </Box>
            </VStack>

            {/* Centre d'assistance */}
            <Box className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl overflow-hidden shadow-md">
              <Box className="p-5">
                <VStack space="md">
                  <Heading size="md">Centre d'assistance</Heading>
                  <Text className=" opacity-90">Consultez notre base de connaissances complète pour obtenir des réponses détaillées à vos questions.</Text>
                  <Button size="md" variant="solid" className="bg-white self-start" onPress={() => {}}>
                    <Text className="text-primary-500 font-medium">Visiter le centre d'aide</Text>
                  </Button>
                </VStack>
              </Box>
            </Box>
          </VStack>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
};

export default HelpSupportScreen;
