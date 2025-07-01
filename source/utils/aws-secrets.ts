import { GetSecretValueCommand, SecretsManagerClient } from "@aws-sdk/client-secrets-manager";
import { AWS_CONFIG } from "../config/aws-config";

/**
 * Utilitaire pour accéder à AWS Secrets Manager de façon sécurisée
 *
 * Crée un client Secrets Manager dynamiquement en utilisant la configuration AWS actuelle.
 * Cela permet de supporter l'initialisation asynchrone des identifiants AWS.
 */

/**
 * Obtient une instance du client AWS Secrets Manager avec les identifiants actuels
 * @returns Une instance configurée de SecretsManagerClient
 */
function getClient(): SecretsManagerClient {
  return new SecretsManagerClient({
    region: AWS_CONFIG.region,
    credentials: {
      accessKeyId: AWS_CONFIG.credentials.accessKeyId,
      secretAccessKey: AWS_CONFIG.credentials.secretAccessKey,
    },
  });
}

/**
 * Récupère un secret complet depuis AWS Secrets Manager
 * @param secretName Nom du secret à récupérer
 * @returns Le secret récupéré sous forme d'objet JSON
 */
export async function getSecretValue(secretName: string): Promise<Record<string, any>> {
  try {
    // Créer une instance du client avec les identifiants actuels
    const client = getClient();

    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
      })
    );

    if (response.SecretString) {
      return JSON.parse(response.SecretString);
    }

    throw new Error("Aucune valeur de secret trouvée");
  } catch (error) {
    console.error("Erreur lors de la récupération du secret:", error);
    throw error;
  }
}

/**
 * Récupère une clé spécifique depuis un secret AWS Secrets Manager
 * @param secretName Nom du secret à récupérer
 * @param key Clé spécifique à extraire du secret
 * @returns La valeur associée à la clé dans le secret
 */
export async function getSecretKey(secretName: string, key: string): Promise<string> {
  try {
    const secretValue = await getSecretValue(secretName);
    if (secretValue && secretValue[key]) {
      return secretValue[key];
    }
    throw new Error(`Clé '${key}' non trouvée dans le secret`);
  } catch (error) {
    console.error(`Erreur lors de la récupération de la clé '${key}':`, error);
    throw error;
  }
}

// Cache pour les valeurs des secrets (optimisation des performances)
const secretKeyCache: Record<string, string> = {};

/**
 * Fonction spécifique pour récupérer la clé Google API
 * @param useCache Utiliser le cache pour éviter des appels inutiles à AWS
 * @returns La clé Google API
 */
export async function getGoogleApiKey(useCache = true): Promise<string> {
  try {
    // Vérifier d'abord le cache si demandé
    const cacheKey = `${AWS_CONFIG.secretsManager.secretName}_${AWS_CONFIG.secretsManager.googleApiKeyField}`;
    if (useCache && secretKeyCache[cacheKey]) {
      console.log("Utilisation de la clé Google API en cache");
      return secretKeyCache[cacheKey];
    }

    // Récupérer depuis AWS si pas en cache
    const apiKey = await getSecretKey(AWS_CONFIG.secretsManager.secretName, AWS_CONFIG.secretsManager.googleApiKeyField);

    // Mettre en cache pour les appels futurs
    if (apiKey) {
      secretKeyCache[cacheKey] = apiKey;
    }

    return apiKey;
  } catch (error) {
    console.error("Erreur lors de la récupération de la clé Google API:", error);
    // Retourner une chaîne vide en cas d'erreur
    return "";
  }
}
