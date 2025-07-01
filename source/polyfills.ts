// Ce fichier contient tous les polyfills nécessaires pour le SDK AWS et autres bibliothèques
// qui dépendent des APIs Node.js non disponibles dans React Native

// Polyfill pour crypto.getRandomValues
import "react-native-get-random-values";

// Polyfill pour URL et URLSearchParams
import "react-native-url-polyfill/auto";

// Polyfill pour AsyncIterator
import "@azure/core-asynciterator-polyfill";

// Autres polyfills pourraient être ajoutés ici au besoin

console.log("Polyfills initialisés");
