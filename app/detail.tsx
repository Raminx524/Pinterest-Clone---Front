import { StatusBar } from "expo-status-bar";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import React, { useEffect, useState } from "react";

const { width: screenWidth } = Dimensions.get("window");

export default function Detail() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const threshold = 50;
  const initialMoveDown = useSharedValue(false);
  const horizontalMoveDetected = useSharedValue(false);
  const leftMoveDetected = useSharedValue(false);
  const rightMoveDetected = useSharedValue(false);

  const [slides, setSlides] = useState([
    {
      key: "left",
      position: useSharedValue(-screenWidth),
      content: "Left Slide Content",
    },
    {
      key: "current",
      position: useSharedValue(0),
      content: "Current Slide Content",
    },
    {
      key: "right",
      position: useSharedValue(screenWidth),
      content: "Right Slide Content",
    },
  ]);

  useEffect(() => {
    console.log("useEffect");

    console.log("data");
    console.log("slide0", slides[0].position.value, slides[0].key);
    console.log("slide1", slides[1].position.value, slides[1].key);
    console.log("slide2", slides[2].position.value, slides[2].key);
    console.log("translateX", translateX.value);
  }, [slides]);

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
      if (
        initialMoveDown.value &&
        translateY.value > threshold &&
        !horizontalMoveDetected.value
      ) {
        console.log("Threshold reached, going back");
        router.back();
      } else if (horizontalMoveDetected.value && translateX.value > threshold) {
        setSlides((prevSlides) => {
          console.log("translate left");
          const left = prevSlides[0];
          const current = prevSlides[1];
          const right = prevSlides[2];

          right.position.value = -screenWidth;
          left.position.value = withSpring(0);
          current.position.value = withSpring(screenWidth);

          return [
            { ...right, position: right.position },
            { ...left, position: left.position },
            { ...current, position: current.position },
          ];
        });
      } else if (
        horizontalMoveDetected.value &&
        translateX.value < -threshold
      ) {
        console.log("translate right");
        console.log(slides);

        setSlides((prevSlides) => {
          const left = prevSlides[0];
          const current = prevSlides[1];
          const right = prevSlides[2];

          current.position.value = withSpring(-screenWidth);
          right.position.value = withSpring(0);
          left.position.value = screenWidth;

          return [
            { ...current, position: current.position },
            { ...right, position: right.position },
            { ...left, position: left.position },
          ];
        });
      }

      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));
  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.modalContainer, animatedStyle]}>
        {slides.map((slide) => (
          <Animated.View
            key={slide.key}
            style={[
              styles.modalContent,
              useAnimatedStyle(() => ({
                transform: [{ translateX: slide.position.value }],
              })),
            ]}
          >
            <Text>{slide.content}</Text>
            <TouchableOpacity onPress={() => router.push("/detail")}>
              <Text>push</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.replace("/detail")}>
              <Text>replace</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()}>
              <Text>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
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
  modalContent: {
    position: "absolute",

    width: 300,
    height: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
});
