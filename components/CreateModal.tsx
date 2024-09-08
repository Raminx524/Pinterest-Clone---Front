import axios from "axios";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";

import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import api from "@/utils/api.service";
import { AuthContext } from "@/context/authContext";
import Toast from "react-native-root-toast";

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
  const [uploading, setUploading] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const uploadToCloudinary = async (imageUri: string) => {
    const data = new FormData();

    const image: any = {
      uri: imageUri,

      type: "image/jpeg",

      name: "upload.jpg",
    };

    data.append("file", image);
    data.append("upload_preset", "ml_default");

    try {
      setUploading(true);

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dtnear5xs/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUploading(false);
      return res.data.secure_url;
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image", error);

      Alert.alert(
        "Upload failed",
        "Failed to upload image to Cloudinary. Please try again."
      );

      return null;
    }
  };

  const savePinImage = async (
    imageUrl: string,
    title: string,
    description: string,
    link: string
  ) => {
    console.log(imageUrl);
    console.log(title);
    console.log(description);
    console.log(link);

    try {
      const response = await api.post("/pin", {
        imageUrl,
        title,
        description,
        user: user?._id,
        linkUrl: link,
      });
      1;

      console.log("Image saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving image to MongoDB:", error);
      Alert.alert(
        "Save failed",
        "Failed to save image details. Please try again."
      );
    }
  };
  const featureHandler = () => {
    let toast = Toast.show(
      "This feature is currently under maintenance. Check back soon!",
      {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        opacity: 1,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        containerStyle: {
          zIndex: 9999,
          elevation: 10,
        },
      }
    );
  };
  const navHandler = async (endPoint: string) => {
    if (endPoint === "pin") {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
          const imageUri = result.assets[0].uri;
          console.log("Selected image URI:", imageUri);

          const cloudinaryUrl = await uploadToCloudinary(imageUri);

          if (cloudinaryUrl) {
            console.log("Cloudinary URL:", cloudinaryUrl);
            setImageUrl(cloudinaryUrl);

            onClose();
            setTimeout(() => setShowFormModal(true), 500);
          }
        }
      } else {
        Alert.alert(
          "Permission required",
          "Permission to access camera roll is required!"
        );
      }
    } else {
      router.push(`/(tabs)/create/${endPoint}` as Href<string>);
    }

    onClose();
  };

  const handleSubmit = async () => {
    if (title && description && imageUrl) {
      await savePinImage(imageUrl, title, description, link);
      setShowFormModal(false);

      setTitle("");
      setDescription("");
      setLink("");
      setImageUrl("");
    } else {
      Alert.alert(
        "Missing information",
        "Please fill in at least the title and description."
      );
    }
  };

  return (
    <>
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
          {uploading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <View style={styles.routesContainer}>
              <Pressable
                style={styles.modalLink}
                onPress={() => navHandler("pin")}
              >
                <View style={styles.iconWrapper}>
                  <FontAwesome5 name="thumbtack" size={20} color="black" />
                </View>
                <Text style={styles.modalLinkText}>Pin</Text>
              </Pressable>
              <Pressable style={styles.modalLink} onPress={featureHandler}>
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
                  <MaterialCommunityIcons
                    name="collage"
                    size={28}
                    color="black"
                  />
                </View>
                <Text style={styles.modalLinkText}>Board</Text>
              </Pressable>
            </View>
          )}
        </View>
      </Modal>

      <Modal
        isVisible={showFormModal}
        presentationStyle="overFullScreen"
        style={styles.modalContainer}
        onBackdropPress={() => setShowFormModal(false)}
      >
        <View style={styles.formModalContent}>
          <Pressable onPress={() => setShowFormModal(false)}>
            <FontAwesome6 name="x" size={18} style={styles.closeButton} />
          </Pressable>
          <Text style={styles.modalTitle}>Add Pin Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Link (optional)"
            value={link}
            onChangeText={setLink}
          />
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Save Pin</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    position: "relative",
    margin: 0,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 10,
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
    marginBottom: 20,
  },
  closeButton: {
    position: "absolute",
    left: 10,
    top: 10,
    zIndex: 1,
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
  formModalContent: {
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    maxHeight: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#E60023",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
