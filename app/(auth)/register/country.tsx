import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";

export default function Country() {
  const { registerData, setRegisterData } = useRegisterData();
  const router = useRouter();

  const handleContinue = () => {
    router.push("/register/topics");
  };
  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, country: "" };
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator totalSteps={7} currentStep={6} />
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>What's your country?</Text>
      <TextInput
        style={styles.input}
        placeholder="Country"
        value={registerData.country}
        onChangeText={(country) => {
          setRegisterData((prev) => {
            return { ...prev, country };
          });
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
