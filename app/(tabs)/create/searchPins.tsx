import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import api from "@/utils/api.service";

const searchPins = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
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
          <FontAwesome6 name="x" size={18} />
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Add Pins</Text>
        </View>
        <TouchableOpacity style={searchPinsStyles.button}>
          <Text style={{ color: "white" }}>Done</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        keyExtractor={(item: any) => item._id}
        data={pins}
        renderItem={({ item }: any) => {
          console.log(item);

          return (
            <View>
              <Image source={item.imageUrl} />
            </View>
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
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 12,
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
