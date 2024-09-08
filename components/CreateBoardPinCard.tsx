import type { FC } from "react";
import {
  Image,
  View,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import * as Linking from "expo-linking";
import { Pin } from "@/app/(tabs)";
import { AntDesign } from "@expo/vector-icons";

export const CreateBoardPinCard: FC<{
  item: Pin;
  style: StyleProp<ViewStyle>;
  items: Pin[] | null;
  isActive: boolean;
  onPress: (pinId: string) => void;
}> = ({ item, style, items, isActive, onPress }) => {
  const [heightImage, setHeightImage] = useState(0);
  const isDarkMode = useColorScheme() === "dark";
  const [isHasImage, setHasImage] = useState(true);
  // let itemIndex = 0;
  const [itemIndex, setItemIndex] = useState(0);
  // const navigation = useNavigation();

  useEffect(() => {
    async function getSize() {
      try {
        const res = await Linking.canOpenURL(item.imageUrl);
        // console.log(item.imageUrl);

        if (!res) {
          setHasImage(false);
        } else {
          Image.getSize(item.imageUrl, (width, height) => {
            const screenWidth = Dimensions.get("window").width;
            const newWidth = (screenWidth - 50) * 0.5;
            const newHeight = (newWidth / width) * height;
            // console.log({ newHeight });

            setHeightImage(newHeight);
          });
        }
      } catch (e) {
        console.error("Error getting image size:", e);
      }
    }

    function getItemIndex() {
      // console.log({ items });

      if (!items) return null;
      setItemIndex(items.findIndex((pin) => pin._id === item._id));
    }

    getItemIndex();

    // console.log({ itemIndex });
    getSize();
  }, []);
  // console.log(itemIndex);

  if (isHasImage) {
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item._id);
        }}
      >
        <View key={item._id} style={[{ marginTop: 5, flex: 1, gap: 0 }, style]}>
          <View style={{ position: "relative" }}>
            <View
              style={{
                zIndex: 3,
                position: "absolute",
                bottom: 20,
                right: 20,
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                backgroundColor: "#fff",
              }}
            >
              {!isActive ? (
                <AntDesign
                  name="pushpin"
                  size={20}
                  color="black"
                  style={{ transform: [{ scaleX: -1 }] }}
                />
              ) : (
                <AntDesign name="checkcircle" size={30} color="black" />
              )}
            </View>
            <Image
              source={{
                uri: item.imageUrl,
              }}
              style={{
                height: heightImage ? heightImage : 300,
                alignSelf: "stretch",
                borderRadius: 20,
              }}
              resizeMode="stretch"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  shareButton: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
  },
});
