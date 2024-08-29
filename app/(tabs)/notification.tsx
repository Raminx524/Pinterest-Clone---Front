import React from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { Text, View } from "@/components/Themed";
import { FontAwesome } from "@expo/vector-icons";

export default function SavedScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.profileImageContainer}>

          </TouchableOpacity>
          <View style={styles.buttonsWrapper}>

            <TouchableOpacity style={styles.button} onPress={() => { /* Your logic for Pins */ }}>
              <Text style={styles.buttonText}>Updates</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { /* Your logic for Boards */ }}>
              <Text style={styles.buttonText}>Messages</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.text}>Select a category to see saved items</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: "#000000", // Set background to black
  },
  container: {
    flex: 1,
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center the buttons container
    marginBottom: 20,
    position: "relative",
  },
  profileImageContainer: {
    position: "absolute",
    left: 0, // Position the profile image on the far left
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "relative",
    right: 90, // Position the profile image on the
  },
  buttonsWrapper: {
    flexDirection: "row",
    justifyContent: "center", // Center the buttons
    flex: 1, // Ensure buttons take up available space
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "transparent", // No background color
    borderRadius: 20,
  },
  buttonText: {
    color: "#000000", // Black text color
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: "#F7F7F7",
  },
  plusButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#E1E1E1", // Adjusted text color for better visibility on black background
    fontSize: 16,
  },
});
