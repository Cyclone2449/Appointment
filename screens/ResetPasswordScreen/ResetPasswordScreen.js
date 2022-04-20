import { View, Text, ScrollView, SafeAreaView } from "react-native";
import React, { useState } from "react";
import styles from "../../utility/style";
import CustomInput from "../../customComponent/CustomInput";
import CustomButton from "../../customComponent/CustomButton";
import { useForm } from "react-hook-form";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ResetPasswordScreen({ navigation }) {
  const { control, handleSubmit } = useForm();

  const SendButton = (data) => {
    navigation.navigate("Newpassword");
  };

  const SignInPress = () => {
    navigation.navigate("Signin");
  };
  return (
    <SafeAreaView style={styles.HomeContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.screen_header}>Reset Password</Text>
        <CustomInput
          name={"email"}
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
          textPlaceholder={"Enter you Email"}
          autoFocus={true}
        />

        <CustomButton onPress={handleSubmit(SendButton)} btnTitle={"Send"} />

        <CustomButton
          onPress={SignInPress}
          btnTitle={"Back to Sign-in"}
          type="TERTIARY"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
