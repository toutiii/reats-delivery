import { format } from "date-fns";
import frFrLocale from "date-fns/locale/fr";
import * as SecureStore from "expo-secure-store";
import "moment/locale/fr"; // Import French locale

console.log("Hellooo from toolbox.js");

export function getDeliveryDateInfo(dateObject, wantedFormat) {
    let formattedDeliveryDate = format(dateObject, wantedFormat, {
        locale: frFrLocale,
    });
    return formattedDeliveryDate;
}

export async function getItemFromSecureStore(key) {
    let result = await SecureStore.getItemAsync(key);
    return result;
}

export async function deleteItemFromSecureStore(key) {
    await SecureStore.deleteItemAsync(key);
}

export function buildReadableAddress(address) {
    if (address.length === 0) {
        return "";
    }
    let readableAddress =
    address.street_number +
    " " +
    address.street_name +
    " " +
    address.address_complement +
    " " +
    address.postal_code +
    " " +
    address.town;

    readableAddress = readableAddress.replace("null ", "");
    return readableAddress;
}

export function getDeliveryRadius() {
    return [
        { label: "5 KM", value: "5" },
        { label: "10 KM", value: "10" },
        { label: "15 KM", value: "15" },
    ];
}

export function extractTownName(townWithCode) {
    const openParenIndex = townWithCode.indexOf(" (");
    if (openParenIndex !== -1) {
        return townWithCode.substring(0, openParenIndex).trim();
    }
    return null;
}
