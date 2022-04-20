import { Text, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import styles from "../../utility/style";
import CustomInput from "../../customComponent/CustomInput";
import CustomButton from "../../customComponent/CustomButton";
import { useForm } from "react-hook-form";

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function ResetPasswordScreen({ navigation }) {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("newPassword");

  const SendButton = () => {
    console.warn("password Changed");
    navigation.navigate("Home");
  };

  const SignInPress = () => {
    navigation.navigate("Signin");
  };
  return (
    <SafeAreaView>
      <ScrollView
        style={styles.HomeContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screen_header}>Reset Password</Text>
        <CustomInput
          name={"code"}
          control={control}
          rules={{ required: "Confirmation code is required" }}
          textPlaceholder={"Enter Confirmation Code"}
          autoFocus={true}
        />
        <CustomInput
          name={"newPassword"}
          control={control}
          rules={{
            required: "Password is required",
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Password should atleast have a number and 8 characters.",
            },
          }}
          textPlaceholder={"Enter new Password"}
          secureTextEntry
        />
        {/* <Text style={styles.fieldText}>Confirm Password:</Text> */}
        <CustomInput
          name={"confirmNewPassword"}
          control={control}
          rules={{
            required: "Password do not match",
            validate: (value) => value === pwd || "Password do not match",
          }}
          textPlaceholder={"Confirm new Password"}
          secureTextEntry
        />

        <CustomButton onPress={handleSubmit(SendButton)} btnTitle={"Submit"} />

        <CustomButton
          onPress={SignInPress}
          btnTitle={"Back to Sign-in"}
          type="TERTIARY"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
