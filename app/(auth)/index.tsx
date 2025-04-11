import SocialAuthButtons from '@/src/components/auth/social-auth-buttons';
import { ThemedView } from '@/src/components/themed-view';
import { Box } from '@/src/components/ui/box';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Center } from '@/src/components/ui/center';
import { HStack } from '@/src/components/ui/hstack';
import { Text } from '@/src/components/ui/text';
import { VStack } from '@/src/components/ui/vstack';
import { router } from 'expo-router';
import React, { FC, useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import Animated, {
   Extrapolate,
   FadeIn,
   FadeInDown,
   interpolate,
   useAnimatedStyle,
   useSharedValue,
   withTiming,
} from 'react-native-reanimated';

const AnimatedHStack = Animated.createAnimatedComponent(HStack);

const AuthChoiceScreen: FC = () => {
   const logoScale = useSharedValue(0.8);

   // Logo animation
   const logoAnimatedStyle = useAnimatedStyle(() => {
      const rotateValue = interpolate(
         logoScale.value,
         [0.8, 1],
         [0, 360],
         Extrapolate.CLAMP
      );

      return {
         transform: [
            { scale: logoScale.value },
            { rotate: `${rotateValue}deg` },
         ],
      };
   });

   useEffect(() => {
      logoScale.value = withTiming(1, { duration: 800 });
   }, []);

   // Navigation handlers
   const navigateToLogin = useCallback(() => {
      router.push('/(auth)/login');
   }, []);

   const navigateToSignUp = useCallback(() => {
      router.push('/(auth)/register');
   }, []);

   return (
      <ThemedView>
         <SafeAreaView className="flex-1">
            <VStack className="px-6 flex-1 mt-16" space="4xl">
               {/* Logo section */}
               <Center className="justify-center my-10">
                  <Animated.Image
                     entering={FadeIn.delay(300).duration(800)}
                     style={[logoAnimatedStyle, { width: 160 }]}
                     source={require('@/src/assets/images/logos/logo.png')}
                     resizeMode="contain"
                     accessibilityLabel="Delivery app logo"
                  />
                  <Animated.Text
                     entering={FadeIn.delay(600).duration(800)}
                     className="text-primary-500 text-3xl font-bold mt-6"
                     style={{ letterSpacing: -0.3 }}
                  >
                     Delivery
                  </Animated.Text>
               </Center>

               {/* Buttons section */}
               <VStack className="w-full" space="2xl">
                  <Animated.View
                     entering={FadeInDown.delay(800).duration(500).springify()}
                  >
                     <Button size="xl" onPress={navigateToLogin}>
                        <ButtonText size="lg">Log In</ButtonText>
                     </Button>
                  </Animated.View>

                  <Animated.View
                     entering={FadeInDown.delay(900).duration(500).springify()}
                  >
                     <Button
                        variant="outline"
                        size="xl"
                        onPress={navigateToSignUp}
                     >
                        <ButtonText size="lg">Sign Up</ButtonText>
                     </Button>
                  </Animated.View>

                  {/* Divider */}
                  <AnimatedHStack
                     entering={FadeInDown.delay(1000).duration(500)}
                     className="items-center my-4"
                  >
                     <Box className="flex-1 h-[1px] bg-gray-300" />
                     <Text className="mx-4 text-gray-500">Or</Text>
                     <Box className="flex-1 h-[1px] bg-gray-300" />
                  </AnimatedHStack>

                  {/* Social Auth Buttons */}
                  <SocialAuthButtons />
               </VStack>
            </VStack>
         </SafeAreaView>
      </ThemedView>
   );
};

export default AuthChoiceScreen;
