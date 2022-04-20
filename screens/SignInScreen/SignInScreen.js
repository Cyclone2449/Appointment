import {
  Text,
  StatusBar,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import CustomInput from "../../customComponent/CustomInput";
import styles from "../../utility/style";
import CustomButton from "../../customComponent/CustomButton";
import SocialSignInButton from "../SocialSignInButton";
import { useForm } from "react-hook-form";
import { authentication } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialContext } from "../../CredentialContext";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export default function SignInScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { storedCredential, setStoredCredential } =
    useContext(CredentialContext);

  const onSignInPress = (data) => {
    signInWithEmailAndPassword(authentication, data.email, data.password)
      .then((res) => {
        setIsLoading(false);
        persistLogin(data);
      })
      .catch((err) => {
        console.log(err);
        ToastAndroid.show(
          `Username and Password are incorrect!!`,
          ToastAndroid.SHORT
        );
        setIsLoading(false);
      });
    setIsLoading(true);
  };

  const persistLogin = (credentials) => {
    AsyncStorage.setItem("Appointment", JSON.stringify(credentials))
      .then(() => {
        setStoredCredential(credentials);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onForgotPassword = () => {
    navigation.navigate("ConfirmEmail");
  };

  const onSignUp = () => {
    navigation.navigate("Signup");
  };

  // ---------------------Show/Hide Password-------------------

  const [showPassword, setShowPassword] = useState(true);

  const HidePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.screen_header}>LOGIN</Text>
        <StatusBar />

        <CustomInput
          name={"email"}
          textPlaceholder="Enter Your Email..."
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: EMAIL_REGEX,
              message: "Email is not valid.",
            },
          }}
          autoFocus={true}
          autoCapitalize={"none"}
          iconName={"mail-outline"}
        />

        <CustomInput
          name={"password"}
          textPlaceholder="Enter Your Password..."
          control={control}
          rules={{
            required: "Password is required",
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Password should atleast have a number and 8 characters.",
            },
          }}
          iconName={showPassword ? "eye-outline" : "eye-off-outline"}
          secureTextEntry={showPassword}
          autoCapitalize={"none"}
          onIconPress={HidePassword}
        />

        <CustomButton
          btnTitle={
            isLoading ? (
              <ActivityIndicator size={"large"} color="white" />
            ) : (
              "Sign In"
            )
          }
          onPress={handleSubmit(onSignInPress)}
          type="PRIMARY"
        />

        <CustomButton
          btnTitle={"Forgot password"}
          onPress={onForgotPassword}
          type="SECONDARY"
        />

        {/* <SocialSignInButton /> */}

        <CustomButton
          btnTitle={
            <Text>
              Don't have an account?{" "}
              <Text style={styles.underline_btn_text}>Sign Up here</Text>
            </Text>
          }
          onPress={onSignUp}
          type="TERTIARY"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
