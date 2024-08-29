import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";

export default function Gender() {
  const { registerData, setRegisterData } = useRegisterData();
  const router = useRouter();

  const handleContinue = () => {
    if (registerData.gender === "") {
      console.log("Please choose a gender first");
      return;
    }
    router.push("/register/country");
  };

  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, gender: "" };
    });
    router.back();
  };

  const genderChangeHandler = (gender: string) => {
    setRegisterData((prev) => {
      return { ...prev, gender };
    });
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator totalSteps={7} currentStep={5} />
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>What's your gender?</Text>
      <TouchableOpacity
        style={[
          styles.button,
          registerData.gender === "Male" && styles.selectedButton,
        ]}
        onPress={() => genderChangeHandler("Male")}
      >
        <Text style={styles.buttonText}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          registerData.gender === "Female" && styles.selectedButton,
        ]}
        onPress={() => genderChangeHandler("Female")}
      >
        <Text style={styles.buttonText}>Female</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          registerData.gender === "Other" && styles.selectedButton,
        ]}
        onPress={() => genderChangeHandler("Other")}
      >
        <Text style={styles.buttonText}>Other</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
