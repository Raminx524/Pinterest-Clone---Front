import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";

export default function Email() {
  const router = useRouter();
  const { registerData, setRegisterData } = useRegisterData();

  const validateEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(registerData.email);
  };

  const handleContinue = () => {
    // You might want to validate the email here
    const isValid = validateEmail();
    if (!isValid) {
      console.log("Invalid email");
      return;
    }
    router.push("/register/password");
  };
  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, email: "" };
    });
    router.replace("/(auth)/authIndex");
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator totalSteps={7} currentStep={1} />
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>What's your email?</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={registerData.email}
        onChangeText={(email) => {
          setRegisterData((prev) => {
            return { ...prev, email };
          });
        }}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
