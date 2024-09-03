import type { FC } from "react";
import {
  Image,
  View,
  useColorScheme,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import * as Linking from "expo-linking";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import { Pin } from "@/app/(tabs)";
import { ShareMenu } from "./ShareMenu";

export const PinCard: FC<{ item: Pin; style: StyleProp<ViewStyle> }> = ({
  item,
  style,
  items,
}) => {
  const [isShareMenuVisible, setShareMenuVisible] = useState(false);
  const [heightImage, setHeightImage] = useState(0);
  const isDarkMode = useColorScheme() === "dark";
  const [isHasImage, setHasImage] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    async function getSize() {
      try {
        const res = await Linking.canOpenURL(item.image);

        if (!res) {
          setHasImage(false);
        } else {
          Image.getSize(item.image, (width, height) => {
            const screenWidth = Dimensions.get("window").width;
            const newWidth = (screenWidth - 50) * 0.5;
            const newHeight = (newWidth / width) * height;

            setHeightImage(newHeight);
          });
        }
      } catch (e) {
        console.error("Error getting image size:", e);
      }
    }
    getSize();
  }, []);

  if (isHasImage) {
    return (
      <TouchableOpacity
        onPress={() => {
          router.push({ pathname: "/detail", params: { currentId: item.id } });
        }}
      >
        <View key={item.id} style={[{ marginTop: 5, flex: 1, gap: 0 }, style]}>
          <Image
            source={{ uri: item.image }}
            style={{
              height: heightImage,
              alignSelf: "stretch",
              borderRadius: 20,
            }}
            resizeMode="stretch"
          />
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
