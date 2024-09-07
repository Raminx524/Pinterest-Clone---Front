import { Pin } from "@/app/(tabs)";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "./Themed";
import { ReactElement, useEffect, useRef, useState } from "react";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import Button from "./Button";
import { usePinContext } from "@/context/pinContext";
import MasonryList from "@react-native-seoul/masonry-list";
import { PinCard } from "./PinCard";
import { ScrollView } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("screen");

// let imageHeight = 300;

export const SlideItem = ({
  item,
  currentId,
}: {
  item: Pin;
  currentId: string;
}) => {
  const [imageHeight, setImageHeight] = useState(0);
  const { pins, currentPage, setCurrentPage } = usePinContext();
  const [relatedPins, setRelatedPins] = useState<Pin[] | null>(null);
  const callOnScrollEnd = useRef(false);

  useEffect(() => {
    function getHeight() {
      Image.getSize(item.imageUrl, (width, height) => {
        const screenWidth = Dimensions.get("window").width;
        const newWidth = screenWidth - 50;
        const newHeight = (newWidth / width) * height;

        setImageHeight(newHeight);
      });
    }
    getHeight();
  }, []);

  useEffect(() => {
    function getPins() {
      if (item._id === currentId) setRelatedPins(pins || null);
    }
    getPins();
  }, [currentId]);

  const renderItem = ({ item, i }: { item: Pin; i: number }): ReactElement => {
    // console.log(data);
    return (
      <PinCard
        item={item}
        items={relatedPins}
        style={{ marginLeft: i % 2 === 0 ? 0 : 15 }}
      />
    );
  };

  //   const loadMore = () => {
  //     setCurrentPage(currentPage + 1);
  //   };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: item.imageUrl }}
        style={(styles.image, { height: imageHeight })}
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
            {/* Sophie Streckenbach */}
            {item.user.username}
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
        <Text style={{ fontSize: 22, fontWeight: "700" }}>{item.title}</Text>
        <Text style={{ fontSize: 16, fontWeight: "300" }}>
          {item.description}
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

      {relatedPins ? (
        <MasonryList
          keyExtractor={(item: Pin): string => item._id}
          ListHeaderComponent={<View />}
          scrollEnabled={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 50,
            alignSelf: "stretch",
            backgroundColor: "white",
          }}
          //   onEndReached={() => {
          //     callOnScrollEnd.current = true;
          //   }}
          //   onMomentumScrollEnd={() => {
          //     console.log("End reached");
          //     if (callOnScrollEnd.current) loadMore();
          //     callOnScrollEnd.current = false;
          //   }}
          numColumns={2}
          data={relatedPins}
          renderItem={renderItem as any}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { width, height },
  image: {
    width: width,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
