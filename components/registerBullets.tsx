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
            index < currentStep ? styles.activeBullet : styles.inactiveBullet,
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
    marginBottom: 20,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeBullet: {
    backgroundColor: "red",
  },
  inactiveBullet: {
    backgroundColor: "lightgray",
  },
});
