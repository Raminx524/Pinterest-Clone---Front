import type { FC, ReactElement } from "react";
import {
  Image,
  StatusBar,
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
import React, { useEffect, useMemo, useState } from "react";
import type { ListRenderItemInfo, StyleProp, ViewStyle } from "react-native";
import * as Linking from "expo-linking";
import { Colors } from "react-native/Libraries/NewAppScreen";
import MasonryList from "@react-native-seoul/masonry-list";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Divider from "@/components/Devider";
import Modal from "react-native-modal";

export interface Pin {
  id: string;
  imgURL: string;
  text: string;
}

export const data: Pin[] = [
  {
    id: "id123",
    imgURL:
      "https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg",
    text: "Pioneer LHS Chaise Lounger in Grey Colour",
  },
  {
    id: "id124",
    imgURL:
      "https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red",
    text: "Precedant Furniture",
  },
  {
    id: "id125",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg",
    text: "Leverette Upholstered Platform Bed",
  },
  {
    id: "id126",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*",
    text: "Briget Accent Table",
  },
  {
    id: "id127",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Rivet Emerly Media Console",
  },
  {
    id: "id128",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Drew Barrymore Flower Home Accent Chair",
  },
  {
    id: "id129",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Ecobirdy Charlie Chair",
  },
  {
    id: "id130",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*",
    text: "Hailey Sofa",
  },
  {
    id: "id131",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*",
    text: "Farmhouse Dining Table",
  },
  {
    id: "id132",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Evelyn Coffee Table",
  },
  {
    id: "id133",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Slope Nomad Leather Sofa",
  },
  {
    id: "id134",
    imgURL:
      "https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg",
    text: "Chair and Table",
  },
  {
    id: "id223",
    imgURL:
      "https://ii1.pepperfry.com/media/catalog/product/m/o/568x625/modern-chaise-lounger-in-grey-colour-by-dreamzz-furniture-modern-chaise-lounger-in-grey-colour-by-dr-tmnirx.jpg",
    text: "Pioneer LHS Chaise Lounger in Grey Colour",
  },
  {
    id: "id224",
    imgURL:
      "https://www.precedent-furniture.com/sites/precedent-furniture.com/files/styles/header_slideshow/public/3360_SL%20CR.jpg?itok=3Ltk6red",
    text: "Precedant Furniture",
  },
  {
    id: "id225",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/leverette-fabric-queen-upholstered-platform-bed-1594829293.jpg",
    text: "Leverette Upholstered Platform Bed",
  },
  {
    id: "id226",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/briget-side-table-1582143245.jpg?crop=1.00xw:0.770xh;0,0.129xh&resize=768:*",
    text: "Briget Accent Table",
  },
  {
    id: "id227",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rivet-emerly-media-console-1610578756.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Rivet Emerly Media Console",
  },
  {
    id: "id228",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/drew-barrymore-flower-home-petal-chair-1594829759.jpeg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Drew Barrymore Flower Home Accent Chair",
  },
  {
    id: "id229",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/goodee-ecobirdy-charlie-chairs-1594834221.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Ecobirdy Charlie Chair",
  },
  {
    id: "id230",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/hailey-sofa-1571430947.jpg?crop=0.481xw:0.722xh;0.252xw,0.173xh&resize=768:*",
    text: "Hailey Sofa",
  },
  {
    id: "id231",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/archer-home-designs-dining-table-1594830125.jpg?crop=0.657xw:1.00xh;0.0986xw,0&resize=768:*",
    text: "Farmhouse Dining Table",
  },
  {
    id: "id232",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/evelyn-coffee-table-1610578857.jpeg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Evelyn Coffee Table",
  },
  {
    id: "id233",
    imgURL:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/burrow-nomad-sofa-1594837995.jpg?crop=1xw:1xh;center,top&resize=768:*",
    text: "Slope Nomad Leather Sofa",
  },
  {
    id: "id234",
    imgURL:
      "https://apicms.thestar.com.my/uploads/images/2020/02/21/570850.jpg",
    text: "Chair and Table",
  },
];

const ShareMenu = ({
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

        // console.log("WhatsApp Supported: ", whatsappSupported);
        // const messengerSupported = await Linking.canOpenURL("fb://profile");
        // console.log("Messenger Supported: ", messengerSupported);
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
    >
      {/* <View style={styles.modalOverlay}> */}
      <View
        style={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          padding: 20,
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
          <View style={{ flex: 1, flexDirection: "row", gap: 15 }}>
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
                  // backgroundColor: "#25D366",
                  borderRadius: 30,
                  // backgroundColor: "#1877F2",
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
                  // Button Linear Gradient
                  colors={["#6228d7", "#ee2a7b", "#f9ce34"]}
                  start={{ x: 1.0, y: 0.0 }}
                  end={{ x: 1.0, y: 0.8 }}
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
            paddingVertical: 25,
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
      {/* </View> */}
    </Modal>
    // </GestureRecognizer>
  );
};

const PinCard: FC<{ item: Pin; style: StyleProp<ViewStyle> }> = ({
  item,
  style,
}) => {
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  const [isShareMenuVisible, setShareMenuVisible] = useState(false);

  const isDarkMode = useColorScheme() === "dark";
  return (
    <View key={item.id} style={[{ marginTop: 12, flex: 1, gap: 5 }, style]}>
      <Image
        source={{ uri: item.imgURL }}
        style={{
          height: randomBool ? 150 : 280,
          alignSelf: "stretch",
          borderRadius: 20,
        }}
        resizeMode="cover"
      />
      <View
        style={[
          {
            flex: 1,
            flexDirection: "row",
            alignItems: "flex-start",

            marginHorizontal: 6,
          },
        ]}
      >
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
        <View style={[{ flex: 4 }]}>
          <Text
            style={[{ fontSize: 14, color: isDarkMode ? "white" : "black" }]}
          >
            {item.text}
          </Text>
        </View>
        <View style={[{ flex: 1 }]}>
          <Image
            style={{ borderRadius: 16, width: 32, height: 32 }}
            source={{ uri: item.imgURL }}
          />
        </View>
      </View>
      <ShareMenu
        visible={isShareMenuVisible}
        onClose={() => setShareMenuVisible(false)}
        item={item}
      />
      {/* <Text
        style={{
          marginTop: 8,
        }}
      >
        {item.text}
      </Text> */}
    </View>
  );
};

export default function TabOneScreen() {
  const isDarkMode = useColorScheme() === "dark";
  // const isDarkMode = false;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const renderItem = ({ item, i }: { item: Pin; i: number }): ReactElement => {
    return <PinCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 12 }} />;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {/* <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} /> */}
      <MasonryList
        keyExtractor={(item: Pin): string => item.id}
        ListHeaderComponent={<View />}
        contentContainerStyle={{
          paddingHorizontal: 24,
          alignSelf: "stretch",
        }}
        onEndReached={() => console.log("onEndReached")}
        numColumns={2}
        data={data}
        renderItem={renderItem as any}
      />
    </SafeAreaView>
  );
}
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
  shareButton: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 8,
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
