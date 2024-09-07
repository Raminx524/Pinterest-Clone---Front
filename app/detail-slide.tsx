import { View, Text, Dimensions, FlatList, ViewToken } from "react-native";
import React, { useCallback, useState } from "react";
import { usePinContext } from "@/context/pinContext";
import { SlideItem } from "@/components/SlideItem";
import { Pin } from "./(tabs)";
import { useLocalSearchParams } from "expo-router";

export default function DetailSlide() {
  const { width, height } = Dimensions.get("screen");
  const { pins } = usePinContext();
  const [currentSlideId, setCurrentSlideId] = useState<string>("0");
  const { itemIndex } = useLocalSearchParams();
  //   console.log({ itemIndex });

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken<Pin>[] }) => {
      if (viewableItems.length >= 1) {
        setCurrentSlideId(viewableItems[0].item._id);
      }
    },
    []
  );

  return (
    <View>
      {/* <Text></Text> */}
      <FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        data={pins}
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
