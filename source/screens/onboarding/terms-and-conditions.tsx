import CustomBackground from "@/components/custom-background";
import { ThemedView } from "@/components/themed-view";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import type { StackNavigation } from "@/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Image, View } from "react-native";

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const [isChecked, setIsChecked] = useState(false);

  // Animation values for dots
  const dotAnim1 = useRef(new Animated.Value(0)).current;
  const dotAnim2 = useRef(new Animated.Value(0)).current;
  const dotAnim3 = useRef(new Animated.Value(0)).current;
  const dotAnim4 = useRef(new Animated.Value(0)).current;
  const dotAnim5 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence for each dot
    const animateDots = () => {
      // Reset <animations></animations>
      dotAnim1.setValue(0);
      dotAnim2.setValue(0);
      dotAnim3.setValue(0);
      dotAnim4.setValue(0);
      dotAnim5.setValue(0);

      // Create animation sequences with different timings and patterns
      Animated.parallel([
        Animated.loop(
          Animated.sequence([
            Animated.timing(dotAnim1, {
              toValue: 1,
              duration: 3000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(dotAnim1, {
              toValue: 0,
              duration: 3000,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(dotAnim2, {
              toValue: 1,
              duration: 4000,
              easing: Easing.inOut(Easing.circle),
              useNativeDriver: true,
            }),
            Animated.timing(dotAnim2, {
              toValue: 0,
              duration: 4000,
              easing: Easing.inOut(Easing.circle),
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(dotAnim3, {
              toValue: 1,
              duration: 5000,
              easing: Easing.inOut(Easing.cubic),
              useNativeDriver: true,
            }),
            Animated.timing(dotAnim3, {
              toValue: 0,
              duration: 5000,
              easing: Easing.inOut(Easing.cubic),
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(dotAnim4, {
              toValue: 1,
              duration: 4500,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
            Animated.timing(dotAnim4, {
              toValue: 0,
              duration: 4500,
              easing: Easing.inOut(Easing.quad),
              useNativeDriver: true,
            }),
          ])
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(dotAnim5, {
              toValue: 1,
              duration: 3500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(dotAnim5, {
              toValue: 0,
              duration: 3500,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    };

    animateDots();
  }, []);

  // Interpolate animation values for each dot
  const dot1Transform = {
    transform: [
      {
        translateY: dotAnim1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -10],
        }),
      },
      {
        translateX: dotAnim1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 5],
        }),
      },
    ],
  };

  const dot2Transform = {
    transform: [
      {
        translateY: dotAnim2.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 8],
        }),
      },
      {
        translateX: dotAnim2.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8],
        }),
      },
    ],
  };

  const dot3Transform = {
    transform: [
      {
        translateY: dotAnim3.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -7],
        }),
      },
      {
        translateX: dotAnim3.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -5],
        }),
      },
    ],
  };

  const dot4Transform = {
    transform: [
      {
        translateY: dotAnim4.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 10],
        }),
      },
      {
        translateX: dotAnim4.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 5],
        }),
      },
    ],
  };

  const dot5Transform = {
    transform: [
      {
        translateY: dotAnim5.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 6],
        }),
      },
      {
        translateX: dotAnim5.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -6],
        }),
      },
    ],
  };

  // Animation for dot opacity
  const dot1Opacity = dotAnim1.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.8, 0.6],
  });

  const dot2Opacity = dotAnim2.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.9, 0.6],
  });

  const dot3Opacity = dotAnim3.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.7, 0.6],
  });

  const dot4Opacity = dotAnim4.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.8, 0.6],
  });

  const dot5Opacity = dotAnim5.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.6, 0.7, 0.6],
  });

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <ThemedView className="flex-1">
      <StatusBar style="dark" />
      <View className="flex-1 bg-white pb-20">
        <Box className="flex-1">
          <CustomBackground>
            {/* Background with proper curvature */}
            <LinearGradient colors={["#ffd1cc", "#ffc6c0"]} className="absolute top-0 left-0 right-0 bottom-0" />

            {/* Animated dots in the background */}
            <Animated.View style={[dot1Transform, { position: "absolute", top: 144, left: 128 }]}>
              <Animated.View className="w-2 h-2 bg-white rounded-full" style={{ opacity: dot1Opacity }} />
            </Animated.View>

            <Animated.View style={[dot2Transform, { position: "absolute", top: 208, left: 256 }]}>
              <Animated.View className="w-2 h-2 bg-white rounded-full" style={{ opacity: dot2Opacity }} />
            </Animated.View>

            <Animated.View style={[dot3Transform, { position: "absolute", top: 64, right: 64 }]}>
              <Animated.View className="w-2 h-2 bg-white rounded-full" style={{ opacity: dot3Opacity }} />
            </Animated.View>

            <Animated.View style={[dot4Transform, { position: "absolute", right: 40, top: 256 }]}>
              <Animated.View className="w-2 h-2 bg-white rounded-full" style={{ opacity: dot4Opacity }} />
            </Animated.View>

            <Animated.View style={[dot5Transform, { position: "absolute", left: 40, top: 240 }]}>
              <Animated.View className="w-2 h-2 bg-white rounded-full" style={{ opacity: dot5Opacity }} />
            </Animated.View>

            {/* Illustration */}
            <View className="justify-center items-center px-6 pt-40">
              <Box className="w-full aspect-square max-h-80">
                <Image source={require("@/assets/images/onboarding/delivery-illustration.png")} alt="Delivery Partner" className="w-full h-full" resizeMode="contain" />
              </Box>
            </View>

            {/* Texts */}
            <VStack className="px-8 pt-4 pb-6">
              <Text className="text-gray-800 text-lg font-semibold">Be a EatFit Partner</Text>
              <Text className="text-3xl font-bold text-gray-900 mt-1">Get a stable monthly income</Text>
            </VStack>
          </CustomBackground>
        </Box>

        {/* Bottom Section */}
        <Box className="px-6 py-6">
          {/* Terms Checkbox */}
          <HStack className="items-start mb-6" space="md">
            <Pressable onPress={toggleCheckbox} className="pt-1">
              <Box className={`h-5 w-5 border border-gray-300 rounded ${isChecked
? "bg-white"
: "bg-white"}`}>{isChecked && <Box className="h-3 w-3 bg-rose-400 m-auto" />}</Box>
            </Pressable>
            <Text className="flex-1 text-gray-700">
              By signing up I agree to the <Text className="text-rose-400">Terms of use</Text> and <Text className="text-rose-400">Privacy Policy</Text>.
            </Text>
          </HStack>

          {/* Continue Button */}
          <Button size="lg" disabled={!isChecked} className={isChecked
? ""
: "bg-primary-200"} onPress={() => navigation.navigate("LoginScreen")}>
            <ButtonText className="">Continuer</ButtonText>
          </Button>
        </Box>
      </View>
    </ThemedView>
  );
};

export default TermsAndConditionsScreen;
