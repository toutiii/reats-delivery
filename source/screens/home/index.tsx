import { ThemedView } from "@/components/themed-view";
import { SafeAreaView } from "react-native";
import DashboardScreen from "../dashboard";

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <SafeAreaView className="flex-1">
        <DashboardScreen />
      </SafeAreaView>
    </ThemedView>
  );
}
