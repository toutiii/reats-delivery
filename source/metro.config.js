const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Add the resolver alias for react-dom
config.resolver.alias = {
    "react-dom": "react-native",
};

// Export the configuration without NativeWind
module.exports = config;
