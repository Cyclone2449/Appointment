import { TextInput, View, StyleSheet, Text } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import Icon from "react-native-vector-icons/Ionicons";

export default function CustomInput({
  control,
  name,
  textPlaceholder,
  rules = {},
  secureTextEntry,
  autoFocus = false,
  autoCapitalize,
  iconName,
  onIconPress,
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "black" },
              {
                flexDirection: "row",
                justifyContent: "space-between",
                paddingRight: 20,
              },
            ]}
          >
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={textPlaceholder}
              secureTextEntry={secureTextEntry}
              autoFocus={autoFocus}
              autoCapitalize={autoCapitalize}
            />
            <Icon
              onPress={onIconPress}
              name={iconName}
              size={25}
              style={{ color: error ? "red" : "#2a3030" }}
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 8,
    paddingLeft: 15,
    height: 50,

    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,

    paddingHorizontal: 5,
    marginVertical: 5,
  },
});
