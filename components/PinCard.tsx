import type { FC } from "react";
import {
  Image,
  View,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import * as Linking from "expo-linking";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { Pin } from "@/app/(tabs)";
import { ShareMenu } from "./ShareMenu";

export const PinCard: FC<{
  item: Pin;
  style: StyleProp<ViewStyle>;
  items: Pin[] | null;
}> = ({ item, style, items }) => {
  const [isShareMenuVisible, setShareMenuVisible] = useState(false);
  const [heightImage, setHeightImage] = useState(0);
  const isDarkMode = useColorScheme() === "dark";
  const [isHasImage, setHasImage] = useState(true);
  // let itemIndex = 0;
  const [itemIndex, setItemIndex] = useState(0);
  const navigation = useNavigation();

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

    getSize();
  }, []);
  // console.log(itemIndex);

  if (isHasImage) {
    return (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/detail-slide",
            params: { currentId: item._id, itemIndex },
          });
        }}
      >
        <View key={item._id} style={[{ marginTop: 5, flex: 1, gap: 0 }, style]}>
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
          {/* <Text>{!heightImage ? item._id : ""}</Text> */}
          <View>
            <View style={[{ flex: 1, alignItems: "flex-start", padding: 0 }]}>
              <TouchableOpacity
                style={styles.shareButton}
                onPress={() => setShareMenuVisible(true)}
              >
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={20}
                  color={isDarkMode ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
          </View>
          <ShareMenu
            visible={isShareMenuVisible}
            onClose={() => setShareMenuVisible(false)}
            item={item}
          />
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
