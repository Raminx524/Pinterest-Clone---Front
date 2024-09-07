import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Modal,
  Text,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CreateModal } from "../../components/CreateModal"; // Assuming CreateModal is in the same directory
import { TouchableWithoutFeedback, Keyboard } from "react-native"; // Import TouchableWithoutFeedback
import auth from "@react-native-firebase/auth"; // Import Firebase auth

const { width } = Dimensions.get("window");

export default function SavedScreen() {
  const [selectedSection, setSelectedSection] = useState<"Pins" | "Boards">("Pins");
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewOptionsVisible, setViewOptionsVisible] = useState(false);
  const [isGroupFiltered, setIsGroupFiltered] = useState(false);
  const [isFavoriteFiltered, setIsFavoriteFiltered] = useState(false);
  const [isCreatedByYouFiltered, setIsCreatedByYouFiltered] = useState(false);
  const [viewOption, setViewOption] = useState<"Default" | "Wide" | "Compact">("Default");
  const [isCreateModalVisible, setCreateModalVisible] = useState(false); // Create modal state
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false); // Logout modal state
  const scrollViewRef = useRef<ScrollView>(null);
  const [pins, setPins] = useState<string[]>([]); // State to store pins

  useEffect(() => {
    if (scrollViewRef.current) {
      const pageIndex = selectedSection === "Pins" ? 0 : 1;
      scrollViewRef.current.scrollTo({ x: pageIndex * width, y: 0, animated: true });
    }
  }, [selectedSection]);

  const handleAddPin = (uri: string) => {
    setPins((prevPins) => [...prevPins, uri]); // Add the new pin to the state
  };

  const renderPins = () => (
    <ScrollView contentContainerStyle={styles.itemsContainer}>
      {["https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150", "https://via.placeholder.com/150"].map((uri, index) => (
        <Image key={index} source={{ uri }} style={getPinStyle()} />
      ))}
    </ScrollView>
  );

  const renderBoards = () => (
    <ScrollView contentContainerStyle={styles.itemsContainer}>
      {["https://via.placeholder.com/100", "https://via.placeholder.com/100", "https://via.placeholder.com/100"].map((uri, index) => (
        <Image key={index} source={{ uri }} style={styles.savedBoard} />
      ))}
    </ScrollView>
  );

  const toggleGroupFilter = () => {
    setIsGroupFiltered((prev) => !prev);
  };

  const toggleFavoriteFilter = () => {
    setIsFavoriteFiltered((prev) => !prev);
  };

  const toggleCreatedByYouFilter = () => {
    setIsCreatedByYouFiltered((prev) => !prev);
  };

  const getPinStyle = () => {
    switch (viewOption) {
      case "Wide":
        return styles.widePin;
      case "Compact":
        return styles.compactPin;
      default:
        return styles.defaultPin;
    }
  };

  const getCurrentIcon = () => {
    switch (viewOption) {
      case "Wide":
        return "square";
      case "Default":
        return "th-large";
      case "Compact":
        return "th";
      default:
        return "th";
    }
  };

  const handleSectionChange = (section: "Pins" | "Boards") => {
    setSelectedSection(section);
  };

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Log out the user
      // Optionally, navigate to the login screen or perform any other actions after logging out
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.profileImageContainer} onPress={() => setLogoutModalVisible(true)}>
            <Image
              source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/007/140/806/small_2x/profile-glyph-circle-background-icon-vector.jpg' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={styles.buttonsWrapper}>
            <TouchableOpacity
              style={[styles.button, selectedSection === "Pins" && styles.selectedButton]}
              onPress={() => handleSectionChange("Pins")}
            >
              <Text style={styles.buttonText}>Pins</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, selectedSection === "Boards" && styles.selectedButton]}
              onPress={() => handleSectionChange("Boards")}
            >
              <Text style={styles.buttonText}>Boards</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <FontAwesome name="search" size={16} color="#B8B8B8" style={styles.searchIcon} />
            <TextInput
              style={styles.input}
              placeholder="Search your saved ideas"
              placeholderTextColor="#B8B8B8"
            />
          </View>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => setCreateModalVisible(true)} // Open CreateModal on press
          >
            <FontAwesome name="plus" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const pageIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setSelectedSection(pageIndex === 0 ? "Pins" : "Boards");
          }}
        >
          <View style={[styles.page, { width }]}>
            <View style={styles.filtersContainer}>
              <TouchableOpacity style={styles.filterButton} onPress={() => setViewOptionsVisible(true)}>
                <FontAwesome name={getCurrentIcon()} size={16} color="#000" />
                <FontAwesome name="angle-down" size={16} color="#000" style={styles.filterIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton} onPress={toggleFavoriteFilter}>
                <FontAwesome name="star" size={16} color={isFavoriteFiltered ? "#000" : "#000"} style={{ marginRight: 5 }} />
                <Text style={[styles.filterText, isFavoriteFiltered && styles.activeFilterText]}>Favorites</Text>
                {isFavoriteFiltered && (
                  <TouchableOpacity onPress={toggleFavoriteFilter}>
                    <FontAwesome name="times" size={16} color="#000" style={{ marginLeft: 5 }} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton} onPress={toggleCreatedByYouFilter}>
                <Text style={[styles.filterText, isCreatedByYouFiltered && styles.activeFilterText]}>Created by You</Text>
                {isCreatedByYouFiltered && (
                  <TouchableOpacity onPress={toggleCreatedByYouFilter}>
                    <FontAwesome name="times" size={16} color="#000" style={{ marginLeft: 5 }} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>
            {renderPins()}
          </View>

          <View style={[styles.page, { width }]}>
            <View style={styles.filtersContainer}>
              <TouchableOpacity style={styles.filterButton} onPress={() => setFilterVisible(true)}>
                <FontAwesome name="sort" size={16} color="#000" />
                <FontAwesome name="angle-down" size={16} color="#000" style={styles.filterIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton} onPress={toggleGroupFilter}>
                <Text style={[styles.filterText, isGroupFiltered && styles.activeFilterText]}>Group</Text>
                {isGroupFiltered && (
                  <TouchableOpacity onPress={toggleGroupFilter}>
                    <FontAwesome name="times" size={16} color="#000" style={{ marginLeft: 5 }} />
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            </View>
            {renderBoards()}
          </View>
        </ScrollView>

        {/* Create Modal */}
        <CreateModal visible={isCreateModalVisible} onClose={() => setCreateModalVisible(false)} />

        {/* Sort Filter Modal */}
        <Modal
          transparent={true}
          visible={filterVisible}
          animationType="slide"
          onRequestClose={() => setFilterVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Sort by</Text>
              <TouchableOpacity style={styles.modalOption} onPress={() => setFilterVisible(false)}>
                <Text style={styles.modalOptionText}>A to Z</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => setFilterVisible(false)}>
                <Text style={styles.modalOptionText}>Z to A</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setFilterVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* View Options Modal */}
        <Modal
          transparent={true}
          visible={viewOptionsVisible}
          animationType="slide"
          onRequestClose={() => setViewOptionsVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>View Options</Text>
              <TouchableOpacity style={styles.modalOption} onPress={() => { setViewOption("Default"); setViewOptionsVisible(false); }}>
                <Text style={styles.modalOptionText}>Default</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => { setViewOption("Wide"); setViewOptionsVisible(false); }}>
                <Text style={styles.modalOptionText}>Wide</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => { setViewOption("Compact"); setViewOptionsVisible(false); }}>
                <Text style={styles.modalOptionText}>Compact</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setViewOptionsVisible(false)}>
                <Text style={styles.modalCloseButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Logout Confirmation Modal */}
        <Modal
          transparent={true}
          visible={isLogoutModalVisible}
          animationType="slide"
          onRequestClose={() => setLogoutModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>Are you sure you want to log out?</Text>
              <View style={styles.modalButtonContainer}>

                <TouchableOpacity style={styles.modalButton} onPress={() => setLogoutModalVisible(false)}>
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  profileImageContainer: {
    position: "absolute",
    left: 0,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  selectedButton: {
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    backgroundColor: "#ffffff",
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
    marginLeft: 5,
  },
  plusButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
  },
  filtersContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
    backgroundColor: "#DCDCDC",
    padding: 6,
    borderRadius: 20,
    marginBottom: 7,
  },
  filterText: {
    color: "#000000",
  },
  activeFilterText: {
    fontWeight: "bold",
  },
  filterIcon: {
    marginLeft: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  defaultPin: {
    width: (width - 62) / 2,
    height: (width - 50) / 2,
    margin: 5,
    borderRadius: 10,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  savedBoard: {
    width: (width - 74) / 3,
    height: (width - 60) / 3,
    margin: 5,
    borderRadius: 10,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  widePin: {
    width: width - 53,
    height: 200,
    margin: 5,
    borderRadius: 10,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  compactPin: {
    width: (width - 74) / 3,
    height: (width - 60) / 3,
    margin: 5,
    borderRadius: 10,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "100%",
    height: "33%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },
  modalOption: {
    paddingVertical: 10,
    width: "100%",
    borderColor: "#E1E1E1",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#000000",
  },
  modalCloseButton: {
    padding: "5%",
    maxWidth: "50%",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: "#DCDCDC",
    alignSelf: "center",
  },
  modalCloseButtonText: {
    fontSize: 16,
    color: "#000",
  },
  page: {
    flex: 1,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000",
  },

  modalButtons: {
  },
  modalButton: {
    margin: 15,
    backgroundColor: "#DCDCDC",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 250,
    marginBottom: 10,
    width: "38%",
    alignSelf: "center",

  },
  modalButtonText: {

  },
  modalButtonContainer: {

  }

});