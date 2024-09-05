import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 50,
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: 400,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  button: {
    backgroundColor: "#d60021",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 2,
    width: "100%",
    alignItems: "center",
  },
  genderBtn: {
    backgroundColor: "lightgray",
    paddingVertical: 12,
  },
  selectedButton: {
    backgroundColor: "#d60021",
  },
  continueButton: {
    backgroundColor: "#d60021",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
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
    backgroundColor: "#d60021",
  },
  topicButtonText: {
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: "#d60021",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  backButton: {
    position: "absolute",
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
    borderWidth: 2,
  },
  errorIcon: {
    color: "#d60021",
    fontSize: 20,
  },
  clearIcon: {
    position: "absolute",
    right: 17,
    top: 15,
    fontSize: 20,
  },
});
