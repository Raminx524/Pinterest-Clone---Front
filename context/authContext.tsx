import React, { createContext, useEffect, useState, ReactNode } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import api from "@/utils/api.service";

interface AuthContextProps {
  user: MongoUser | null;
  loading: boolean;
  setUser: (user: MongoUser | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  setUser: () => {},
});

interface AuthContextProviderProps {
  children: ReactNode;
}

interface MongoUser {
  __v: number;
  _id: string;
  boards: any[];
  country: string;
  createdAt: string;
  dob: string;
  email: string;
  firebaseUid: string;
  followers: any[];
  following: any[];
  gender: string;
  pins: any[];
  searchHistory: any[];
  topics: any[];
  updatedAt: string;
  username: string;
}

const getUserFromMongo = async (firebaseUid: string) => {
  try {
    const res = await api.get(`/user/?firebaseUid=${firebaseUid}`);
    console.log(res.data);

    return res.data;
  } catch (err) {
    console.log("Error fetching user data from mongo: ", err);
    return null;
  }
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<MongoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      const initialUser = auth().currentUser;
      if (initialUser) {
        setUser(await getUserFromMongo(initialUser.uid));
      }
      if (loading) setLoading(false);
    };
    initUser();
  }, []);
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      let newUser;
      try {
        if (user) {
          newUser = await getUserFromMongo(user.uid);
        } else newUser = user;
      } catch (err) {
        console.log("Error fetching user from mongo");
      }
      setUser(newUser);
      setLoading(false);
    });

    return unsubscribe;
  }, [auth().currentUser]);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
