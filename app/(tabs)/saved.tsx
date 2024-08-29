import React, { useState, useRef } from "react";
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
  Dimensions
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get('window');

export default function SavedScreen() {
  const [selectedSection, setSelectedSection] = useState<"Pins" | "Boards">("Pins");
  const [filterVisible, setFilterVisible] = useState(false);
  const [viewOptionsVisible, setViewOptionsVisible] = useState(false);
  const [isGroupFiltered, setIsGroupFiltered] = useState(false);
  const [isFavoriteFiltered, setIsFavoriteFiltered] = useState(false);
  const [isCreatedByYouFiltered, setIsCreatedByYouFiltered] = useState(false);
  const [viewOption, setViewOption] = useState<"Default" | "Wide" | "Compact">("Default");

  const scrollViewRef = useRef<ScrollView>(null);

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
    const pageIndex = section === "Pins" ? 0 : 1;
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: pageIndex * width, y: 0, animated: true });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/40' }}
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
          <TouchableOpacity style={styles.plusButton}>
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
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterButton} onPress={toggleCreatedByYouFilter}>
                <Text style={[styles.filterText, isCreatedByYouFiltered && styles.activeFilterText]}>Created by You</Text>
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
              </TouchableOpacity>
            </View>
            {renderBoards()}
          </View>
        </ScrollView>

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
                <Text style={styles.modalOptionText}>Custom</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => setFilterVisible(false)}>
                <Text style={styles.modalOptionText}>Last saved to</Text>
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
              <TouchableOpacity style={styles.modalOption} onPress={() => { setViewOption("Wide"); setViewOptionsVisible(false); }}>
                <Text style={styles.modalOptionText}>Wide</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalOption} onPress={() => { setViewOption("Default"); setViewOptionsVisible(false); }}>
                <Text style={styles.modalOptionText}>Default</Text>
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
    width: 40,
    height: 40,
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
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: "#E60023",
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
    fontSize: 13,
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
    width: (width - 80) / 2,
    height: (width - 50) / 2,
    margin: 5,
    borderRadius: 10,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  savedBoard: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 10,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  widePin: {
    width: width - 80,
    height: 200,
    margin: 5,
    borderRadius: 10,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  compactPin: {
    width: (width - 90) / 3,
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
});