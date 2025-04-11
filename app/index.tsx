import { ThemedView } from "@/src/components/themed-view";
import { Heading } from "@/src/components/ui/heading";
import React from "react";
import { SafeAreaView } from "react-native";

const StartPage = () => {
  return (
    <ThemedView>
      <SafeAreaView>
        <Heading>Start</Heading>
      </SafeAreaView>
    </ThemedView>
  );
};

export default StartPage;
