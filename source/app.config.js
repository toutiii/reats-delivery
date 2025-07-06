require("dotenv").config();

module.exports = ({ config }) => {
  return {
    ...config,
    name: "source",
    slug: "source",
    version: "0.6.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.reats.delivery",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.reats.delivery",
    },
    web: {
      bundler: "metro",
      favicon: "./assets/favicon.png",
    },
    plugins: [
      [
        "expo-build-properties",
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            minSdkVersion: 24,
          },
        },
      ],
      "expo-secure-store",
      "expo-font",
      [
        "expo-splash-screen",
        {
          image: "./assets/splash.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "6df1673a-3c4d-4188-b913-b619a786ee34",
      },
      ENV: process.env.ENV,
      apiBaseUrl: process.env.EXPO_PUBLIC_PRODUCTION_API_BASE_URL ?? process.env.EXPO_PUBLIC_STAGING_API_BASE_URL ?? process.env.EXPO_PUBLIC_DEVELOPMENT_API_BASE_URL,
      apiKeyBackend: process.env.PRODUCTION_API_KEY ?? process.env.STAGING_API_KEY ?? process.env.DEVELOPMENT_API_KEY,
      appOriginHeader: process.env.EXPO_PUBLIC_APP_ORIGIN,
      AWS_REGION: process.env.EXPO_PUBLIC_AWS_REGION,
      AWS_ACCESS_KEY_ID: process.env.EXPO_PUBLIC_AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.EXPO_PUBLIC_AWS_SECRET_ACCESS_KEY,
      AWS_SECRET_NAME: process.env.EXPO_PUBLIC_AWS_SECRET_NAME,
      AWS_GOOGLE_API_KEY_FIELD: process.env.EXPO_PUBLIC_AWS_GOOGLE_API_KEY_FIELD,
    },
    owner: "tout-it",
    updates: {
      url: "https://u.expo.dev/6df1673a-3c4d-4188-b913-b619a786ee34",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  };
};
