import RegisterForm from '@/src/components/auth/register-form';
import { ThemedView } from '@/src/components/themed-view';
import { Center } from '@/src/components/ui/center';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const RegisterScreen = () => {
   return (
      <ThemedView>
         <StatusBar style="inverted" />
         <SafeAreaView className="flex-1">
            <Center className="justify-center my-6">
               <Animated.Image
                  entering={FadeIn.delay(300).duration(800)}
                  style={[{ width: 100 }]}
                  source={require('@/src/assets/images/logos/logo.png')}
                  resizeMode="contain"
                  accessibilityLabel="Delivery app logo"
               />
               <Animated.Text
                  entering={FadeIn.delay(600).duration(800)}
                  className="text-primary-500 text-2xl font-bold "
                  style={{ letterSpacing: -0.3 }}
               >
                  Delivery
               </Animated.Text>
            </Center>
            <RegisterForm />
         </SafeAreaView>
      </ThemedView>
   );
};

export default RegisterScreen;
