import LoginForm from '@/src/components/auth/login-form';
import { ThemedView } from '@/src/components/themed-view';
import { Center } from '@/src/components/ui/center';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const LoginScreen = () => {
   return (
      <ThemedView>
         <SafeAreaView className="flex-1">
            <Center className="justify-center my-10">
               <Animated.Image
                  entering={FadeIn.delay(300).duration(800)}
                  style={[{ width: 120 }]}
                  source={require('@/src/assets/images/logos/logo.png')}
                  resizeMode="contain"
                  accessibilityLabel="Delivery app logo"
               />
               <Animated.Text
                  entering={FadeIn.delay(600).duration(800)}
                  className="text-primary-500 text-3xl font-bold mt-2"
                  style={{ letterSpacing: -0.3 }}
               >
                  Delivery
               </Animated.Text>
            </Center>

            <LoginForm />
         </SafeAreaView>
      </ThemedView>
   );
};

export default LoginScreen;
