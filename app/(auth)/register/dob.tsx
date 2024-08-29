import ProgressIndicator from "@/components/registerBullets";
import { Text, View } from "@/components/Themed";
import { useRegisterData } from "@/context/registerContext";
import { styles } from "@/styles/authRegisterStyles";
import { useRouter } from "expo-router";
import { TextInput, TouchableOpacity } from "react-native";

export default function DOB() {
  const router = useRouter();
  const { registerData, setRegisterData } = useRegisterData();

  const handleContinue = () => {
    // You might want to validate the date format here
    router.push("/register/gender");
  };

  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, dob: "" };
    });
    router.back();
  };

  return (
    <View style={styles.container}>
      <ProgressIndicator totalSteps={7} currentStep={4} />
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>When's your birthday?</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/YYYY"
        value={registerData.dob}
        onChangeText={(dob) => {
          setRegisterData((prev) => {
            return { ...prev, dob };
          });
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
