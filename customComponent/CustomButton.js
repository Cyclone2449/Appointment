import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

function Button({ btnTitle, onPress, type = "PRIMARY", bgColor, fgColor }) {
  return (
    <TouchableOpacity
      disabled={false}
      onPress={onPress}
      style={[
        styles.btn,
        styles[`btn_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {btnTitle}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginVertical: 5,
    borderRadius: 10,
    padding: 5,
    height: 50,
  },

  btn_PRIMARY: {
    backgroundColor: "#3B71F3",
  },

  btn_SECONDARY: {
    borderColor: "#3B71F3",
    borderWidth: 2,
  },

  btn_TERTIARY: {},

  text: {
    fontSize: 17,
    padding: 5,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },

  text_PRIMARY: {
    color: "white",
  },

  text_SECONDARY: {
    color: "#3B71F3",
  },

  text_TERTIARY: {
    color: "black",
  },
});

export default Button;
