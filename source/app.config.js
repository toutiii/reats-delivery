export default ({ config }) => {
    return {
        ...config,
        name: "source",
        slug: "source",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/icon.png",
        userInterfaceStyle: "light",
        splash: {
            image: "./assets/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        assetBundlePatterns: [
            "**/*"
        ],
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
            "expo-secure-store"
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
    };
};
