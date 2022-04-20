import {
  View,
  Text,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import styles from "../../utility/style";
import CustomInput from "../../customComponent/CustomInput";
import CustomButton from "../../customComponent/CustomButton";
import { useForm } from "react-hook-form";
import { authentication } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ConfirmEmailScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [isAnotherLoading, setIsAnotherLoading] = useState(false);

  const ConfirmButton = (data) => {
    const { email, username } = data;

    sendPasswordResetEmail(authentication, email)
      .then((res) => {
        setIsLoading(false);
        ToastAndroid.show("Email has been sent.", ToastAndroid.SHORT);
        navigation.navigate("Signin");
      })
      .catch((err) => {
        ToastAndroid.show("Something went wrong.", ToastAndroid.SHORT);
        setIsLoading(false);
      });
    setIsLoading(true);
  };

  const ResendEmail = (data) => {
    const { email, username } = data;

    sendPasswordResetEmail(authentication, email)
      .then((res) => {
        setIsAnotherLoading(false);
        ToastAndroid.show("Email has been sent again.", ToastAndroid.SHORT);
        navigation.navigate("Signin");
      })
      .catch((err) => {
        ToastAndroid.show("Something went wrong.", ToastAndroid.SHORT);
        setIsAnotherLoading(false);
      });
    setIsAnotherLoading(true);
  };

  const SignInPress = () => {
    navigation.navigate("Signin");
  };

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.screen_header}>Confirm your Email</Text>

        <CustomInput
          name={"email"}
          control={control}
          rules={{
            required: "Email is required",
            pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
          }}
          textPlaceholder={"Email"}
          autoCapitalize={"none"}
          iconName={"mail-outline"}
        />

        <CustomButton
          onPress={handleSubmit(ConfirmButton)}
          btnTitle={
            isLoading ? (
              <ActivityIndicator size={"large"} color="white" />
            ) : (
              "Send Email"
            )
          }
        />

        <CustomButton
          onPress={handleSubmit(ResendEmail)}
          btnTitle={
            isAnotherLoading ? (
              <ActivityIndicator size={"large"} color="#3B71F3" />
            ) : (
              "Resend Email"
            )
          }
          type="SECONDARY"
        />

        <CustomButton
          onPress={SignInPress}
          btnTitle={"Back to Sign-in"}
          type="TERTIARY"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
