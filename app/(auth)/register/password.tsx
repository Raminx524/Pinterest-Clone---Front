import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";

export default function Password() {
  const { registerData, setRegisterData } = useRegisterData();
  const router = useRouter();

  const handleContinue = () => {
    //TODO You might want to validate the password here
    router.push("/register/fullName");
  };
  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, password: "" };
    });
    router.replace("/register/email");
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator totalSteps={7} currentStep={2} />
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Create a password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={registerData.password}
        onChangeText={(password) => {
          setRegisterData((prev) => {
            return { ...prev, password };
          });
        }}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        disabled={registerData.password.length <= 5}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
