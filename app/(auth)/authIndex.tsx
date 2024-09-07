import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import auth, { firebase } from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useRegisterData } from "@/context/registerContext";
import { secrets } from "@/secret";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import RegisterError, { IValidationError } from "@/components/RegisterError";
import axios from "axios";
import { getCountryFromLocation } from "@/utils/getCountry";

const AuthIndex = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<IValidationError | null>(null);
  const { setRegisterData } = useRegisterData();
  const router = useRouter();
  GoogleSignin.configure({
    webClientId: secrets.googleWebClient,
  });

  const validateEmail = () => {
    if (email === "") {
      setError({ message: "Please enter your email" });
      return false;
    }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const isValid = reg.test(email);
    if (!isValid) {
      setError({ message: "Sorry, this doesn't look like a valid email" });
    }
    return isValid;
  };

  const checkEmailExists = async (emailToCheck: string) => {
    try {
      await axios.get(`http://10.0.2.2:3000/api/user?email=${emailToCheck}`);
      return true;
    } catch (error: any) {
      if (error.status !== 404) console.log("Error checking email:", error);
      return false;
    }
  };

  const continueHandler = async () => {
    if (!validateEmail()) {
      return;
    }
    setRegisterData((prev) => {
      return { ...prev, email };
    });
    try {
      const isExist = await checkEmailExists(email);
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

      const country = await getCountryFromLocation();

      // Sign in with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );
      const isExist = await checkEmailExists(userInfo.user.email);
      console.log({ isExist });

      if (!isExist) {
        const newUser = {
          firebaseUid: userCredential.user.uid,
          email: userCredential.user.email,
          username: userCredential.user.displayName,
          avatar: userCredential.user.photoURL,
          dob: "2000-01-01",
          gender: "Other",
          country,
          topics: [],
        };
        let linkPlatform = "http://localhost";
        if (Platform.OS == "ios") {
          linkPlatform = "http://localhost";
        } else if (Platform.OS == "android") {
          linkPlatform = "http://10.0.2.2";
        }
        const resAxios = await axios.post(
          linkPlatform + ":3000/api/user",
          newUser
        );
        console.log({ resAxios });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("@/assets/images/authBG.gif")}
        style={styles.backgroundImage}
      />
      <View style={styles.headerContainer}>
        <LinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
          style={styles.gradientOverlay}
          locations={[0.2, 0.4]} // This sets the gradient to be 20% transparent and 80% white
        />
        <Image
          style={styles.logo}
          source={require("@/assets/images/pinterest-logo-8561DDA2E1-seeklogo.com.png")}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Welcome to Pinterest</Text>
      </View>
      <View style={{ gap: 22 }}>
        <View style={{ gap: 16 }}>
          <View style={{ position: "relative", marginBottom: 15 }}>
            <TextInput
              placeholder="Email address"
              style={error ? [styles.input, styles.errorInput] : styles.input}
              value={email}
              onChangeText={(txt) => {
                setEmail(txt);
                setError(null);
              }}
            />
            {email !== "" && (
              <AntDesign
                name="closecircle"
                color="gray"
                style={
                  error
                    ? [styles.clearIcon, styles.errorIcon]
                    : styles.clearIcon
                }
                onPress={() => setEmail("")}
              />
            )}
            {error && <RegisterError error={error} />}
          </View>
          <TouchableOpacity style={styles.button} onPress={continueHandler}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
        <View style={{ gap: 8 }}>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: "#0074e8",
              flexDirection: "row",
            }}
            onPress={facebookHandler}
          >
            <FontAwesome6
              name="facebook"
              size={24}
              color="white"
              style={{ position: "absolute", left: 12 }}
            />
            <Text style={styles.buttonText}>Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: "#f2f2f2",
              flexDirection: "row",
            }}
            onPress={googleHandler}
          >
            <Image
              source={require("@/assets/images/google-icon.png")}
              style={{ height: 24, width: 24, position: "absolute", left: 12 }}
            />
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 8,
    paddingTop: 30,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -25,
    height: "60%",
    zIndex: 1,
  },
  backgroundImage: {
    marginTop: 40,
    width: "100%",
    height: "50%",
    borderRadius: 15,
  },
  headerContainer: {
    position: "relative",
    width: "100%",
    top: -28,
    alignItems: "center",
    gap: 10,
    backgroundColor: "fff",
    zIndex: 3,
  },
  logo: {
    height: 85,
    width: 85,
    zIndex: 5,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    zIndex: 5,
  },
  input: {
    height: 50,
    fontSize: 16,
    padding: 12,
    borderWidth: 2,
    borderColor: "lightgray",
    width: 350,
    marginBottom: 4,
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
  errorView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  errorText: {
    color: "#d60021",
    fontSize: 12,
  },
  errorInput: {
    borderColor: "#d60021",
  },
  errorIcon: {
    color: "#d60021",
    fontSize: 20,
  },
  clearIcon: {
    position: "absolute",
    right: 12,
    top: 14,
    fontSize: 20,
  },
});

export default AuthIndex;
