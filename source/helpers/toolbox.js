import { format } from "date-fns";
import frFrLocale from "date-fns/locale/fr";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "moment/locale/fr"; // Import French locale

export function getDeliveryDateInfo(dateObject, wantedFormat) {
    let formattedDeliveryDate = format(dateObject, wantedFormat, {
        locale: frFrLocale,
    });
    return formattedDeliveryDate;
}

export async function storeCartItem(cartItemObject) {
    try {
        const objectKey = `reats_cart_item_${cartItemObject.id}`;
        const jsonValue = JSON.stringify(cartItemObject);
        console.log("Storing cart item with key: ", objectKey);
        console.log("Storing cart item with value: ", jsonValue);
        await AsyncStorage.setItem(objectKey, jsonValue);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getCartItem(ItemID) {
    try {
        const objectKey = `reats_cart_item_${ItemID}`;
        const jsonValue = await AsyncStorage.getItem(objectKey);
        console.log(jsonValue);
        return jsonValue != null
            ? JSON.parse(jsonValue)
            : null;
    } catch (e) {
        console.error(e);
    }
}

export async function removeMultipleItemsFromCart(ItemIDs) {
    try {
        let keysToRemove = [
        ];
        ItemIDs.map((itemID) => {
            keysToRemove.push(`reats_cart_item_${itemID}`);
        });
        await AsyncStorage.multiRemove(keysToRemove);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function removeCartItem(ItemID) {
    try {
        const objectKey = `reats_cart_item_${ItemID}`;
        console.log("Removing cart item with key: ", objectKey);
        await AsyncStorage.removeItem(objectKey);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

export async function getAllCartItems() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const myCartKeys = keys.filter((key) => key.includes("reats_cart_item_"));
        console.log(myCartKeys);
        const cartItems = await AsyncStorage.multiGet(myCartKeys);

        if (cartItems.length > 0) {
            const cartItemsObjects = cartItems.map((item) => JSON.parse(item[1]));
            return {
                data: cartItemsObjects,
            };
        }
        return {
            data: [
            ],
        };
    } catch (e) {
        console.error(e);
    }
}

export async function removeAllCartItems() {
    try {
        const keys = await AsyncStorage.getAllKeys();
        const myCartKeys = keys.filter((key) => key.includes("reats_cart_item_"));
        console.log(myCartKeys);
        await AsyncStorage.multiRemove(myCartKeys);
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
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
