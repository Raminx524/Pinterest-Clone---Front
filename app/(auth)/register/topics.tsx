import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";
import { FontAwesome5 } from "@expo/vector-icons";

const TOPICS = [
  "Art",
  "Photography",
  "Food",
  "Travel",
  "Fashion",
  "DIY",
  "Home Decor",
  "Technology",
  "Sports",
  "Fitness",
  "Music",
  "Books",
  "Movies",
  "Nature",
];

export default function Topics() {
  const { registerData, setRegisterData } = useRegisterData();
  const router = useRouter();

  const toggleTopic = (topic: string) => {
    setRegisterData((prev) => {
      return prev.topics.includes(topic)
        ? { ...prev, topics: prev.topics.filter((t) => t !== topic) }
        : { ...prev, topics: [...prev.topics, topic] };
    });
  };

  const handleFinishRegistration = async () => {
    try {
      console.log({ registerData });

      // Here you would typically create the user in Firebase
      // For this example, we'll just sign in the user
      // In a real app, you'd collect all the information from previous steps
      //* await auth().createUserWithEmailAndPassword(
      //*   "example@email.com",
      //*   "password"
      //* );
      // You might want to save the selected topics to the user's profile here
      //* router.replace("/(tabs)");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, topics: [] };
    });
    router.back();
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <ProgressIndicator totalSteps={7} currentStep={7} />
        <Text style={styles.title}>Choose your interests</Text>
        <ScrollView style={styles.topicsContainer}>
          {TOPICS.map((topic) => (
            <TouchableOpacity
              key={topic}
              style={[
                styles.topicButton,
                registerData.topics.includes(topic) &&
                  styles.selectedTopicButton,
              ]}
              onPress={() => toggleTopic(topic)}
            >
              <Text style={styles.topicButtonText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.finishButton}
        onPress={handleFinishRegistration}
      >
        <Text style={styles.buttonText}>Finish Registration</Text>
      </TouchableOpacity>
    </View>
  );
}
