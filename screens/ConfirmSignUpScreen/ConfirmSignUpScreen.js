import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import styles from "../../utility/style";
import CustomInput from "../../customComponent/CustomInput";
import CustomButton from "../../customComponent/CustomButton";
import { useForm } from "react-hook-form";

const ConfirmSignUpScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();

  const onConfirmPress = () => {
    navigation.navigate("Signin");
  };
  return (
    <SafeAreaView style={styles.HomeContainer}>
      <Text style={styles.screen_header}>Confirm OTP</Text>
      <View>
        <CustomInput
          name={"code"}
          control={control}
          rules={{ required: "Confirmation code is required" }}
          textPlaceholder={"Enter Con firmation Code"}
          autoFocus={true}
        />
        <CustomButton
          btnTitle={"Confirm"}
          onPress={handleSubmit(onConfirmPress)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmSignUpScreen;
