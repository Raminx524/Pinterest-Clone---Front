import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function Button(props) {
  const {
    onPress,
    title = "Save",
    isActive = false,
    type = "secondary",
  } = props;
  let activeStyleButton = {};
  let activeStyleText = {};
  if (isActive) {
    activeStyleButton = { backgroundColor: "white" };
    activeStyleText = { color: "black" };
    // styles.button.backgroundColor = "white";
    // styles.text.color = "black";
  }
  if (type == "primary") {
    activeStyleButton = { ...activeStyleButton, backgroundColor: "#E60023" };
    activeStyleText = { ...activeStyleText, color: "white" };
  }
  return (
    <Pressable style={[styles.button, activeStyleButton]} onPress={onPress}>
      <Text style={[styles.text, activeStyleText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderRadius: 50,
    elevation: 3,
    minWidth: 100,
    // backgroundColor: "black",
    backgroundColor: "gray",
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
