import Constants from "expo-constants";
import { getGoogleApiKey } from "./utils/aws-secrets";
import { envManager } from "./utils/env-loader";

/**
 * Variables d'environnement de l'application
 *
 * Ce fichier centralise toutes les variables d'environnement utilisées dans l'app
 * et utilise le système de gestion sécurisé pour les variables sensibles.
 */

// Environnement d'exécution (development, staging, production)
export const ENV = Constants.expoConfig?.extra?.ENV || "development";

// URLs de base de l'API selon l'environnement
export const apiBaseUrl = envManager.getEnvVariable(ENV === "production"
? "EXPO_PUBLIC_PRODUCTION_API_BASE_URL"
: ENV === "staging"
? "EXPO_PUBLIC_STAGING_API_BASE_URL"
: "EXPO_PUBLIC_DEVELOPMENT_API_BASE_URL");

// Clés API pour le backend selon l'environnement
export const apiKeyBackend = envManager.getEnvVariable(ENV === "production"
? "EXPO_PUBLIC_PRODUCTION_API_KEY"
: ENV === "staging"
? "EXPO_PUBLIC_STAGING_API_KEY"
: "EXPO_PUBLIC_DEVELOPMENT_API_KEY");

// En-tête d'origine pour les requêtes API
export const appOriginHeader = "delivery";

// Valeur temporaire pour la clé Google Maps API
// Cette valeur sera remplacée par la valeur récupérée depuis AWS Secrets Manager
// lorsque la fonction initializeGoogleMapsApiKey sera appelée
export let GOOGLE_MAPS_API_KEY = envManager.getEnvVariable("EXPO_PUBLIC_GOOGLE_MAPS_API_KEY", "");

/**
 * Initialise la clé Google Maps API et la configuration AWS de façon sécurisée
 * Cette fonction doit être appelée au démarrage de l'application
 */
export async function initializeGoogleMapsApiKey(): Promise<void> {
  try {
    // 2. Récupérer la clé Google Maps API depuis AWS Secrets Manager
    const apiKey = await getGoogleApiKey();

    if (apiKey) {
      // Stocker la clé de façon sécurisée dans le SecureStore pour les utilisations futures
      await envManager.storeSecret("GOOGLE_MAPS_API_KEY", apiKey);

      // Utiliser la clé récupérée
      GOOGLE_MAPS_API_KEY = apiKey;
      console.log("Clé Google Maps API récupérée avec succès depuis AWS Secrets Manager");
    } else {
      // Si la clé n'a pas pu être récupérée, essayer de la récupérer depuis SecureStore
      const storedKey = await envManager.getSecret("GOOGLE_MAPS_API_KEY");

      if (storedKey) {
        GOOGLE_MAPS_API_KEY = storedKey;
        console.log("Clé Google Maps API récupérée depuis le stockage sécurisé local");
      } else {
        console.warn("La clé Google Maps API n'a pas pu être récupérée, utilisation de la clé de fallback");
      }
    }
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la clé Google Maps API:", error);

    // En cas d'erreur, essayer de récupérer une clé sauvegardée localement
    try {
      const storedKey = await envManager.getSecret("GOOGLE_MAPS_API_KEY");
      if (storedKey) {
        GOOGLE_MAPS_API_KEY = storedKey;
        console.log("Clé Google Maps API récupérée depuis le stockage sécurisé local après erreur");
      }
    } catch (e) {
      console.warn("Utilisation de la clé de fallback pour Google Maps API");
    }
  }
}
