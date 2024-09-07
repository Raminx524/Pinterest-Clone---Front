import {
  ActivityIndicator,
  // Button,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import {
  Gesture,
  GestureDetector,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import React, { ReactElement, useEffect, useState } from "react";
import { usePinContext } from "@/context/pinContext";
import MasonryList from "@react-native-seoul/masonry-list";
import { Pin } from "./(tabs)";
import { PinCard } from "@/components/PinCard";
import Button from "@/components/Button";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { Switch } from "@/components/Switch";
const { width: screenWidth } = Dimensions.get("window");

export default function Detail() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const threshold = 50;
  const initialMoveDown = useSharedValue(false);
  const horizontalMoveDetected = useSharedValue(false);
  const leftMoveDetected = useSharedValue(false);
  const rightMoveDetected = useSharedValue(false);
  const upMoveDetected = useSharedValue(false);

  const searchParams = useLocalSearchParams();
  const [heightImage, setHeightImage] = useState(300);
  const [isHasImage, setHasImage] = useState(true);

  const isTop = useSharedValue(false);
  const [currentPinId, setCurrentPinId] = useState(
    searchParams.currentId as string
  );
  // const [currentPin, setCurrentPin] = useState(null);
  // const [previousPin, setPreviousPin] = useState(null);
  // const [nextPin, setNextPin] = useState(null);

  const {
    getCurrentPin,
    getPrevPin,
    getNextPin,
    // changeOpacity,

    pins,
    setCurrentPage,
    currentPage,
  } = usePinContext();

  const [isPrevNextVisible, setIsPrevNextVisible] = useState(true);

  const [slides, setSlides] = useState([
    {
      _id: "0",
      key: "left",
      position: useSharedValue(-screenWidth),
      content:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit sed, sed nulla",
      imageUrl: "",
      visible: useSharedValue(true),
    },
    {
      _id: "0",
      key: "current",
      position: useSharedValue(0),
      content:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit sed, sed nulla",
      imageUrl: "",
      visible: useSharedValue(true),
    },
    {
      _id: "0",
      key: "right",
      position: useSharedValue(screenWidth),
      content:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit sed, sed nulla",
      imageUrl: "",
      visible: useSharedValue(true),
    },
  ]);

  useEffect(() => {
    console.log("useEffect");
    // changeOpacity(1);
    function getPrevNextCurrentPin() {
      setSlides((prevSlides) => {
        const left = prevSlides[0];
        const current = prevSlides[1];
        const right = prevSlides[2];
        console.log({ currentPinId });

        const currentPin = getCurrentPin(currentPinId);
        const prevPin = getPrevPin(currentPinId);
        const nextPin = getNextPin(currentPinId);
        console.log({ currentPin });

        return [
          { ...left, ...prevPin },
          { ...current, ...currentPin },
          { ...right, ...nextPin },
        ];
      });
    }
    async function getSize() {
      try {
        const res = await Linking.canOpenURL(slides[1].imageUrl);

        if (!res) {
          setHasImage(false);
        } else {
          Image.getSize(slides[1].imageUrl, (width, height) => {
            const screenWidth = Dimensions.get("window").width;
            const newWidth = screenWidth - 50;
            const newHeight = (newWidth / width) * height;

            setHeightImage(newHeight);
          });
        }
      } catch (e) {
        console.error("Error getting image size:", e);
      }
    }
    getSize();
    getCurrentPin(currentPinId);
    getPrevNextCurrentPin();
  }, [currentPinId]);

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart((event) => {
      // if (event.translationY === 0) {
      //   isTop.value = true;
      // }
      if (Math.abs(event.velocityX) > Math.abs(event.velocityY)) {
        horizontalMoveDetected.value = true;
        upMoveDetected.value = false;
        initialMoveDown.value = false;
        setIsPrevNextVisible(true);
      } else if (event.velocityY > 0) {
        initialMoveDown.value = true;
        upMoveDetected.value = false;
        horizontalMoveDetected.value = false;
        // isTop.value = true;
        setIsPrevNextVisible(false);
      } else if (event.velocityY < 0) {
        initialMoveDown.value = false;
        horizontalMoveDetected.value = false;
        upMoveDetected.value = true;
        isTop.value = false;
        setIsPrevNextVisible(true);
      }

      if (
        Math.abs(event.velocityX) > Math.abs(event.velocityY) &&
        event.velocityX > 0
      ) {
        leftMoveDetected.value = true;
        rightMoveDetected.value = false;
      } else if (
        Math.abs(event.velocityX) > Math.abs(event.velocityY) &&
        event.velocityX < 0
      ) {
        rightMoveDetected.value = true;
        leftMoveDetected.value = false;
      }
    })
    .onUpdate((event) => {
      if (horizontalMoveDetected.value) {
        translateX.value = event.translationX;
        translateY.value = 0;
      } else if (
        initialMoveDown.value &&
        !horizontalMoveDetected.value &&
        isTop.value
      ) {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      } else if (upMoveDetected) {
        console.log("upMoveDetected");
        isTop.value = true;
        // upMoveDetected.value = false;
        // translateY.value = event.translationY;
      } else {
        translateX.value = event.translationX;
        translateY.value = event.translationY;
      }
    })
    .onEnd(() => {
      // if (translateY.value <= 1) {
      //   isTop.value = false;
      // }
      if (
        initialMoveDown.value &&
        translateY.value > threshold &&
        !horizontalMoveDetected.value
      ) {
        router.back();
      } else if (horizontalMoveDetected.value && translateX.value > threshold) {
        setSlides((prevSlides) => {
          const left = prevSlides[0];
          const current = prevSlides[1];
          const right = prevSlides[2];

          right.position.value = -screenWidth;
          left.position.value = withSpring(0);
          current.position.value = withSpring(screenWidth);

          setCurrentPinId(left._id);

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
        setSlides((prevSlides) => {
          const left = prevSlides[0];
          const current = prevSlides[1];
          const right = prevSlides[2];

          current.position.value = withSpring(-screenWidth);
          right.position.value = withSpring(0);
          left.position.value = screenWidth;

          setCurrentPinId(right._id);

          return [
            { ...current, position: current.position },
            { ...right, position: right.position },
            { ...left, position: left.position },
          ];
        });
      }

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const enableScroll = useDerivedValue(() => {
    return isTop.value;
  }, [isTop.value]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderItem = ({ item, i }: { item: Pin; i: number }): ReactElement => {
    // console.log(data);
    return <PinCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 15 }} />;
  };
  console.log({ isPrevNextVisible });
  console.log({ isTop });

  return (
    <GestureDetector gesture={pan}>
      {/* <View style={styles.overlay}></View> */}
      {/* <ScrollView > */}
      <Animated.View style={[styles.modalContainer, animatedStyle]}>
        {slides.map((slide) => (
          <Animated.View
            key={slide.key}
            style={[
              styles.modalContent,
              useAnimatedStyle(() => ({
                transform: [
                  {
                    translateX: slide.position.value,
                  },
                  // {
                  //   translateY: slide.position.value,
                  // },
                ],
              })),
              (slide.key == slides[0].key || slide.key == slides[2].key) &&
              isPrevNextVisible
                ? { opacity: 1 }
                : slide.key == slides[1].key
                ? { opacity: 1 }
                : { opacity: 0 },
              slide.key == slides[1].key ? { zIndex: 1 } : { zIndex: 0 },
              { height: "100%" },
            ]}
          >
            <Animated.ScrollView
              onScroll={(event) => {
                console.log(isTop.value);

                if (event.nativeEvent.contentOffset.y <= 1) {
                  event.nativeEvent.contentOffset.y = 0;
                  // console.log("<0");

                  isTop.value = false;
                } else {
                  isTop.value = true;
                }
              }}
              scrollEnabled={enableScroll}
            >
              {/* <ScrollView
            // onScroll={(event) => {
            //   console.log({ event });
            // }}
            > */}
              <Image
                source={{ uri: slide.imageUrl }}
                style={{
                  height: heightImage ? heightImage : 300,
                  alignSelf: "stretch",
                  borderRadius: 20,
                }}
                resizeMode="stretch"
              />

              <View
                style={{
                  // flex: 1,
                  alignItems: "center",
                  // justifyContent: "",
                  flexDirection: "row",
                  padding: 20,
                }}
              >
                <View style={{ flex: 1, flexBasis: "10%" }}>
                  <Image
                    source={{ uri: "https://via.placeholder.com/40" }}
                    style={styles.profileImage}
                  />
                </View>
                <View style={{ flex: 1, flexBasis: "60%" }}>
                  <Text style={{ fontSize: 22, fontWeight: "600" }}>
                    Sophie Streckenbach
                  </Text>
                </View>
                <View style={{ flex: 1, flexBasis: "20%" }}>
                  <Button
                    title="Follow"
                    // isActive={true}
                  />
                </View>
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>
                  {/* {slide.title} */}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  {slide._id}
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "300" }}>
                  {/* {slide.description} */}
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Corrupti totam in accusamus, possimus maiores quasi repellat
                  nostrum laborum dicta architecto harum nihil distinctio
                </Text>
              </View>
              <View
                style={{
                  paddingTop: 20,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{}}>
                  <TouchableOpacity
                    style={{ position: "relative", width: 40, height: 40 }}
                  >
                    <FontAwesome
                      name="comment"
                      size={35}
                      color="black"
                      style={{ position: "absolute" }}
                    />
                    <AntDesign
                      name="heart"
                      size={12}
                      color="white"
                      style={{ position: "absolute", left: 11, top: 11 }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <Button title="Visit" />
                  <Button title="Save" type="primary" />
                </View>
                <View>
                  <TouchableOpacity>
                    <Entypo name="share-alternative" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              {/* <TouchableOpacity onPress={() => router.push("/detail")}>
                <Text>push</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.replace("/detail")}>
                <Text>replace</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.back()}>
                <Text>Close</Text>
              </TouchableOpacity> */}
              {pins ? (
                <MasonryList
                  scrollEnabled={false}
                  // onScroll={() => {
                  //   console.log("sdf");
                  // }}
                  keyExtractor={(item: Pin): string => item.id}
                  ListHeaderComponent={<View />}
                  contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 50,
                    alignSelf: "stretch",
                  }}
                  onEndReached={() => (this.callOnScrollEnd = true)}
                  onMomentumScrollEnd={() => {
                    console.log("End reached");
                    this.callOnScrollEnd && loadMore();
                    this.callOnScrollEnd = false;
                  }}
                  numColumns={2}
                  data={pins}
                  renderItem={renderItem as any}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#000" />
                </View>
              )}
            </Animated.ScrollView>
            {/* </ScrollView> */}
          </Animated.View>
        ))}
      </Animated.View>
      {/* </ScrollView> */}
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // zIndex: -10,
    backgroundColor: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 50,
    paddingTop: 100,
    // width: "100%",

    // top: 50,
  },
  modalContent: {
    marginHorizontal: 20,
    position: "absolute",
    // top: 0,
    backgroundColor: "white",
    borderRadius: 20,
    // paddingTop: 50,

    // padding: 20,
    // justifyContent: "center",
    // alignItems: "center",
    // zIndex: 1,
    height: "100%",
    width: "100%",
  },
  profileImageContainer: {
    // position: "absolute",
    // left: 0,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
