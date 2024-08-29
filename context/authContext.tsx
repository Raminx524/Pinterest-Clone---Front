import React, { createContext, useEffect, useState, ReactNode } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

interface AuthContextProps {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialUser = auth().currentUser;

    if (initialUser) {
      setUser(initialUser);
    }
    if (loading) setLoading(false);

    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
