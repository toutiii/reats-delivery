import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback } from 'react';
import { Image } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button, ButtonText } from '../../ui/button';
import { HStack } from '../../ui/hstack';

const SocialAuthButtons = () => {
   const handleGoogleLogin = useCallback(() => {
      // Implement Google login logic
      console.log('Google login initiated');
   }, []);

   const handleFacebookLogin = useCallback(() => {
      // Implement Facebook login logic
      console.log('Facebook login initiated');
   }, []);
   return (
      <>
         <Animated.View
            entering={FadeInDown.delay(1100).duration(500).springify()}
         >
            <Button
               className=" border border-gray-300"
               variant="outline"
               size="xl"
               onPress={handleGoogleLogin}
            >
               <HStack className="items-center justify-center">
                  <Image
                     source={require('@/src/assets/images/icons/google.png')}
                     className="w-5 h-5 mr-2"
                     resizeMode="contain"
                  />
                  <ButtonText className="text-black font-semibold" size="lg">
                     Continue with Google
                  </ButtonText>
               </HStack>
            </Button>
         </Animated.View>

         <Animated.View
            entering={FadeInDown.delay(1200).duration(500).springify()}
         >
            <Button
               className=" border border-gray-300"
               variant="outline"
               size="xl"
               onPress={handleFacebookLogin}
            >
               <HStack className="items-center justify-center">
                  <Ionicons
                     name="logo-facebook"
                     className="mr-2"
                     size={20}
                     color="#0063E0"
                  />
                  <ButtonText className="text-black font-semibold" size="lg">
                     Continue with Facebook
                  </ButtonText>
               </HStack>
            </Button>
         </Animated.View>
      </>
   );
};

export default SocialAuthButtons;
