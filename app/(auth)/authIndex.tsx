import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRegisterData } from "@/context/registerContext";
import { secrets } from "@/secret";

const AuthIndex = () => {
  const [email, setEmail] = useState("");
  const { registerData, setRegisterData } = useRegisterData();
  const router = useRouter();
  GoogleSignin.configure({
    webClientId: secrets.googleWebClient,
  });

  const validateEmail = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email);
  };

  const checkEmailExists = async () => {
    console.log({ email });
    try {
      //axios getUserByEmail from MongoDB
      return false; //! Change to true
    } catch (error) {
      console.log("Error checking email:", error);
      return false;
    }
  };

  const continueHandler = async () => {
    if (!validateEmail()) {
      console.log("Invalid Email entered");
      return;
    }
    setRegisterData((prev) => {
      return { ...prev, email };
    });
    try {
      const isExist = await checkEmailExists();
      if (isExist) {
        router.push("/(auth)/login");
      } else {
        router.push("/(auth)/register/password");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

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

  return (
    <View style={styles.container}>
      <View
        style={{
          position: "relative",
          top: -28,
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          style={{ height: 85, width: 85 }}
          source={require("@/assets/images/pinterest-logo-8561DDA2E1-seeklogo.com.png")}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 28, fontWeight: 700 }}>
          Welcome to Pinterest
        </Text>
      </View>
      <View style={{ gap: 22 }}>
        <View style={{ gap: 16 }}>
          <TextInput
            placeholder="Email address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.button} onPress={continueHandler}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={{ gap: 8 }}>
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
        <View style={styles.tos}>
          <Text style={styles.tosText}>
            By continuing, you agree to pinterest's{" "}
            <Text style={styles.themedLink}>Terms of Service</Text> and
            acknowledge that you've read our{" "}
            <Text style={styles.themedLink}>
              Privacy Policy. Notice at collection.
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 8,
  },
  input: {
    height: 50,
    fontSize: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: "lightgray",
    width: 350,
    marginBottom: 15,
    borderRadius: 15,
  },
  button: {
    backgroundColor: "#d60021",
    height: 45,
    width: 350,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  tos: {
    textAlign: "center",
    width: 350,
    marginVertical: 8,
  },
  tosText: {
    textAlign: "center",
    fontSize: 12,
  },
  themedLink: {
    color: "#1579d1",
    fontWeight: "bold",
  },
});

export default AuthIndex;
