// eslint-disable-next-line @typescript-eslint/no-use-before-define
import type { FC, ReactElement } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Share,
  Linking,
  Alert,
  NativeModules,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import { Colors } from "react-native/Libraries/NewAppScreen";
import MasonryList from "@react-native-seoul/masonry-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DeviceInfo from "react-native-device-info";

interface Furniture {
  id: string;
  imgURL: string;
  text: string;
}

const data: Furniture[] = [
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

const ShareMenu = ({ visible, onClose, item }) => {
  const [isWhatsAppInstalled, setWhatsAppInstalled] = useState(false);
  const [isMessengerInstalled, setMessengerInstalled] = useState(false);

  useEffect(() => {
    const checkAppsAvailability = async () => {
      try {
        const whatsappSupported = await Linking.canOpenURL(
          "whatsapp://send?text=Hello"
        );
        console.log(whatsappSupported);

        const messengerSupported = await Linking.canOpenURL(
          "fb-messenger://share?link=Hello"
        );

        setWhatsAppInstalled(whatsappSupported);
        setMessengerInstalled(messengerSupported);
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
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.menuContainer}>
          {isWhatsAppInstalled && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleWhatsAppShare}
            >
              <MaterialCommunityIcons name="whatsapp" size={24} color="green" />
              <Text style={styles.menuItemText}>Поделиться в WhatsApp</Text>
            </TouchableOpacity>
          )}
          {isMessengerInstalled && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleMessengerShare}
            >
              <MaterialCommunityIcons
                name="facebook-messenger"
                size={24}
                color="blue"
              />
              <Text style={styles.menuItemText}>Поделиться в Messenger</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.menuItem} onPress={handleShare}>
            <MaterialCommunityIcons
              name="share-variant"
              size={24}
              color="black"
            />
            <Text style={styles.menuItemText}>Другие варианты</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Закрыть</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const PinCard: FC<{ item: Furniture; style: StyleProp<ViewStyle> }> = ({
  item,
  style,
}) => {
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  const [isShareMenuVisible, setShareMenuVisible] = useState(false);

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
            <MaterialCommunityIcons name="dots-horizontal" size={20} />
          </TouchableOpacity>
        </View>
        <View style={[{ flex: 4 }]}>
          <Text style={[{ fontSize: 14 }]}>{item.text}</Text>
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

const App: FC = () => {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const renderItem = ({ item, i }): ReactElement => {
    return <PinCard item={item} style={{ marginLeft: i % 2 === 0 ? 0 : 12 }} />;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
      <MasonryList
        keyExtractor={(item: Furniture): string => item.id}
        ListHeaderComponent={<View />}
        contentContainerStyle={{
          paddingHorizontal: 24,
          alignSelf: "stretch",
        }}
        onEndReached={() => console.log("onEndReached")}
        numColumns={2}
        data={data}
        renderItem={renderItem}
      />
    </SafeAreaView>
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
  menuContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
  },
});

export default App;
