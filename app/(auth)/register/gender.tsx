import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Gender() {
  const { registerData, setRegisterData } = useRegisterData();
  const router = useRouter();

  const handleContinue = (gender: string) => {
    setRegisterData((prev) => {
      return { ...prev, gender };
    });
    router.push("/register/country");
  };

  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, gender: "" };
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <ProgressIndicator totalSteps={7} currentStep={5} />
        <Text style={styles.title}>What's your gender?</Text>
        <Text
          style={{
            marginBottom: 16,
            textAlign: "center",
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          This helps us find you more relevant content. We won't show it on your
          profile.
        </Text>
        <View>
          <TouchableOpacity
            style={[
              styles.button,
              styles.genderBtn,
              registerData.gender === "Male" && styles.selectedButton,
            ]}
            onPress={() => handleContinue("Male")}
          >
            <Text style={{ ...styles.buttonText, color: "#000" }}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.genderBtn,
              registerData.gender === "Female" && styles.selectedButton,
            ]}
            onPress={() => handleContinue("Female")}
          >
            <Text style={{ ...styles.buttonText, color: "#000" }}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.genderBtn,
              registerData.gender === "Other" && styles.selectedButton,
            ]}
            onPress={() => handleContinue("Other")}
          >
            <Text style={{ ...styles.buttonText, color: "#000" }}>Other</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
