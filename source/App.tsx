// Importer les polyfills en premier pour AWS et autres bibliothèques
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { initializeGoogleMapsApiKey } from "@/env";
import { Montserrat_100Thin } from "@expo-google-fonts/montserrat/100Thin";
import { Montserrat_100Thin_Italic } from "@expo-google-fonts/montserrat/100Thin_Italic";
import { Montserrat_200ExtraLight } from "@expo-google-fonts/montserrat/200ExtraLight";
import { Montserrat_200ExtraLight_Italic } from "@expo-google-fonts/montserrat/200ExtraLight_Italic";
import { Montserrat_300Light } from "@expo-google-fonts/montserrat/300Light";
import { Montserrat_300Light_Italic } from "@expo-google-fonts/montserrat/300Light_Italic";
import { Montserrat_400Regular } from "@expo-google-fonts/montserrat/400Regular";
import { Montserrat_400Regular_Italic } from "@expo-google-fonts/montserrat/400Regular_Italic";
import { Montserrat_500Medium } from "@expo-google-fonts/montserrat/500Medium";
import { Montserrat_500Medium_Italic } from "@expo-google-fonts/montserrat/500Medium_Italic";
import { Montserrat_600SemiBold } from "@expo-google-fonts/montserrat/600SemiBold";
import { Montserrat_600SemiBold_Italic } from "@expo-google-fonts/montserrat/600SemiBold_Italic";
import { Montserrat_700Bold } from "@expo-google-fonts/montserrat/700Bold";
import { Montserrat_700Bold_Italic } from "@expo-google-fonts/montserrat/700Bold_Italic";
import { Montserrat_800ExtraBold } from "@expo-google-fonts/montserrat/800ExtraBold";
import { Montserrat_800ExtraBold_Italic } from "@expo-google-fonts/montserrat/800ExtraBold_Italic";
import { Montserrat_900Black } from "@expo-google-fonts/montserrat/900Black";
import { Montserrat_900Black_Italic } from "@expo-google-fonts/montserrat/900Black_Italic";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import "react-native-reanimated";
import "./global.css";
import { MainDrawerNavigator } from "./legacy/drawer/MainDrawerNavigator";
import LoginForm from "./legacy/forms/forms/LoginForm";
import SignupForm from "./legacy/forms/forms/SignupForm";
import OTPView from "./legacy/views/OTPView";
import "./polyfills";
import LoginScreen from "./screens/auth/login";
import OTPScreen from "./screens/auth/otp";
import RegisterScreen from "./screens/auth/register";
import DeliveryMapScreen from "./screens/delivery";
import DeliveryConfirmation from "./screens/delivery/confirmation";
import HomeScreen from "./screens/home";
import StartPage from "./screens/onboarding";
import TermsAndConditionsScreen from "./screens/onboarding/terms-and-conditions";
import OrderDetailsScreen from "./screens/order-details";
import DocumentsScreen from "./screens/user-infos-collection";
import InformationVerificationScreen from "./screens/user-infos-collection/information-verification";
import PersonalDocumentsScreen from "./screens/user-infos-collection/personal-documents";
import UploadDocumentsScreen from "./screens/user-infos-collection/upload-documents";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
  });

  useEffect(() => {
    async function initialize() {
      if (loaded) {
        try {
          console.log("Démarrage de l'initialisation de l'application...");

          await initializeGoogleMapsApiKey();

          console.log("Initialisation terminée avec succès");

          await SplashScreen.hideAsync();
        } catch (error) {
          console.error("Erreur lors de l'initialisation:", error);
          SplashScreen.hideAsync();
        }
      }
    }

    initialize();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <AutocompleteDropdownContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={StartPage} />
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} />
            <Stack.Screen name="DocumentsScreen" component={DocumentsScreen} />
            <Stack.Screen name="PersonalDocumentsScreen" component={PersonalDocumentsScreen} />
            <Stack.Screen name="UploadDocumentsScreen" component={UploadDocumentsScreen} />
            <Stack.Screen name="MainDrawerNavigator" component={MainDrawerNavigator} />
            <Stack.Screen name="InformationVerificationScreen" component={InformationVerificationScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen} />
            <Stack.Screen name="DeliveryMapScreen" component={DeliveryMapScreen as React.ComponentType<{}>} />
            <Stack.Screen name="DeliveryConfirmation" component={DeliveryConfirmation} />
            <Stack.Screen name="OTPView" component={OTPView} />
            <Stack.Screen name="LoginForm" component={LoginForm} />
            <Stack.Screen name="SignupForm" component={SignupForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </AutocompleteDropdownContextProvider>
    </GluestackUIProvider>
  );
}
