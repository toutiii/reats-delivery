import { ThemedView } from '@/src/components/themed-view';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Heading } from '@/src/components/ui/heading';
import { Text } from '@/src/components/ui/text';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

const DeliveryConfirmation = () => {
   return (
      <ThemedView>
         <View className="flex-1 justify-center items-center px-12">
            <View className="w-24 h-24 rounded-full bg-[#FF6347] justify-center items-center mb-6">
               <Feather
                  color="white"
                  size={42}
                  strokeWidth={3}
                  name="check-circle"
               />
            </View>

            <Heading className="text-center text-2xl font-bold mb-3">
               Your application is submitted successfully
            </Heading>

            <Text className="text-center mb-8 px-2">
               Please wait and check your application status under My
               Application
            </Text>
            <Button className="w-full" variant="outline" size="lg">
               <ButtonText>Okay</ButtonText>
            </Button>
         </View>
      </ThemedView>
   );
};

export default DeliveryConfirmation;
