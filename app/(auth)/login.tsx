import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import auth from "@react-native-firebase/auth";
import { styles } from "@/styles/authRegisterStyles";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import RegisterError, { IValidationError } from "@/components/RegisterError";
import { useRegisterData } from "@/context/registerContext";

export default function Login() {
  const router = useRouter();
  const [err, setErr] = useState<IValidationError | null>(null);
  const { registerData, setRegisterData } = useRegisterData();
  const [securePass, setSecurePass] = useState(true);

  const facebookHandler = async () => {};

  const googleHandler = async () => {
    try {
      // Get the user's ID token
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );

      // Sign in with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );

      console.log("User signed in: ", userCredential.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogin = async () => {
    if (!registerData.email || !registerData.password) {
      setErr({ message: "Please enter email and password" });
      return;
    }
    try {
      await auth().signInWithEmailAndPassword(
        registerData.email,
        registerData.password
      );
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <View style={custom.container}>
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "lightgray",
          borderBottomWidth: 1,
          width: "100%",
          justifyContent: "center",
          position: "relative",
          paddingBottom: 20,
        }}
      >
        <FontAwesome6
          name="x"
          size={18}
          style={{ position: "absolute", left: 0, top: 5 }}
          onPress={() => {
            setRegisterData((prev) => {
              return { ...prev, email: "", password: "" };
            });
            router.back();
          }}
        />
        <Text style={{ ...styles.title, fontSize: 16 }}>Log In</Text>
      </View>
      <View style={{ width: "85%", gap: 30 }}>
        <View style={{ gap: 8, width: "100%" }}>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#0074e8" }}
            onPress={facebookHandler}
          >
            <Text style={styles.buttonText}>Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "#e6e6e6" }}
            onPress={googleHandler}
          >
            <Text style={{ ...styles.buttonText, color: "#202124" }}>
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 16, fontWeight: "600", textAlign: "center" }}>
          Or
        </Text>
        <View style={{ gap: 8 }}>
          <View style={{ position: "relative" }}>
            <TextInput
              placeholder="Email address"
              style={err ? [custom.input, styles.errorInput] : custom.input}
              value={registerData.email}
              onChangeText={(email) => {
                setRegisterData((prev) => {
                  return { ...prev, email };
                });
                setErr(null);
              }}
            />
            {registerData.email !== "" && (
              <FontAwesome6
                name="circle-xmark"
                style={
                  err ? [styles.clearIcon, styles.errorIcon] : styles.clearIcon
                }
                onPress={() => {
                  setErr(null);
                  setRegisterData((prev) => {
                    return { ...prev, email: "" };
                  });
                }}
              />
            )}
          </View>
          <View style={{ position: "relative", width: "100%" }}>
            <TextInput
              autoFocus={true}
              style={err ? [custom.input, styles.errorInput] : custom.input}
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
            <FontAwesome5
              name={`eye${securePass ? "" : "-slash"}`}
              size={24}
              color="#000"
              style={{
                position: "absolute",
                right: 12,
                top: 10,
                color: err ? "#d60021" : "black",
              }}
              onPress={() => {
                setSecurePass((prev) => !prev);
              }}
            />
          </View>
          {err && <RegisterError error={err} />}
        </View>
        <View style={{ width: "100%", alignItems: "center", gap: 8 }}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <Text style={{ fontWeight: "bold", color: "gray", fontSize: 16 }}>
            Forgot password?
          </Text>
        </View>
      </View>
    </View>
  );
}

const custom = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
    flex: 1,
    alignItems: "center",
    gap: 40,
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  input: {
    height: 50,
    width: 350,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
});
