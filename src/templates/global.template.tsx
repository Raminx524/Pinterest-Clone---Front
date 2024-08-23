import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function Global({ children }: { children: React.JSX.Element }) {
  return (
    <View className="flex-1 items-center justify-center ">{children}</View>
  );
}
