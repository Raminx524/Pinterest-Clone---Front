import React from "react";
import { Stack } from "expo-router";

const CreateLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#fff" },
        }}
      >
        <Stack.Screen
          name="board"
          options={{
            animation: "slide_from_bottom",
            presentation: "modal",
          }}
        />
        <Stack.Screen name="collage" />
        <Stack.Screen name="pin" />
        <Stack.Screen name="searchPins" />
      </Stack>
    </>
  );
};

export default CreateLayout;
