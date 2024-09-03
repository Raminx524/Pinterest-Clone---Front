import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Modal from "react-native-modal";

export interface IModalProps {
  visible: boolean;
  onClose: () => void;
}
const CustomCollageIcon = () => (
  <>
    <AntDesign
      name="plussquare"
      size={20}
      color="black"
      style={{ zIndex: 4 }}
    />
    <View
      style={{
        position: "absolute",
        zIndex: 5,
        bottom: 16,
        left: 14,
      }}
    >
      <Ionicons
        name="cut-sharp"
        size={24}
        color="white"
        style={{ margin: 0, position: "absolute", bottom: 0 }}
      />
      <Ionicons
        name="cut-sharp"
        size={20}
        color="black"
        style={{ margin: 0, position: "absolute", bottom: 1 }}
      />
    </View>
  </>
);

export function CreateModal({ visible, onClose }: IModalProps) {
  const router = useRouter();
  const navHandler = (endPoint: string) => {
    router.push(`/(tabs)/create/${endPoint}` as Href<string>);
    onClose();
  };
  return (
    <Modal
      isVisible={visible}
      presentationStyle="overFullScreen"
      style={styles.modalContainer}
      onBackdropPress={() => onClose()}
    >
      <View style={styles.modalContent}>
        <Pressable onPress={onClose}>
          <FontAwesome6 name="x" size={18} style={styles.closeButton} />
        </Pressable>
        <Text style={styles.modalTitle}>Start creating now</Text>
        <View style={styles.routesContainer}>
          <Pressable style={styles.modalLink} onPress={() => navHandler("pin")}>
            <View style={styles.iconWrapper}>
              <FontAwesome5 name="thumbtack" size={20} color="black" />
            </View>
            <Text style={styles.modalLinkText}>Pin</Text>
          </Pressable>
          <Pressable
            style={styles.modalLink}
            onPress={() => navHandler("collage")}
          >
            <View style={styles.iconWrapper}>
              <CustomCollageIcon />
            </View>
            <Text style={styles.modalLinkText}>Collage</Text>
          </Pressable>
          <Pressable
            style={styles.modalLink}
            onPress={() => navHandler("board")}
          >
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name="collage" size={28} color="black" />
            </View>
            <Text style={styles.modalLinkText}>Board</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
    height: 200,
    padding: 12,
    backgroundColor: "white",
    borderRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "500",
    alignSelf: "center",
  },
  closeButton: {
    position: "absolute",
    left: 10,
    top: 5,
  },
  routesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
  },
  iconWrapper: {
    backgroundColor: "#f2f2f2",
    width: 70,
    height: 70,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  modalLink: {
    alignItems: "center",
    gap: 4,
  },
  modalLinkText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
