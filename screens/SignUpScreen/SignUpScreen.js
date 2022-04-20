import {
  Text,
  ScrollView,
  View,
  ToastAndroid,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState, useContext } from "react";
import styles from "../../utility/style";
import CustomInput from "../../customComponent/CustomInput";
import CustomButton from "../../customComponent/CustomButton";
import { useForm, useFormState } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../../firebase";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialContext } from "../../CredentialContext";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const USERNAME_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

export default function SignUpScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const { storedCredential, setStoredCredential } =
    useContext(CredentialContext);

  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");

  const onRegisterPressed = (data) => {
    const { email, username, password } = data;

    createUserWithEmailAndPassword(authentication, email, password)
      .then((res) => {
        ToastAndroid.show("Registered", ToastAndroid.SHORT);
        setIsLoading(false);

        persistLogin(data);
      })
      .catch((err) => {
        alert("Something went wrong!!", err.message);
        setIsLoading(false);
      });
    setIsLoading(true);
    // navigation.navigate("Signin");
    setTimeout(() => navigation.navigate("Signin"), 2000);
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

  const onSignInPress = () => {
    navigation.navigate("Signin");
  };
  const onPressTermUse = () => {
    console.warn("Term of use");
  };
  const onPressPrivacyPolicy = () => {
    console.warn("Privacy Policy");
  };

  // ---------------------Show/Hide Password-------------------

  const [confirmPassword, setConfirmPassword] = useState(true);

  const HideConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  };

  return (
    <SafeAreaView style={styles.HomeContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.screen_header}>Create an Account</Text>
        {/* <Text style={styles.fieldText}>Enter a Username:</Text> */}

        {/* <CustomInput
        name={"firstname"}
        textPlaceholder={"First Name"}
        control={control}
        rules={{ required: "First name is required." }}
        autoFocus={true}
      />
      <CustomInput
        name={"lastname"}
        textPlaceholder={"Last Name"}
        control={control}
        rules={{ required: "First name is required." }}
      /> */}
        <CustomInput
          name={"username"}
          control={control}
          rules={{
            required: "Username is required",
            pattern: {
              value: USERNAME_REGEX,
              message: "Username should have 8 characters long.",
            },
          }}
          textPlaceholder={"Username"}
          iconName={"person-outline"}
        />
        {/* <Text style={styles.fieldText}>Enter Your Email:</Text> */}
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
        {/* <Text style={styles.fieldText}>Enter Your Password:</Text> */}
        <CustomInput
          name={"password"}
          control={control}
          rules={{
            required: "Password is required",
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Password should atleast have a number and 8 characters.",
            },
          }}
          textPlaceholder={"Password"}
          iconName={"key-outline"}
          secureTextEntry
        />
        {/* <Text style={styles.fieldText}>Confirm Password:</Text> */}
        <CustomInput
          name={"confirmPassword"}
          control={control}
          rules={{
            required: "Password do not match",
            validate: (value) => value === pwd || "Password do not match",
          }}
          textPlaceholder={"Confirm Password"}
          iconName={confirmPassword ? "eye-outline" : "eye-off-outline"}
          secureTextEntry={confirmPassword}
          onIconPress={HideConfirmPassword}
        />
        <CustomButton
          btnTitle={
            isLoading ? (
              <ActivityIndicator size={"large"} color="white" />
            ) : (
              "Register"
            )
          }
          onPress={handleSubmit(onRegisterPressed)}
        />
        <Text style={{ lineHeight: 20 }}>
          By registering you confirm that you accept our{" "}
          <Text onPress={onPressTermUse} style={styles.link}>
            Term of use
          </Text>{" "}
          and{" "}
          <Text onPress={onPressPrivacyPolicy} style={styles.link}>
            Privacy Policy.
          </Text>
        </Text>
        <CustomButton
          btnTitle={
            <Text>
              Already have an account!{" "}
              <Text style={styles.underline_btn_text}>Sign-In</Text>
            </Text>
          }
          type="TERTIARY"
          onPress={onSignInPress}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
