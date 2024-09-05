import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import RegisterError, { IValidationError } from "@/components/RegisterError";

export default function Password() {
  const [err, setErr] = useState<IValidationError | null>(null);
  const { registerData, setRegisterData } = useRegisterData();
  const isActiveBtn = registerData.password.length >= 6;
  const [securePass, setSecurePass] = useState(true);
  const router = useRouter();

  const handleContinue = () => {
    if (!registerData.password) {
      setErr({ message: "Add your password" });
      return;
    }
    if (!isActiveBtn) return;
    try {
      router.push("/register/fullName");
    } catch (err) {
      console.log(err);
    }
  };
  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, password: "" };
    });
    router.replace("/register/email");
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <ProgressIndicator totalSteps={7} currentStep={2} />
        <Text style={styles.title}>Create a password</Text>
        <View style={{ position: "relative", width: "100%" }}>
          <TextInput
            autoFocus={true}
            style={err ? [styles.input, styles.errorInput] : styles.input}
            placeholder="Password"
            value={registerData.password}
            onChangeText={(password) => {
              setErr(null);
              setRegisterData((prev) => {
                return { ...prev, password };
              });
            }}
            secureTextEntry={securePass}
          />
          <Ionicons
            name={securePass ? "eye" : "eye-off"}
            size={24}
            style={{
              position: "absolute",
              right: 16,
              top: 12,
              color: err ? "#d60021" : "gray",
            }}
            onPress={() => {
              setSecurePass((prev) => !prev);
            }}
          />
          {err && <RegisterError error={err} />}
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
