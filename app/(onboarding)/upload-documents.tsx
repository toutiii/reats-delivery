import { ThemedView } from '@/src/components/themed-view';
import { Box } from '@/src/components/ui/box';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Heading } from '@/src/components/ui/heading';
import { Pressable } from '@/src/components/ui/pressable';
import { Text } from '@/src/components/ui/text';
import { VStack } from '@/src/components/ui/vstack';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * Interface pour les propriétés du composant UploadSection
 */
interface UploadSectionProps {
   title: string;
   uploaded: boolean;
   onUpload: () => void;
   testID?: string;
}

type CardSide = 'front' | 'back';

const UploadDocumentsScreen: React.FC = () => {
   const insets = useSafeAreaInsets();
   const [frontPhotoUploaded, setFrontPhotoUploaded] = useState<boolean>(false);
   const [backPhotoUploaded, setBackPhotoUploaded] = useState<boolean>(false);

   // Function to handle document upload
   const handleUpload = (side: CardSide): void => {
      // In a real app, this would open camera or image picker
      if (side === 'front') {
         setFrontPhotoUploaded(true);
      } else {
         setBackPhotoUploaded(true);
      }
   };

   // Check if both photos are uploaded to enable submit button
   const canSubmit: boolean = frontPhotoUploaded && backPhotoUploaded;

   return (
      <ThemedView
         className="flex-1 pt-4"
         style={{
            paddingBottom: insets.bottom,
         }}
      >
         <StatusBar style="dark" />

         <View className="flex-1 px-6">
            <Box className="pt-4 pb-6">
               <Heading className="mb-1" size="2xl">
                  Aadhar card details
               </Heading>
               <Text className="text-base">
                  Upload focused photo of your Aadhar Card{'\n'}
                  for faster verification
               </Text>
            </Box>

            <VStack space="xl">
               {/* Upload Area - Front Side */}
               <UploadSection
                  title="Front side photo of your Aadhar card with your clear name and photo"
                  uploaded={frontPhotoUploaded}
                  onUpload={() => handleUpload('front')}
                  testID="upload-front-photo"
               />

               {/* Upload Area - Back Side */}
               <UploadSection
                  title="Back side photo of your Aadhar card with your clear name and photo"
                  uploaded={backPhotoUploaded}
                  onUpload={() => handleUpload('back')}
                  testID="upload-back-photo"
               />
            </VStack>
         </View>

         {/* Submit Button - Fixed at Bottom */}
         <Box
            className="px-6 pb-4"
            style={{
               paddingBottom: Math.max(insets.bottom, 16),
            }}
         >
            <Button
               size="xl"
               disabled={!canSubmit}
               onPress={() => canSubmit && router.back()}
               accessibilityLabel="Submit Aadhar card details"
               accessibilityHint={
                  canSubmit
                     ? 'Submit your uploaded documents'
                     : 'Upload both front and back photos to enable submission'
               }
               testID="submit-button"
            >
               <ButtonText className="text-white text-lg font-medium">
                  Submit
               </ButtonText>
            </Button>
         </Box>
      </ThemedView>
   );
};

/**
 * UploadSection Component
 *
 * Reusable component for document upload sections
 * Displays instructions and upload button for each side of document
 */
const UploadSection: React.FC<UploadSectionProps> = ({
   title,
   uploaded,
   onUpload,
   testID,
}) => {
   /**
    * Interface pour les props du render prop de Pressable
    */
   interface PressableRenderProps {
      pressed: boolean;
   }

   return (
      <Box
         className="border border-dashed border-gray-300 rounded-xl p-12 items-center"
         style={{
            borderWidth: 1,
            borderStyle: 'dashed',
         }}
         testID={testID}
      >
         {/* Instructions Text */}
         <Text
            className="text-gray-700 text-base text-center mb-4"
            style={{
               lineHeight: 24,
            }}
         >
            {title}
         </Text>

         {/* Upload Photo Button */}
         <Pressable
            onPress={onUpload}
            accessibilityRole="button"
            accessibilityLabel="Upload photo"
            accessibilityState={{ disabled: uploaded }}
            testID={`${testID}-button`}
         >
            {({ pressed }: PressableRenderProps) => (
               <Box
                  className={`flex-row items-center justify-center px-5 py-2.5 rounded-full border
                ${pressed ? 'opacity-80' : 'opacity-100'}
                ${uploaded ? 'bg-rose-50 border-rose-300' : 'bg-white border-rose-300'}`}
               >
                  <Feather
                     name="camera"
                     size={20}
                     color="#f87171"
                     className="mr-2"
                  />

                  <Text
                     className="text-rose-500 font-medium"
                     style={{
                        fontSize: 15,
                     }}
                  >
                     {uploaded ? 'Change Photo' : 'Upload Photo'}
                  </Text>
               </Box>
            )}
         </Pressable>
      </Box>
   );
};

export default UploadDocumentsScreen;
