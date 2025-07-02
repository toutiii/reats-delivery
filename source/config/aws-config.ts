export const AWS_CONFIG = {
  region: process.env.EXPO_PUBLIC_AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY || "",
  },
  secretsManager: {
    secretName: process.env.EXPO_PUBLIC_AWS_SECRET_NAME || "",
    googleApiKeyField: process.env.EXPO_PUBLIC_AWS_GOOGLE_API_KEY_FIELD || "",
  },
};
