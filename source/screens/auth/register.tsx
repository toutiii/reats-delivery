import RegisterForm from "@/components/auth/register-form";
import { ThemedView } from "@/components/themed-view";
import { Center } from "@/components/ui/center";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

const RegisterScreen = () => {
  return (
    <KeyboardAvoidingView behavior="padding" className="flex-1">
      <ThemedView>
        <StatusBar style="dark" />
        <SafeAreaView className="flex-1">
          <ScrollView showsVerticalScrollIndicator={false}>
            <Center className="justify-center my-4">
              <Animated.Image entering={FadeIn.delay(300).duration(800)} style={[{ width: 100 }]} source={require("@/assets/images/logos/logo.png")} resizeMode="contain" accessibilityLabel="Delivery app logo" />
              <Animated.Text entering={FadeIn.delay(600).duration(800)} className="text-primary-500 text-2xl font-bold " style={{ letterSpacing: -0.3 }}>
                Delivery
              </Animated.Text>
            </Center>
            <RegisterForm />
          </ScrollView>
        </SafeAreaView>
      </ThemedView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
