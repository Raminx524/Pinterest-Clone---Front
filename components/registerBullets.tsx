import React from "react";
import { View, StyleSheet } from "react-native";

interface ProgressIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

export default function ProgressIndicator({
  totalSteps,
  currentStep,
}: ProgressIndicatorProps) {
  return (
    <View style={styles.container}>
      {[...Array(totalSteps)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.bullet,
            index === currentStep - 1
              ? styles.activeBullet
              : styles.inactiveBullet,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeBullet: {
    backgroundColor: "white",
    height: 7,
    width: 7,
    borderWidth: 2,
    borderColor: "#000",
  },
  inactiveBullet: {
    backgroundColor: "black",
  },
});
