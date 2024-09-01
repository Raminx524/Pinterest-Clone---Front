import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import RegisterError, { IValidationError } from "@/components/RegisterError";

export default function Email() {
  const router = useRouter();
  const { registerData, setRegisterData } = useRegisterData();
  const isActiveBtn = registerData.email.length > 0;
  const [error, setError] = useState<IValidationError | null>(null);

  const validateEmail = () => {
    if (registerData.email === "") {
      setError({ message: "Please enter your email" });
      return false;
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const isValid = reg.test(registerData.email);
    if (!isValid) {
      setError({ message: "Sorry, this doesn't look like a valid email" });
    }
    return isValid;
  };

  const handleContinue = () => {
    if (!validateEmail()) {
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
      <View>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <ProgressIndicator totalSteps={7} currentStep={1} />
        <Text style={styles.title}>What's your email?</Text>
        <View style={{ position: "relative", marginBottom: 15 }}>
          <TextInput
            placeholder="Email address"
            style={error ? [styles.input, styles.errorInput] : styles.input}
            value={registerData.email}
            onChangeText={(email) => {
              setRegisterData((prev) => {
                return { ...prev, email };
              });
              setError(null);
            }}
          />
          {registerData.email !== "" && (
            <FontAwesome6
              name="circle-xmark"
              style={
                error ? [styles.clearIcon, styles.errorIcon] : styles.clearIcon
              }
              onPress={() => {
                setError(null);
                setRegisterData((prev) => {
                  return { ...prev, email: "" };
                });
              }}
            />
          )}
          {error && <RegisterError error={error} />}
        </View>
      </View>
      <TouchableOpacity
        style={
          isActiveBtn
            ? styles.button
            : { ...styles.button, backgroundColor: "lightgray" }
        }
        onPress={handleContinue}
      >
        <Text
          style={
            isActiveBtn
              ? styles.buttonText
              : { ...styles.buttonText, color: "#000" }
          }
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
