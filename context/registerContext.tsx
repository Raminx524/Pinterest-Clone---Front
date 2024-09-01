import React, { createContext, useContext, useState, ReactNode } from "react";

interface IRegisterData {
  email: string;
  password: string;
  fullName: string;
  dob: string;
  country: string;
  gender: string;
  topics: string[];
}

interface IRegisterContext {
  registerData: IRegisterData;
  setRegisterData: React.Dispatch<React.SetStateAction<IRegisterData>>;
}

const registerContext = createContext<IRegisterContext | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialData: IRegisterData = {
    email: "",
    password: "",
    fullName: "",
    dob: "",
    country: "",
    gender: "",
    topics: [],
  };
  const [registerData, setRegisterData] = useState<IRegisterData>(initialData);
  return (
    <registerContext.Provider value={{ registerData, setRegisterData }}>
      {children}
    </registerContext.Provider>
  );
};

export const useRegisterData = (): IRegisterContext => {
  const context = useContext(registerContext);
  if (context === undefined) {
    throw new Error("registerContext must be used within a RegisterProvider");
  }
  return context;
};
