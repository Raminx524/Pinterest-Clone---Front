import { StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function NotificationScreen() {
  return (
    <View>
      <EditScreenInfo path="app/(tabs)/notification.tsx" />
    </View>
  );
}
