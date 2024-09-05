import ProgressIndicator from "@/components/registerBullets";
import { Text, View } from "@/components/Themed";
import { useRegisterData } from "@/context/registerContext";
import { styles } from "@/styles/authRegisterStyles";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function DOB() {
  const router = useRouter();
  const { registerData, setRegisterData } = useRegisterData();
  const [pickedDate, setPickedDate] = useState<Date>(new Date(1598051730000));
  const [show, setShow] = useState(true);

  const onChange = (e: any, val: Date | undefined) => {
    setShow(false);
    if (val) setPickedDate(val);
  };

  const handleContinue = () => {
    if (+(new Date().getFullYear() - pickedDate.getFullYear()) < 16) {
      console.log("invalid");
      return;
    }

    setRegisterData((prev) => {
      return {
        ...prev,
        dob: pickedDate.toLocaleString("en-US").split(",")[0],
      };
    });
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
      <View>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <ProgressIndicator totalSteps={7} currentStep={4} />
        <Text style={styles.title}>
          Hi {registerData.fullName}! Enter your birthdate
        </Text>
        <Text style={{ textAlign: "center", marginBottom: 20, fontSize: 16 }}>
          To help keep Pinterest safe, we now require your birthdate. Your
          birthdate also helps us provide more personalized recommendations and
          relevant ads. We won't share this information without your permissions
          and it won't be visible on your profile.
        </Text>
        <Pressable onPress={() => setShow(true)}>
          <Text
            style={{
              textAlign: "center",
              marginVertical: 10,
              fontSize: 35,
              fontWeight: "700",
            }}
          >
            {pickedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
        </Pressable>
        <Text style={{ textAlign: "center" }}>
          Use your own age, even if this is a business account
        </Text>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={pickedDate}
          onChange={onChange}
          display="spinner"
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}
