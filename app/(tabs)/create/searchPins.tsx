import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import api from "@/utils/api.service";
import { CreateBoardPinCard } from "@/components/CreateBoardPinCard";
import { Pin } from "@/app/(tabs)/index";
import { useLocalSearchParams, useRouter } from "expo-router";

const searchPins = () => {
  const [pins, setPins] = useState<Pin[]>([]);
  const [activePins, setActivePins] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isVisible, collaborators, title, user } = useLocalSearchParams();
  console.log({ isVisible, collaborators, title, user });

  const togglePinHandler = (pinId: string) => {
    const isExist = activePins.includes(pinId);
    if (isExist) setActivePins((prev) => prev.filter((pin) => pin !== pinId));
    else setActivePins((prev) => [...prev, pinId]);
  };

  const handleNext = async () => {
    const newBoard = {
      isVisible,
      user,
      title,
      collaborators: collaborators === "" ? [] : collaborators.split(","),
      pins: activePins,
    };
    try {
      const res = await api.post("/board", newBoard);
      console.log(res.data);
      router.replace("/(tabs)/saved");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getPins = async () => {
      setLoading(true);
      try {
        const res = await api.get("/pin");
        setPins(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getPins();
  }, []);
  if (loading || pins.length < 1)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <SafeAreaView style={searchPinsStyles.modalContainer}>
      <View style={searchPinsStyles.header}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <FontAwesome6 name="x" size={18} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Add Pins</Text>
        </View>
        <TouchableOpacity style={searchPinsStyles.button} onPress={handleNext}>
          <Text style={{ color: "white" }}>Done</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        contentContainerStyle={{
          width: Dimensions.get("screen").width,
        }}
        numColumns={2}
        keyExtractor={(item: any) => item._id}
        data={pins}
        renderItem={({ item, i }: any) => {
          return (
            <CreateBoardPinCard
              item={item}
              items={pins}
              isActive={activePins.includes(item._id)}
              onPress={togglePinHandler}
              style={{
                marginLeft: i % 2 === 0 ? 0 : 15,
                width: Dimensions.get("screen").width / 2 - 25,
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};
const searchPinsStyles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 12,
    position: "relative",
    margin: 0,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    width: 60,
    height: 45,
    backgroundColor: "#d60021",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
  },
});
export default searchPins;
