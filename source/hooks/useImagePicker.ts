import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import { useCallback, useState } from "react";
import { Alert, Platform } from "react-native";

type ImagePickerHookResult = {
  selectedImage: ImagePickerAsset | null;
  loading: boolean;
  error: string | null;
  takePicture: () => Promise<ImagePicker.ImagePickerResult | null>;
  pickImage: () => Promise<ImagePicker.ImagePickerResult | null>;
  clearImage: () => void;
};

/**
 * Custom hook for handling image picking functionality
 * Provides methods for camera and gallery image selection with proper permissions
 * Handles platform-specific behavior and error states
 *
 * @returns {ImagePickerHookResult} Image picking methods and state
 */
export const useImagePicker = (): ImagePickerHookResult => {
  // State for storing the selected image
  const [selectedImage, setSelectedImage] = useState<ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Request camera permissions
   * Handles different platform permission flows
   */
  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        setError("Camera permission is required to take pictures");

        // Show platform-specific permission guidance
        if (Platform.OS === "ios") {
          Alert.alert("Camera Permission Required", "Please enable camera access in your device settings to continue.", [{ text: "OK" }]);
        }
        return false;
      }
      return true;
    } catch (err) {
      setError("Failed to request camera permission");
      return false;
    }
  }, []);

  /**
   * Request media library permissions
   * Handles different platform permission flows
   */
  const requestMediaLibraryPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        setError("Media library permission is required to select images");

        // Show platform-specific permission guidance
        if (Platform.OS === "ios") {
          Alert.alert("Photo Library Access Required", "Please enable photo library access in your device settings to continue.", [{ text: "OK" }]);
        }
        return false;
      }
      return true;
    } catch (err) {
      setError("Failed to request media library permission");
      return false;
    }
  }, []);

  /**
   * Take a picture using device camera
   * @returns {Promise<ImagePicker.ImagePickerResult|null>} Image result or null on failure/cancel
   */
  const takePicture = useCallback(async (): Promise<ImagePicker.ImagePickerResult | null> => {
    try {
      setLoading(true);
      setError(null);

      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0]);
      }

      return result;
    } catch (err) {
      setError("Failed to take picture");
      return null;
    } finally {
      setLoading(false);
    }
  }, [requestCameraPermission]);

  /**
   * Pick an image from device gallery
   * @returns {Promise<ImagePicker.ImagePickerResult|null>} Image result or null on failure/cancel
   */
  const pickImage = useCallback(async (): Promise<ImagePicker.ImagePickerResult | null> => {
    try {
      setLoading(true);
      setError(null);

      const hasPermission = await requestMediaLibraryPermission();
      if (!hasPermission) return null;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        exif: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setSelectedImage(result.assets[0]);
      }

      return result;
    } catch (err) {
      setError("Failed to pick image from gallery");
      return null;
    } finally {
      setLoading(false);
    }
  }, [requestMediaLibraryPermission]);

  /**
   * Clear the currently selected image
   */
  const clearImage = useCallback((): void => {
    setSelectedImage(null);
  }, []);

  return {
    selectedImage,
    loading,
    error,
    takePicture,
    pickImage,
    clearImage,
  };
};

export default useImagePicker;
