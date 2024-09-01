import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";
import { FontAwesome5 } from "@expo/vector-icons";
import CountryPicker, {
  Country as ICountry,
} from "react-native-country-picker-modal";

export default function Country() {
  const { registerData, setRegisterData } = useRegisterData();
  const router = useRouter();
  const [showPicker, setShowPicker] = useState(false);

  const handleContinue = () => {
    router.push("/register/topics");
  };

  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, country: "" };
    });
    router.back();
  };

  const handleCountrySelect = (country: ICountry) => {
    setRegisterData((prev) => {
      return { ...prev, country: country.name as string };
    });
    setShowPicker(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <ProgressIndicator totalSteps={7} currentStep={6} />
        <Text style={styles.title}>What's your country or region?</Text>
        <Text
          style={{
            marginBottom: 20,
            textAlign: "center",
            fontSize: 16,
            fontWeight: "500",
          }}
        >
          This helps us find you more relevant content. We won't show it on your
          profile.
        </Text>
        <TouchableOpacity
          style={{
            ...styles.input,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
          onPress={() => setShowPicker(true)}
        >
          <Text style={{ alignItems: "center" }}>
            {registerData.country || "Select your country"}
          </Text>
          <FontAwesome5 name="chevron-right" size={20} />
        </TouchableOpacity>
        <View style={{ display: showPicker ? "flex" : "none" }}>
          <CountryPicker
            countryCode="IL"
            withFlag={false}
            withCountryNameButton={false}
            withAlphaFilter={false}
            withCallingCode={false}
            withFilter={true}
            visible={showPicker}
            onSelect={handleCountrySelect}
            onClose={() => setShowPicker(false)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
