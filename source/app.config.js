export default ({ config }) => {
  return {
    ...config,
    expo: {
      web: {
        bundler: "metro",
      },
    },
    name: "source",
    slug: "source",
    version: "0.1.0",
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
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-build-properties",
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
      apiBaseUrl:
        process.env.EXPO_PUBLIC_PRODUCTION_API_BASE_URL ??
        process.env.EXPO_PUBLIC_STAGING_API_BASE_URL ??
        process.env.EXPO_PUBLIC_DEVELOPMENT_API_BASE_URL,
      apiKeyBackend:
        process.env.PRODUCTION_API_KEY ??
        process.env.STAGING_API_KEY ??
        process.env.DEVELOPMENT_API_KEY,
      appOriginHeader: process.env.EXPO_PUBLIC_APP_ORIGIN,
    },
    owner: "tout_it",
    updates: {
      url: "https://u.expo.dev/6df1673a-3c4d-4188-b913-b619a786ee34",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
  };
};
