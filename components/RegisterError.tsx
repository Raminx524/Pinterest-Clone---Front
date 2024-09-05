import { View, Text } from "react-native";
import React from "react";
import { styles } from "@/styles/authRegisterStyles";
import { FontAwesome6 } from "@expo/vector-icons";

export interface IValidationError {
  message: string;
}

interface IErrorProps {
  error: IValidationError;
}

const RegisterError = (props: IErrorProps) => {
  const { error } = props;
  return (
    <View style={styles.errorView}>
      <FontAwesome6
        name="triangle-exclamation"
        style={{ ...styles.errorText, fontSize: 20 }}
      />
      <Text style={styles.errorText}>{error.message}</Text>
    </View>
  );
};

export default RegisterError;
