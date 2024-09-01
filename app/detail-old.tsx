import { StatusBar } from "expo-status-bar";
import { Dimensions, Platform, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width: screenWidth } = Dimensions.get("window");
export default function Detail() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const initialMoveDown = useSharedValue(false);
  const horizontalMoveDetected = useSharedValue(false);
  const leftMoveDetected = useSharedValue(false);
  const rightMoveDetected = useSharedValue(false);
  const threshold = 50;
  const leftSlidePosition = useSharedValue(-100);
  const currentSlidePosition = useSharedValue(0);
  const rightSlidePosition = useSharedValue(0);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart((event) => {
      if (Math.abs(event.velocityX) > Math.abs(event.velocityY)) {
        //User started moving horizontally
        console.log("User started moving horizontally");
        horizontalMoveDetected.value = true;
        initialMoveDown.value = false;
      } else if (event.velocityY > 0) {
        //User started moving down
        console.log("User started moving down");
        initialMoveDown.value = true;
        horizontalMoveDetected.value = false;
      } else {
        //User started moving up
        console.log("User started moving up");
        initialMoveDown.value = false;
        horizontalMoveDetected.value = false;
      }

      if (
        Math.abs(event.velocityX) > Math.abs(event.velocityY) &&
        event.velocityX > 0
      ) {
        //User started moving right
        console.log("User started moving right");

        leftMoveDetected.value = true;
        rightMoveDetected.value = false;
      } else if (
        Math.abs(event.velocityX) > Math.abs(event.velocityY) &&
        event.velocityX < 0
      ) {
        //User started moving left
        console.log("User started moving left");

        rightMoveDetected.value = true;
        leftMoveDetected.value = false;
      }
    })
    .onUpdate((event) => {
      if (horizontalMoveDetected.value) {
        translateX.value = event.translationX;
        translateY.value = 0;
      } else {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      }
    })
    .onEnd(() => {
      console.log("onEnd called");

      if (
        initialMoveDown.value &&
        translateY.value > threshold &&
        !horizontalMoveDetected.value
      ) {
        console.log("Threshold reached, going back");
        router.back();
      } else if (horizontalMoveDetected.value && translateX.value > threshold) {
        console.log("left translation");
        translateX.value = withSpring(0);
        currentSlidePosition.value = withSpring(screenWidth);
        leftSlidePosition.value = withSpring(screenWidth);
        rightSlidePosition.value = withSpring(-screenWidth * 2);
      } else if (horizontalMoveDetected.value && translateX.value < threshold) {
        console.log("right translation");
        leftSlidePosition.value = withSpring(screenWidth * 2);
        currentSlidePosition.value = withSpring(-screenWidth);
        rightSlidePosition.value = withSpring(-screenWidth);
        translateX.value = withSpring(0);
      } else {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
        currentSlidePosition.value = withSpring(0);

        leftSlidePosition.value = withSpring(-100);
      }
      initialMoveDown.value = false;
      horizontalMoveDetected.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const leftSlideAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftSlidePosition.value }],
  }));

  const currentSlideAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: currentSlidePosition.value }],
  }));

  const rightSlidePositionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightSlidePosition.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.modalContainer, animatedStyle]}>
        <Animated.View
          style={[
            styles.modalContent,
            styles.sideWindowLeft,
            leftSlideAnimatedStyle,
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              router.push("/detail");
            }}
          >
            <Text>push</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.replace("/detail");
            }}
          >
            <Text>replace</Text>
          </TouchableOpacity>
          <Text>Detail Page Content</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.modalContent, currentSlideAnimatedStyle]}>
          <TouchableOpacity
            onPress={() => {
              router.push("/detail");
            }}
          >
            <Text>push</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.replace("/detail");
            }}
          >
            <Text>replace</Text>
          </TouchableOpacity>
          <Text>Detail Page Content</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[styles.sideWindowRight, rightSlidePositionAnimatedStyle]}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sideWindowLeft: {
    position: "absolute",
    left: "-100%", // Полностью за левую границу экрана
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
  },
  sideWindowRight: {
    position: "absolute",
    right: "-100%", // Полностью за правую границу экрана
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
  },
  modalContent: {
    width: 300,
    height: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1, // Основное окно должно быть выше боковых
  },
});
