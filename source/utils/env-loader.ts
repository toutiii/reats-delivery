import Constants from "expo-constants";
import * as SecureStore from "expo-secure-store";

export class EnvironmentManager {
  private static instance: EnvironmentManager;

  private cachedSecrets: Record<string, string> = {};

  private constructor() {}

  /**
   * Obtient l'instance unique de l'EnvironmentManager (Singleton)
   */
  public static getInstance(): EnvironmentManager {
    if (!EnvironmentManager.instance) {
      EnvironmentManager.instance = new EnvironmentManager();
    }
    return EnvironmentManager.instance;
  }

  /**
   * Récupère une variable d'environnement ou un secret stocké
   * @param key Clé de la variable d'environnement
   * @param defaultValue Valeur par défaut si la variable n'existe pas
   * @returns La valeur de la variable ou la valeur par défaut
   */
  public getEnvVariable(key: string, defaultValue: string = ""): string {
    // Vérifier d'abord si la variable est dans le cache des secrets
    if (this.cachedSecrets[key]) {
      return this.cachedSecrets[key];
    }

    // Ensuite, vérifier dans les variables d'environnement Expo
    if (Constants.expoConfig?.extra && key in Constants.expoConfig.extra) {
      return Constants.expoConfig.extra[key] as string;
    }

    // Si pas trouvé, renvoyer la valeur par défaut
    console.warn(`Variable d'environnement "${key}" non trouvée, utilisation de la valeur par défaut`);
    return defaultValue;
  }

  /**
   * Stocke un secret de façon sécurisée
   * @param key Clé du secret
   * @param value Valeur du secret
   */
  public async storeSecret(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
      this.cachedSecrets[key] = value; // Mettre en cache pour un accès rapide
    } catch (error) {
      console.error(`Erreur lors du stockage du secret "${key}":`, error);
    }
  }

  /**
   * Récupère un secret stocké de façon sécurisée
   * @param key Clé du secret
   * @returns La valeur du secret ou null si non trouvé
   */
  public async getSecret(key: string): Promise<string | null> {
    // Vérifier d'abord le cache
    if (this.cachedSecrets[key]) {
      return this.cachedSecrets[key];
    }

    try {
      const value = await SecureStore.getItemAsync(key);
      if (value) {
        this.cachedSecrets[key] = value; // Mettre en cache pour les appels futurs
      }
      return value;
    } catch (error) {
      console.error(`Erreur lors de la récupération du secret "${key}":`, error);
      return null;
    }
  }

  /**
   * Récupère les identifiants AWS de façon sécurisée
   * Privilégie SecureStore, avec fallback sur les variables d'environnement
   */
  public async getAwsCredentials(): Promise<{
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
  }> {
    const accessKeyId = (await this.getSecret("AWS_ACCESS_KEY_ID")) || this.getEnvVariable("AWS_ACCESS_KEY_ID");

    const secretAccessKey = (await this.getSecret("AWS_SECRET_ACCESS_KEY")) || this.getEnvVariable("AWS_SECRET_ACCESS_KEY");

    const region = (await this.getSecret("AWS_REGION")) || this.getEnvVariable("AWS_REGION", "eu-central-1");

    return { accessKeyId, secretAccessKey, region };
  }

  /**
   * Configure les identifiants AWS pour la première utilisation
   * Cette méthode doit être appelée au démarrage de l'application
   */
  public async configureAwsCredentials(accessKeyId: string, secretAccessKey: string, region: string = "eu-central-1"): Promise<void> {
    await this.storeSecret("AWS_ACCESS_KEY_ID", accessKeyId);
    await this.storeSecret("AWS_SECRET_ACCESS_KEY", secretAccessKey);
    await this.storeSecret("AWS_REGION", region);
    console.log("Identifiants AWS configurés avec succès");
  }
}

// Exporter une instance unique
export const envManager = EnvironmentManager.getInstance();
