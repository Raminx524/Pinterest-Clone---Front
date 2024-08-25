import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function CreateScreen() {
  return (
    <View>
      <EditScreenInfo path="app/(tabs)/create.tsx" />
    </View>
  );
}
