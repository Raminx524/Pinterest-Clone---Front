import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";

export default function FullName() {
  const router = useRouter();
  const { registerData, setRegisterData } = useRegisterData();

  const handleContinue = () => {
    if (!registerData.fullName.includes(" ")) {
      console.log("Full name must be at least 2 words(?)");
      return;
    }
    router.push("/register/dob");
  };

  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, fullName: "" };
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator totalSteps={7} currentStep={3} />
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>What's your full name?</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={registerData.fullName}
        onChangeText={(fullName) => {
          setRegisterData((prev) => {
            return { ...prev, fullName };
          });
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
