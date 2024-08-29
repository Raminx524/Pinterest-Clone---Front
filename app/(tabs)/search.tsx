import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { TextInput } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>

          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#E1E1E1"
          />
          <TouchableOpacity style={styles.plusButton}>
            <FontAwesome name="camera" size={20} color="black" />
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff", // Add background color if needed
  },
  container: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 60,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: "#E1E1E1",
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
  },
  plusButton: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 20,
    position: "relative",
    right: 30,
  },
});
