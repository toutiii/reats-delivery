import type { StackNavigationProp } from "@react-navigation/stack";
import type { RouteProp } from "@react-navigation/native";

// Définition des paramètres pour toutes les routes de l'application
export type RootStackParamList = {
  Onboarding: undefined;
  TermsAndConditions: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LoginForm: undefined;
  SignupForm: undefined;
  OTPView: undefined;
  MainDrawerNavigator: undefined;
};

// Type pour la navigation avec Stack
export type StackNavigation = StackNavigationProp<RootStackParamList>;

// Types pour les routes spécifiques
export type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;

export type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

// Type pour les props de navigation
export type ScreenProps<T extends keyof RootStackParamList> = {
  navigation: ScreenNavigationProp<T>;
  route: ScreenRouteProp<T>;
};
