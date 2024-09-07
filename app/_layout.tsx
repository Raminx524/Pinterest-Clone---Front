import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { useRouter, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { AuthContext, AuthContextProvider } from "@/context/authContext";
import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { firebase } from "@react-native-firebase/auth";
import { firebaseConfig } from "@/config/firebaseConfig";
import { PinContextProvider, usePinContext } from "@/context/pinContext";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const colorScheme = useColorScheme(); // Ensure this is not conditionally used

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PinContextProvider>
        <AuthContextProvider>
          <RootLayoutNav />
        </AuthContextProvider>
      </PinContextProvider>
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!loading) {
      const inAuthGroup = segments[0]?.startsWith("(auth)");

      if (user && inAuthGroup) {
        router.replace("/(tabs)");
      } else if (!user && !inAuthGroup) {
        router.replace("/(auth)/authIndex");
      }
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        {/* <Stack.Screen name="(tabs)/create" options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="detail"
          options={{
            presentation: "transparentModal",
            headerShown: false,
            gestureEnabled: true,
            contentStyle: {
              backgroundColor: `rgba(0, 0, 0, 0.7)`,
            },
            fullScreenGestureEnabled: true,
          }}
        />
        <Stack.Screen
          name="detail-slide"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
