import Orders from "@/components/orders";
import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native";

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <Orders />
      </SafeAreaView>
    </ThemedView>
  );
}
