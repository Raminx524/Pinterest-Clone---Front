import { View, Text, Dimensions, FlatList, ViewToken } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { usePinContext } from "@/context/pinContext";
import { SlideItem } from "@/components/SlideItem";
import { Pin } from "./(tabs)";
import { useLocalSearchParams } from "expo-router";
import api from "@/utils/api.service";

export default function DetailSlide() {
  const { width, height } = Dimensions.get("screen");
  // const { pins } = usePinContext();
  // const [pin,setPin] = useState<Pin|null>(null);
  // const [relatedPins, setRelatedPins] = useState<Pin[]>([]);
  const [currentSlideId, setCurrentSlideId] = useState<string>("0");
  const { itemIndex, currentId, pins } = useLocalSearchParams();
  // const pinsDetails = JSON.parse(pins);
  const parsedPins = typeof pins === "string" ? JSON.parse(pins) : [];

  // console.log(parsedItems);

  //   console.log({ itemIndex });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<Pin>[] }) => {
      if (viewableItems.length >= 1) {
        setCurrentSlideId(viewableItems[0].item._id);
      }
    },
    []
  );

  useEffect(() => {
    async function getPinDetails() {
      const { data } = await api.get("/pin/" + currentId);
    }
    getPinDetails();
  }, []);

  return (
    <View>
      {/* <Text></Text> */}
      <FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        data={parsedPins}
        renderItem={({ item }) => (
          <SlideItem item={item} currentId={currentSlideId} />
        )}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        initialScrollIndex={+itemIndex}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        // onEndReached={() => console.log("sdfs")}
      ></FlatList>
    </View>
  );
}
