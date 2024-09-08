import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { styles } from "@/styles/authRegisterStyles";
import { useSharedValue } from "react-native-reanimated";
import { Switch } from "@/components/Switch";
import { AuthContext } from "@/context/authContext";
import api from "@/utils/api.service";
import Toast from "react-native-root-toast";

export default function Board() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const isOn = useSharedValue(false);
  const [title, setTitle] = useState("");
  const [collaborators, setCollaborators] = useState<string[]>([]);
  const handlePress = () => {
    isOn.value = !isOn.value;
  };

  const handleNext = async () => {
    try {
      router.replace({
        pathname: "/(tabs)/create/searchPins",
        params: {
          isVisible: `${!isOn}`,
          collaborators: collaborators.join(","),
          title,
          user: user?._id,
        },
      });
    } catch (err) {
      console.log("Error creating board: ", err);
    }
  };

  return (
    <SafeAreaView style={boardStyles.modalContent}>
      <View style={boardStyles.header}>
        <Pressable
          onPress={() => {
            router.back();
          }}
        >
          <FontAwesome6 name="x" size={18} style={boardStyles.closeButton} />
        </Pressable>
        <Text style={boardStyles.modalTitle}>Create board</Text>
        <TouchableOpacity
          disabled={title === ""}
          style={
            title
              ? { ...boardStyles.button, backgroundColor: "#d60021" }
              : boardStyles.button
          }
          onPress={handleNext}
        >
          <Text style={{ fontWeight: "500", color: title ? "#fff" : "#000" }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 16, gap: 24 }}>
        <View style={{ gap: 6, alignSelf: "center" }}>
          <Text style={{ fontSize: 13 }}>Board name</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder='Add a title like, "DIY", or, "Recipes"'
            style={{ ...styles.input, borderWidth: 2, borderColor: "#c8c8c8" }}
          />
        </View>
        <TouchableOpacity
          style={{ gap: 8 }}
          onPress={() => {
            let toast = Toast.show(
              "This feature is currently under maintenance. Check back soon!",
              {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                backgroundColor: "red",
                opacity: 1,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              }
            );
          }}
        >
          <Text style={{ fontSize: 16 }}>Collaborators</Text>
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
            }}
          >
            <View style={boardStyles.iconBG}>
              <FontAwesome6
                name="user-plus"
                size={16}
                color="black"
                style={boardStyles.colllabIcon}
              />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Add collaborators
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 16 }}>Visibility</Text>
          <View
            style={{
              flexDirection: "row",
              //   justifyContent: "space-between",
              paddingRight: 30,
            }}
          >
            <View style={{ gap: 12, flexBasis: "95%" }}>
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Keep this board secret
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#8f8f8f",
                  fontWeight: "500",
                  width: "95%",
                }}
              >
                If you don't want other to see this board, keep it secret
              </Text>
            </View>
            <Switch
              value={isOn}
              onPress={handlePress}
              style={{ width: 50, height: 30 }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const boardStyles = StyleSheet.create({
  modalContainer: {
    position: "relative",
    margin: 0,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalContent: {
    width: "100%",
    height: "99.9%",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 20,
  },
  closeButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    width: 60,
    height: 45,
    backgroundColor: "#e8e8e8",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 45,
  },
  iconBG: {
    backgroundColor: "#f2f2f2",
    height: 45,
    width: 45,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  colllabIcon: {
    transform: [{ scaleX: -1 }],
  },
  toggleContainer: {
    width: 50,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#e8e8e8",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#000",
  },
  toggleContainerEnabled: {
    backgroundColor: "#000",
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    position: "absolute",
    left: 3,
    top: 3,
    borderWidth: 1,
    borderColor: "#000",
  },
  toggleCircleEnabled: {
    left: 23,
    borderColor: "#fff",
  },
});
