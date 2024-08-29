import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "lightgray",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 5,
    width: 200,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "red",
  },
  continueButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  topicsContainer: {
    maxHeight: 300,
    width: "100%",
  },
  topicButton: {
    backgroundColor: "lightgray",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
  },
  selectedTopicButton: {
    backgroundColor: "red",
  },
  topicButtonText: {
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  backButton: {
    marginTop: 10,
  },
  backButtonText: {
    color: "blue",
    fontSize: 16,
  },
});
