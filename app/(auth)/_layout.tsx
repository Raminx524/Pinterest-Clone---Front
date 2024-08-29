import React from "react";
import { Stack } from "expo-router";
import { RegisterProvider } from "@/context/registerContext";

export default function Layout() {
  return (
    <RegisterProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RegisterProvider>
  );
}
