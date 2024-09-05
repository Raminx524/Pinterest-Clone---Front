import type { ReactElement } from "react";
import {
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Colors } from "react-native/Libraries/NewAppScreen";
import MasonryList from "@react-native-seoul/masonry-list";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { usePinContext } from "@/context/pinContext";
import { PinCard } from "@/components/PinCard";

export interface Pin {
  id: string;
  imgURL: string;
  text: string;
}

export default function TabOneScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const { pins, setPins, currentPage, setCurrentPage } = usePinContext();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const renderItem = ({ item, i }: { item: Pin; i: number }): ReactElement => {
    // console.log(data);
    return <PinCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 15 }} />;
  };

  return (
    <View style={backgroundStyle}>
      {/* Temp Log Out Btn */}
      <TouchableOpacity
        onPress={async () => {
          try {
            await auth().signOut();
            router.replace("/(auth)/authIndex");
          } catch (err) {
            console.log(err);
          }
        }}
        style={{
          backgroundColor: "#000",
          marginTop: 35,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 99,
          width: 150,
          height: 50,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Log Out</Text>
      </TouchableOpacity>
      {/* <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} /> */}
      {pins ? (
        <MasonryList
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
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </View>
  );
}
