import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import auth, { firebase } from "@react-native-firebase/auth";
import { styles } from "@/styles/authRegisterStyles";
import ProgressIndicator from "@/components/registerBullets";
import { useRegisterData } from "@/context/registerContext";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import api from "@/utils/api.service";
import { AuthContext } from "@/context/authContext";
interface ITopics {
  _id: string;
  title: string;
  image: string;
}

export default function Topics() {
  const { registerData, setRegisterData } = useRegisterData();
  const { setUser } = useContext(AuthContext);
  const [topics, setTopics] = useState<ITopics[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getTopics = async () => {
      setLoading(true);
      try {
        const res = await api.get("/topic");
        setTopics(res.data);
      } catch (err) {
        console.log("Error fetching topics: ", err);
      } finally {
        setLoading(false);
      }
    };
    getTopics();
  }, []);

  const toggleTopic = (topic: string) => {
    setRegisterData((prev) => {
      return prev.topics.includes(topic)
        ? { ...prev, topics: prev.topics.filter((t) => t !== topic) }
        : { ...prev, topics: [...prev.topics, topic] };
    });
  };

  const handleFinishRegistration = async () => {
    try {
      const userCred = await auth().createUserWithEmailAndPassword(
        registerData.email,
        registerData.password
      );
      console.log(userCred);

      const newUserData = {
        firebaseUid: userCred.user.uid,
        email: registerData.email,
        username: registerData.fullName,
        avatar: "",
        dob: registerData.dob,
        gender: registerData.gender,
        country: registerData.country,
        topics: registerData.topics,
      };
      const res = await axios.post(
        "http://10.0.2.2:3000/api/user",
        newUserData
      );
      setUser(res.data);

      router.replace("/(tabs)");
    } catch (error) {
      console.error("Registration error:", { error });
    }
  };

  const handleBack = () => {
    setRegisterData((prev) => {
      return { ...prev, topics: [] };
    });
    router.back();
  };
  if (loading)
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <View style={{ ...styles.container, position: "relative" }}>
      <View style={{ width: "100%" }}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <FontAwesome5 name="chevron-left" size={20} />
        </TouchableOpacity>
        <ProgressIndicator totalSteps={7} currentStep={7} />
        <View style={{ marginVertical: 20, gap: 2 }}>
          <Text style={styles.title}>What are you interested in?</Text>
          <Text
            style={{ textAlign: "center", fontSize: 15, fontWeight: "500" }}
          >
            Pick 5 to customize your home feed
          </Text>
        </View>
        {topics && (
          <FlatList
            keyExtractor={(item) => item._id}
            numColumns={3}
            contentContainerStyle={{ gap: 20 }}
            columnWrapperStyle={{ gap: 16 }}
            data={topics}
            style={{ zIndex: 15 }}
            renderItem={({ item }) => {
              const isActive = registerData.topics.includes(item._id);
              return (
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => toggleTopic(item._id)}
                >
                  <View
                    style={[
                      { position: "relative" },
                      isActive
                        ? {
                            borderRadius: 15,
                            borderWidth: 2,
                            borderColor: "#010101",
                          }
                        : {},
                    ]}
                  >
                    <View
                      style={[
                        {
                          height: 23,
                          width: 23,
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          position: "absolute",
                          borderRadius: 15,
                          top: 8,
                          right: 8,
                          zIndex: 8,
                        },
                        isActive ? { display: "flex" } : { display: "none" },
                      ]}
                    >
                      <View
                        style={{
                          position: "absolute",
                          backgroundColor: "#fff",
                          height: 20,
                          width: 20,
                          top: 2,
                          left: 2,
                          borderRadius: 15,
                        }}
                      ></View>
                      <AntDesign
                        name="checksquare"
                        size={24}
                        color="black"
                        style={{ borderRadius: 15 }}
                      />
                    </View>
                    <Image
                      style={[
                        { height: 130, borderRadius: 15 },
                        isActive ? { borderWidth: 2, borderColor: "#fff" } : {},
                      ]}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <Text style={{ textAlign: "center" }}>{item.title}</Text>
                </TouchableOpacity>
              );
            }}
          ></FlatList>
        )}
      </View>
      <TouchableOpacity
        disabled={registerData.topics.length < 5}
        style={
          registerData.topics.length < 5
            ? {
                ...styles.finishButton,
                zIndex: 16,
                position: "absolute",
                bottom: 16,
                width: "100%",
                backgroundColor: "lightgray",
              }
            : {
                ...styles.finishButton,
                zIndex: 16,
                position: "absolute",
                bottom: 16,
                width: "100%",
              }
        }
        onPress={handleFinishRegistration}
      >
        <Text
          style={{
            ...styles.buttonText,
            textAlign: "center",
            color: registerData.topics.length < 5 ? "#000" : "#fff",
          }}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
