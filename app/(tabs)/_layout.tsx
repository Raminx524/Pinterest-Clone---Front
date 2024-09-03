import React, { useContext, useEffect, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Redirect, router, Tabs, useSegments } from "expo-router";
import {
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import Fontisto from "@expo/vector-icons/Fontisto";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { AuthContext } from "@/context/authContext";
import { CreateModal } from "@/components/CreateModal";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user, loading } = useContext(AuthContext);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  if (!user) return <Redirect href="/(auth)/authIndex" />;

  const openCreateModal = () => setCreateModalVisible(true);
  const closeCreateModal = () => setCreateModalVisible(false);

  return (
    <>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: false,
          // tabBarStyle:
          tabBarActiveTintColor: colorScheme == "dark" ? "white" : "black",
          tabBarInactiveTintColor: "gray",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Fontisto name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="search" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="plus" size={24} color={color} />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity {...props} onPress={openCreateModal} />
            ),
            tabBarStyle: { display: "none" },
          }}
        />

        <Tabs.Screen
          name="notification"
          options={{
            title: "Notification",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="commenting" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            tabBarIcon: ({ color }) => (
              <FontAwesome name="user" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
      <CreateModal visible={createModalVisible} onClose={closeCreateModal} />
    </>
  );
}
