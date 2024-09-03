import React from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  StyleSheet,
  Button,
  StyleProp,
  ViewStyle,

} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface ISwitchProps {
  value: SharedValue<boolean>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  trackColors?: {
    on: string;
    off: string;
  };
}

export const Switch = ({
  value,
  onPress,
  style,
  duration = 400,

  trackColors = { on: "#000", off: "#fff" },
}: ISwitchProps) => {

  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      value.value,
      [0, 1],
      [trackColors.off, trackColors.on]
    );
    const colorValue = withTiming(color, { duration });

    return {
      backgroundColor: colorValue,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(value.value),
      [0, 1],
      [0, width.value - height.value]
    );
    const translateValue = withTiming(moveValue, { duration });

    return {
      transform: [{ translateX: translateValue }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[switchStyles.track, style, trackAnimatedStyle]}
      >
        <Animated.View
          style={[switchStyles.thumb, thumbAnimatedStyle]}
        ></Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const switchStyles = StyleSheet.create({
  track: {
    alignItems: "flex-start",
    width: 100,
    height: 30,
    borderWidth: 1,
    borderColor: "#000",
  },
  thumb: {
    height: 28,
    aspectRatio: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#000",
  },
});

const styles = StyleSheet.create({
  switch: {
    width: 200,
    height: 80,
    padding: 10,
  },
  container: {
    flex: 1,
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    // paddingTop: "1rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
