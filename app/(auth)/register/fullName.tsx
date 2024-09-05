import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";
import { AntDesign, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import RegisterError, { IValidationError } from "@/components/RegisterError";

export default function FullName() {
  const router = useRouter();
  const { registerData, setRegisterData } = useRegisterData();
  const isActiveBtn = registerData.fullName.length > 0;
  const [error, setError] = useState<IValidationError | null>(null);

  const handleContinue = () => {
    if (!registerData.fullName) {
      setError({ message: "Add your name" });
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
      <View>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <ProgressIndicator totalSteps={7} currentStep={3} />
        <Text style={styles.title}>What's your full name?</Text>
        <View style={{ position: "relative", marginBottom: 15 }}>
          <TextInput
            autoFocus={true}
            style={error ? [styles.input, styles.errorInput] : styles.input}
            placeholder="Full Name"
            value={registerData.fullName}
            onChangeText={(fullName) => {
              setError(null);
              setRegisterData((prev) => {
                return { ...prev, fullName };
              });
            }}
          />
          {registerData.fullName !== "" && (
            <AntDesign
              name="closecircle"
              color="gray"
              style={
                error ? [styles.clearIcon, styles.errorText] : styles.clearIcon
              }
              onPress={() =>
                setRegisterData((prev) => {
                  return { ...prev, fullName: "" };
                })
              }
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
