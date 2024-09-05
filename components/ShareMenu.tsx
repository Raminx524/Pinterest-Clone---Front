import {
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  StyleSheet,
  Share,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import * as Linking from "expo-linking";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Divider from "@/components/Devider";
import Modal from "react-native-modal";
import { Pin } from "@/app/(tabs)";

export const ShareMenu = ({
  visible,
  onClose,
  item,
}: {
  visible: boolean;
  onClose: () => void;
  item: Pin;
}) => {
  // const [isWhatsAppInstalled, setWhatsAppInstalled] = useState(false);
  // const [isMessengerInstalled, setMessengerInstalled] = useState(false);

  const isDarkMode = useColorScheme() === "dark";
  const sizeIcon = 45;
  const textColor = isDarkMode ? "white" : "black";
  const paddingHorizontalModal = 20;

  useEffect(() => {
    const checkAppsAvailability = async () => {
      try {
        // const whatsappSupported = "tel://1234567890";
        // AppLink.maybeOpenURL(url, { appName, appStoreId, appStoreLocale, playStoreId })
        // const whatsappSupported = await AppLink.maybeOpenURL(
        //   "whatsapp://send?text=helloworld",
        //   {
        //     appName: "whatsapp-messenger",
        //     appStoreId: 389801252, // iOS App Store ID for WhatsApp
        //     appStoreLocale: "us", // Locale for iOS App Store
        //     playStoreId: "com.whatsapp", // Google Play Store ID for WhatsApp
        //   }
        // ).then(() => {
        //   console.log("WhatsApp Supported");
        // });
        const whatsappSupported = await Linking.canOpenURL(
          "whatsapp://send?phone=3464478983"
        );
        console.log(whatsappSupported);

        const messengerSupported = await Linking.canOpenURL("fb://profile");
        console.log("Messenger Supported: ", messengerSupported);
        // setWhatsAppInstalled(whatsappSupported);
        // setMessengerInstalled(messengerSupported);
      } catch (error) {
        console.error("Error checking app availability:", error);
      }
    };

    if (visible) {
      checkAppsAvailability();
    }
  }, [visible]);

  const handleWhatsAppShare = () => {
    const url = `whatsapp://send?text=${item.text} ${item.imgURL}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Ошибка", "Не удалось открыть WhatsApp.");
    });
  };

  const handleMessengerShare = () => {
    const url = `fb-messenger://share?link=${item.imgURL}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Ошибка", "Не удалось открыть Messenger.");
    });
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${item.text} ${item.imgURL}`,
      });
    } catch (error) {
      console.error("Ошибка при попытке поделиться:", error);
    }
  };

  return (
    <Modal
      isVisible={visible}
      presentationStyle="overFullScreen"
      swipeDirection="down"
      onSwipeComplete={() => onClose()}
      animationOut="slideOutDown"
      propagateSwipe
      style={{ justifyContent: "flex-end", margin: 0 }}
      onBackdropPress={() => onClose()}
    >
      <View
        style={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,

          paddingVertical: 20,
          gap: 10,
          backgroundColor: isDarkMode ? "#333333" : Colors.lighter,
        }}
      >
        {/* {isWhatsAppInstalled && ( */}
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            color: isDarkMode ? "white" : "black",
          }}
        >
          Share
        </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 20,
              paddingHorizontal: paddingHorizontalModal,
            }}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleWhatsAppShare}
            >
              <View
                style={{
                  backgroundColor: "#25D366",
                  borderRadius: 30,
                  padding: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="whatsapp"
                  size={sizeIcon}
                  color="white"
                />
              </View>

              <Text style={{ color: textColor }}>WhatsApp</Text>
            </TouchableOpacity>
            {/* )} */}

            {/* {isMessengerInstalled && ( */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleMessengerShare}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 30,
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  padding: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="facebook-messenger"
                  size={sizeIcon}
                  color="#00B2FF"
                />
              </View>
              <Text style={{ color: textColor }}>Messenger</Text>
            </TouchableOpacity>
            {/* )} */}

            <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
              <View
                style={{
                  borderRadius: 30,
                  padding: 0,
                }}
              >
                <MaterialCommunityIcons
                  name="facebook"
                  size={sizeIcon + 16}
                  color="#1877F2"
                />
              </View>
              <Text style={{ color: textColor }}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 30,
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  padding: 8,
                }}
              >
                <FontAwesome6 name="x-twitter" size={sizeIcon} color="#000" />
              </View>
              <Text style={{ color: textColor }}>X</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
              <View>
                <LinearGradient
                  colors={["#6228d7", "#ee2a7b", "#f9ce34"]}
                  start={{ x: 1.0, y: -0.1 }}
                  end={{ x: 1.0, y: 1 }}
                  style={{
                    backgroundColor: "white",
                    borderRadius: 30,
                    shadowColor: "black",
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    padding: 8,
                    paddingHorizontal: 12,
                  }}
                >
                  <FontAwesome6
                    name="instagram"
                    size={sizeIcon}
                    color="white"
                  />
                </LinearGradient>
              </View>
              <Text style={{ color: textColor }}>Instagram</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
              <View
                style={{
                  backgroundColor: "gray",
                  borderRadius: 30,
                  padding: 8,
                }}
              >
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={sizeIcon}
                  color="white"
                />
              </View>

              <Text style={styles.menuItemText}>More Apps</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Divider />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            gap: 20,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: textColor }}>
            This Pin was inspired by your recent activity
          </Text>
          <Pressable>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: textColor }}
            >
              Hide
            </Text>
          </Pressable>
          <Pressable>
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: textColor }}
            >
              Report
            </Text>
          </Pressable>
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    height: 200,
    borderRadius: 8,
  },
  text: {
    marginTop: 8,
    fontSize: 16,
  },
  shareText: {
    marginLeft: 8,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  menuItem: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 5,
    // paddingHorizontal: 20,
    gap: 5,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
    width: 80,
    margin: "auto",
    backgroundColor: "gray",
    borderRadius: 100,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
