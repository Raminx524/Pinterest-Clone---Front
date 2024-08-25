import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function SavedScreen() {
  return (
    <View>
      <EditScreenInfo path="app/(tabs)/saved.tsx" />
    </View>
  );
}
