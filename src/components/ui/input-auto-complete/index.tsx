import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
   ActivityIndicator,
   Animated,
   ScrollView,
   TouchableOpacity,
   View,
} from 'react-native';
import {
   FormControl,
   FormControlError,
   FormControlErrorIcon,
   FormControlErrorText,
   FormControlHelper,
   FormControlHelperText,
   FormControlLabel,
   FormControlLabelText,
} from '../../ui/form-control';
import { HStack } from '../hstack';
import {
   AddIcon,
   AlertCircleIcon,
   CheckIcon,
   CloseIcon,
   SearchIcon,
} from '../icon';
import { Input, InputField, InputIcon, InputSlot } from '../input';
import { Text } from '../text';
import { VStack } from '../vstack';

// Définition des interfaces
interface Departement {
   code: string;
   nom: string;
}

export interface City {
   nom: string;
   code: string;
   _score: number;
   departement?: Departement;
}

interface InputMultiSelectCityProps {
   onCitiesSelected?: (cities: City[]) => void;
   label?: string;
   placeholder?: string;
   errorMessage?: string;
   helperText?: string;
   maxSelections?: number;
   minSelections?: number;
   themeColor?: string;
   accentColor?: string;
   selectionColor?: string;
}

const InputMultiSelectCity: React.FC<InputMultiSelectCityProps> = ({
   onCitiesSelected,
   label = 'Recherche de villes',
   placeholder = "Entrez le nom d'une ville",
   errorMessage = 'Veuillez sélectionner au moins une ville valide',
   helperText = 'Commencez à taper pour voir des suggestions',
   maxSelections = 5,
   minSelections = 1,
   themeColor = '#3B82F6', // Bleu par défaut
   accentColor = '#EFF6FF',
   selectionColor = '#10B981', // Vert pour les villes sélectionnées
}) => {
   const [inputValue, setInputValue] = useState<string>('');
   const [suggestions, setSuggestions] = useState<City[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [isInvalid, setIsInvalid] = useState<boolean>(false);
   const [selectedCities, setSelectedCities] = useState<City[]>([]);
   const [isFocused, setIsFocused] = useState<boolean>(false);
   const [errorType, setErrorType] = useState<string>('');

   // Références pour les animations
   const inputRef = useRef(null);
   const suggestionOpacity = useRef(new Animated.Value(0)).current;
   const selectionScale = useRef(new Animated.Value(1)).current;
   const shakeAnimation = useRef(new Animated.Value(0)).current;
   const tagAppearAnimation = useRef(new Animated.Value(0)).current;

   // Fonction pour éviter les erreurs avec les classes dynamiques
   const getBorderColor = () => {
      if (isInvalid) return '#EF4444'; // Rouge pour erreur
      return isFocused ? themeColor : '#E5E7EB'; // Border color normal ou focus
   };

   const getIconColor = () => {
      return isFocused ? themeColor : '#9CA3AF'; // text-gray-400 équivalent en hex
   };

   // Fonction de recherche des suggestions avec mémorisation
   const fetchSuggestions = useCallback(
      async (query: string): Promise<void> => {
         if (query.length < 2) {
            setSuggestions([]);
            return;
         }

         setIsLoading(true);
         try {
            const response = await fetch(
               `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(query)}&fields=departement&boost=population&limit=5`
            );

            if (!response.ok) {
               throw new Error('Erreur réseau');
            }

            const data: City[] = await response.json();

            // Filtrer les villes déjà sélectionnées
            const filteredData = data.filter(
               city =>
                  !selectedCities.some(
                     selectedCity => selectedCity.code === city.code
                  )
            );

            setSuggestions(filteredData);

            // Animation des suggestions
            Animated.timing(suggestionOpacity, {
               toValue: filteredData.length > 0 ? 1 : 0,
               duration: 200,
               useNativeDriver: true,
            }).start();
         } catch (error) {
            console.error('Erreur:', error);
            setIsInvalid(true);
            setErrorType('network');
         } finally {
            setIsLoading(false);
         }
      },
      [selectedCities]
   );

   // Debounce pour éviter trop d'appels API
   useEffect(() => {
      const timeoutId = setTimeout(() => {
         fetchSuggestions(inputValue);
      }, 300);

      return () => clearTimeout(timeoutId);
   }, [inputValue, fetchSuggestions]);

   // Gestion de la sélection d'une ville
   const handleSelectCity = (city: City): void => {
      if (selectedCities.length >= maxSelections) {
         setIsInvalid(true);
         setErrorType('maxLimit');
         startShakeAnimation();
         return;
      }

      // Animation d'apparition des tags
      tagAppearAnimation.setValue(0);

      setSelectedCities(prev => [...prev, city]);
      setInputValue('');
      setSuggestions([]);
      setIsInvalid(false);
      setErrorType('');

      // Animation d'apparition du tag
      Animated.spring(tagAppearAnimation, {
         toValue: 1,
         friction: 8,
         tension: 40,
         useNativeDriver: true,
      }).start();

      // Callback pour le parent
      if (onCitiesSelected) {
         onCitiesSelected([...selectedCities, city]);
      }
   };

   // Suppression d'une ville sélectionnée
   const handleRemoveCity = (cityCode: string): void => {
      const updatedCities = selectedCities.filter(
         city => city.code !== cityCode
      );
      setSelectedCities(updatedCities);

      // Callback pour le parent
      if (onCitiesSelected) {
         onCitiesSelected(updatedCities);
      }

      // Vérifier si nous sommes en dessous du minimum requis
      if (updatedCities.length < minSelections) {
         setIsInvalid(true);
         setErrorType('minLimit');
      } else {
         setIsInvalid(false);
         setErrorType('');
      }
   };

   // Animation de secousse pour erreur
   const startShakeAnimation = () => {
      Animated.sequence([
         Animated.timing(shakeAnimation, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
         }),
         Animated.timing(shakeAnimation, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
         }),
         Animated.timing(shakeAnimation, {
            toValue: 10,
            duration: 100,
            useNativeDriver: true,
         }),
         Animated.timing(shakeAnimation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
         }),
      ]).start();
   };

   // Validation du formulaire
   const validateSelection = (): boolean => {
      if (selectedCities.length < minSelections) {
         setIsInvalid(true);
         setErrorType('minLimit');
         startShakeAnimation();
         return false;
      }

      setIsInvalid(false);
      setErrorType('');
      return true;
   };

   // Reset complet du champ avec animation
   const handleClearAll = (): void => {
      // Animation de disparition
      Animated.timing(selectionScale, {
         toValue: 0,
         duration: 150,
         useNativeDriver: true,
      }).start(() => {
         setInputValue('');
         setSelectedCities([]);
         setIsInvalid(false);
         setErrorType('');
         setSuggestions([]);

         // Animation de réapparition
         Animated.spring(selectionScale, {
            toValue: 1,
            friction: 8,
            tension: 40,
            useNativeDriver: true,
         }).start();

         // Callback pour le parent
         if (onCitiesSelected) {
            onCitiesSelected([]);
         }
      });
   };

   // Affichage du message d'erreur en fonction du type
   const getErrorMessage = () => {
      switch (errorType) {
         case 'maxLimit':
            return `Vous ne pouvez pas sélectionner plus de ${maxSelections} villes`;
         case 'minLimit':
            return `Veuillez sélectionner au moins ${minSelections} ville${minSelections > 1 ? 's' : ''}`;
         case 'network':
            return `Erreur de connexion, veuillez réessayer`;
         default:
            return errorMessage;
      }
   };

   return (
      <Animated.View
         style={{
            transform: [{ translateX: shakeAnimation }],
            width: '100%',
            maxWidth: 480, // un peu plus large que l'original
         }}
      >
         <FormControl isInvalid={isInvalid} size="md">
            <FormControlLabel>
               <HStack className="justify-between items-center mb-1">
                  <FormControlLabelText
                     className="text-gray-800 font-semibold text-lg"
                     style={{ letterSpacing: -0.3 }}
                  >
                     {label}
                  </FormControlLabelText>
                  {selectedCities.length > 0 && (
                     <TouchableOpacity onPress={handleClearAll}>
                        <Text
                           style={{ color: themeColor }}
                           className="text-sm font-medium"
                        >
                           Tout effacer ({selectedCities.length})
                        </Text>
                     </TouchableOpacity>
                  )}
               </HStack>
            </FormControlLabel>

            {/* Affichage des villes sélectionnées */}
            {selectedCities.length > 0 && (
               <Animated.View
                  style={{
                     opacity: selectionScale,
                     transform: [{ scale: selectionScale }],
                     marginBottom: 12,
                  }}
               >
                  <ScrollView
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'nowrap',
                        gap: 8,
                        paddingVertical: 4,
                     }}
                  >
                     {selectedCities.map((city, index) => (
                        <Animated.View
                           key={city.code}
                           style={{
                              opacity:
                                 index === selectedCities.length - 1
                                    ? tagAppearAnimation
                                    : 1,
                              transform: [
                                 {
                                    scale:
                                       index === selectedCities.length - 1
                                          ? tagAppearAnimation
                                          : 1,
                                 },
                              ],
                           }}
                        >
                           <HStack
                              className="items-center px-3 py-2 rounded-full"
                              style={{
                                 backgroundColor: accentColor,
                                 borderWidth: 1,
                                 borderColor: themeColor,
                              }}
                           >
                              <Text
                                 className="font-medium text-sm mr-1"
                                 style={{ color: themeColor }}
                              >
                                 {city.nom}
                              </Text>
                              <TouchableOpacity
                                 onPress={() => handleRemoveCity(city.code)}
                                 style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: 9,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: themeColor,
                                 }}
                              >
                                 <CloseIcon color="#FFFFFF" />
                              </TouchableOpacity>
                           </HStack>
                        </Animated.View>
                     ))}
                  </ScrollView>
               </Animated.View>
            )}

            {/* Input de recherche */}
            <Input
               className="rounded-lg"
               style={{
                  borderWidth: 2,
                  borderColor: getBorderColor(),
                  backgroundColor: '#FFFFFF',
               }}
               size="md"
               ref={inputRef}
            >
               <InputSlot className="pl-4">
                  <InputIcon
                     as={SearchIcon}
                     style={{ color: getIconColor() }}
                  />
               </InputSlot>
               <InputField
                  type="text"
                  placeholder={
                     selectedCities.length > 0
                        ? 'Ajouter une autre ville'
                        : placeholder
                  }
                  value={inputValue}
                  className="h-14 text-base font-medium px-2"
                  onChangeText={(text: string) => {
                     setInputValue(text);
                     if (isInvalid && errorType === 'maxLimit') {
                        setIsInvalid(false);
                        setErrorType('');
                     }
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                     setIsFocused(false);
                     // Valider après la perte de focus
                     if (selectedCities.length > 0) {
                        validateSelection();
                     }
                  }}
               />
               {inputValue !== '' && (
                  <InputSlot onPress={() => setInputValue('')} className="pr-4">
                     <InputIcon as={CloseIcon} className="text-gray-400" />
                  </InputSlot>
               )}
            </Input>

            {/* État de chargement */}
            {isLoading && (
               <FormControlHelper>
                  <HStack space="xs" className="items-center my-2">
                     <ActivityIndicator
                        size="small"
                        color={themeColor}
                        className="mr-2"
                     />
                     <FormControlHelperText className="text-gray-500 font-medium">
                        Chargement des suggestions...
                     </FormControlHelperText>
                  </HStack>
               </FormControlHelper>
            )}

            {/* Message d'aide */}
            {!inputValue &&
               !isLoading &&
               !isInvalid &&
               selectedCities.length === 0 && (
                  <FormControlHelper>
                     <FormControlHelperText className="text-gray-500 font-light italic ml-1 mt-1">
                        {helperText}
                     </FormControlHelperText>
                  </FormControlHelper>
               )}

            {/* Compteur de sélection */}
            {selectedCities.length > 0 && !isInvalid && !inputValue && (
               <FormControlHelper>
                  <FormControlHelperText className="text-gray-500 font-medium ml-1 mt-1">
                     {selectedCities.length} ville
                     {selectedCities.length > 1 ? 's' : ''} sélectionnée
                     {selectedCities.length > 1 ? 's' : ''}
                     {maxSelections && ` (max: ${maxSelections})`}
                  </FormControlHelperText>
               </FormControlHelper>
            )}

            {/* Liste des suggestions */}
            {suggestions.length > 0 && (
               <Animated.View style={{ opacity: suggestionOpacity }}>
                  <VStack
                     className="w-full border border-gray-100 rounded-lg mt-2 mb-3 bg-white overflow-hidden shadow-sm"
                     style={{ elevation: 2 }}
                  >
                     {suggestions.map((city, index) => (
                        <TouchableOpacity
                           key={city.code}
                           onPress={() => handleSelectCity(city)}
                           style={{
                              width: '100%',
                              paddingVertical: 14,
                              paddingHorizontal: 16,
                              borderBottomWidth:
                                 index < suggestions.length - 1 ? 1 : 0,
                              borderBottomColor: '#F3F4F6', // border-gray-100
                              backgroundColor:
                                 index % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                           }}
                           activeOpacity={0.7}
                        >
                           <HStack className="justify-between items-center">
                              <HStack className="items-center space-x-3">
                                 <VStack space="xs">
                                    <Text className="font-medium text-gray-800">
                                       {city.nom}
                                    </Text>
                                    <Text className="text-xs text-gray-500">
                                       {city.departement?.code} -{' '}
                                       {city.departement?.nom}
                                    </Text>
                                 </VStack>
                              </HStack>
                              <HStack space="xs" className="items-center">
                                 <Text
                                    className="text-xs font-medium"
                                    style={{ color: themeColor }}
                                 >
                                    Ajouter
                                 </Text>
                                 <AddIcon
                                    color={themeColor}
                                    style={{ width: 20, height: 20 }}
                                 />
                              </HStack>
                           </HStack>
                        </TouchableOpacity>
                     ))}
                  </VStack>
               </Animated.View>
            )}

            {/* Message quand aucun résultat */}
            {inputValue.length > 2 &&
               !isLoading &&
               suggestions.length === 0 && (
                  <FormControlHelper>
                     <HStack
                        space="xs"
                        className="items-center my-2 p-3 bg-gray-50 rounded-lg"
                     >
                        <FormControlHelperText className="text-gray-500 font-medium">
                           Aucune ville trouvée pour "{inputValue}"
                        </FormControlHelperText>
                     </HStack>
                  </FormControlHelper>
               )}

            {/* Message d'erreur */}
            {isInvalid && (
               <FormControlError>
                  <HStack className="items-center space-x-2 mt-2">
                     <FormControlErrorIcon
                        as={AlertCircleIcon}
                        style={{ color: '#EF4444', width: 20, height: 20 }}
                     />
                     <FormControlErrorText
                        style={{ color: '#EF4444', fontWeight: '500' }}
                     >
                        {getErrorMessage()}
                     </FormControlErrorText>
                  </HStack>
               </FormControlError>
            )}

            {/* Résumé du statut de sélection */}
            {selectedCities.length >= 1 && (
               <View
                  className="mt-4 mb-2 px-4 py-3 rounded-lg"
                  style={{ backgroundColor: '#F9FAFB' }}
               >
                  <HStack className="justify-between items-center">
                     <Text className="font-medium text-gray-700">
                        {selectedCities.length} / {maxSelections} villes
                     </Text>
                     {selectedCities.length >= minSelections && (
                        <HStack className="items-center space-x-1">
                           <CheckIcon
                              color={selectionColor}
                              style={{ width: 16, height: 16 }}
                           />
                           <Text
                              style={{ color: selectionColor }}
                              className="text-sm font-medium"
                           >
                              Sélection valide
                           </Text>
                        </HStack>
                     )}
                  </HStack>
               </View>
            )}
         </FormControl>
      </Animated.View>
   );
};

export default InputMultiSelectCity;
