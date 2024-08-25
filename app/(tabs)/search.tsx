import { SafeAreaView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function SearchScreen() {
  return (
    <SafeAreaView>
      <View>
        <EditScreenInfo path="app/(tabs)/search.tsx" />
      </View>
    </SafeAreaView>
  );
}
