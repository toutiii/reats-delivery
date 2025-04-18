import { ThemedView } from '@/src/components/themed-view';
import { Box } from '@/src/components/ui/box';
import { Button, ButtonText } from '@/src/components/ui/button';
import { Center } from '@/src/components/ui/center';
import { Heading } from '@/src/components/ui/heading';
import { Text } from '@/src/components/ui/text';
import { VStack } from '@/src/components/ui/vstack';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, SafeAreaView } from 'react-native';
import Animated, {
   Easing,
   Extrapolate,
   interpolate,
   runOnJS,
   useAnimatedStyle,
   useSharedValue,
   withDelay,
   withSequence,
   withSpring,
   withTiming,
} from 'react-native-reanimated';

const AnimatedCenter = Animated.createAnimatedComponent(Center);
const AnimatedHeading = Animated.createAnimatedComponent(Heading);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedButton = Animated.createAnimatedComponent(Button);

const StartPage = () => {
   // Animation values
   const imageOpacity = useSharedValue(0);
   const imageScale = useSharedValue(0.8);
   const textOpacity = useSharedValue(0);
   const textTranslateY = useSharedValue(20);
   const buttonScale = useSharedValue(0.8);
   const buttonOpacity = useSharedValue(0);

   // Button press effect values
   const buttonPressScale = useSharedValue(1);

   // Animate illustration
   const imageAnimatedStyle = useAnimatedStyle(() => {
      return {
         opacity: imageOpacity.value,
         transform: [{ scale: imageScale.value }],
      };
   });

   // Animate headings
   const headingAnimatedStyle = useAnimatedStyle(() => {
      return {
         opacity: textOpacity.value,
         transform: [{ translateY: textTranslateY.value }],
      };
   });

   // Animate description
   const descriptionAnimatedStyle = useAnimatedStyle(() => {
      return {
         opacity: textOpacity.value,
         transform: [
            {
               translateY: interpolate(
                  textTranslateY.value,
                  [0, 20],
                  [0, 15],
                  Extrapolate.CLAMP
               ),
            },
         ],
      };
   });

   // Animate button
   const buttonAnimatedStyle = useAnimatedStyle(() => {
      return {
         opacity: buttonOpacity.value,
         transform: [{ scale: buttonPressScale.value * buttonScale.value }],
      };
   });

   // Handle navigation
   const handleGetStarted = () => {
      // Create button press effect
      buttonPressScale.value = withSequence(
         withTiming(0.95, { duration: 100 }),
         withTiming(1, { duration: 200 }, finished => {
            if (finished) {
               runOnJS(navigateToNextScreen)();
            }
         })
      );
   };

   const navigateToNextScreen = () => {
      router.push('/terms-and-conditions');
   };

   // Start animations when component mounts
   useEffect(() => {
      // Stagger all animations
      imageOpacity.value = withDelay(100, withTiming(1, { duration: 800 }));
      imageScale.value = withDelay(
         100,
         withSpring(1, {
            damping: 15,
            stiffness: 100,
         })
      );

      textOpacity.value = withDelay(600, withTiming(1, { duration: 800 }));
      textTranslateY.value = withDelay(
         600,
         withTiming(0, {
            duration: 800,
            easing: Easing.out(Easing.cubic),
         })
      );

      buttonOpacity.value = withDelay(1000, withTiming(1, { duration: 600 }));
      buttonScale.value = withDelay(
         1000,
         withSpring(1, {
            damping: 14,
            stiffness: 80,
         })
      );
   }, []);

   return (
      <ThemedView>
         <SafeAreaView className="flex-1">
            <Box className="flex-1">
               <VStack className="flex-1 px-6 justify-center items-center">
                  {/* Container de l'illustration avec animation */}
                  <AnimatedCenter
                     className="w-full h-[45%] mb-2"
                     style={imageAnimatedStyle}
                  >
                     <Image
                        source={require('@/src/assets/images/onboarding/shipping.png')}
                        className="w-[90%] h-[90%]"
                        resizeMode="contain"
                     />
                  </AnimatedCenter>

                  {/* Conteneur de texte avec animations */}
                  <VStack className="items-center w-full mb-8 space-y-1">
                     <AnimatedHeading
                        className="text-2xl font-bold text-black text-center"
                        style={headingAnimatedStyle}
                     >
                        Explore now
                     </AnimatedHeading>
                     <AnimatedText
                        className="text-2xl font-bold text-black text-center mb-4"
                        style={headingAnimatedStyle}
                     >
                        to experience the benefits
                     </AnimatedText>

                     <AnimatedText
                        className="text-base text-gray-500 text-center leading-6 max-w-[90%]"
                        style={descriptionAnimatedStyle}
                     >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore
                     </AnimatedText>
                  </VStack>

                  {/* Bouton Get Started avec animation */}
                  <AnimatedButton
                     className="w-full mt-5"
                     size="xl"
                     style={buttonAnimatedStyle}
                     onPress={handleGetStarted}
                  >
                     <ButtonText className="text-lg font-semibold text-white">
                        Get Started
                     </ButtonText>
                  </AnimatedButton>
               </VStack>
            </Box>
         </SafeAreaView>
      </ThemedView>
   );
};

export default StartPage;
