import axios from "axios";
import { Platform } from "react-native";
import auth from "@react-native-firebase/auth";

// const apiUrl =
//   process.env.NODE_ENV === "production" ? "/api" : "//localhost:3000/api";
const apiUrl =
  Platform.OS === "android"
    ? "http://10.0.2.2:3000/api"
    : "http://localhost:3000/api";
if (!apiUrl) {
  throw new Error("API_URL is not defined");
}

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  (config) => {
    console.log(auth().currentUser?.getIdToken());

    let token = auth().currentUser?.getIdToken();
    // token = token?.slice(1, -1);
    console.log({ token });

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
