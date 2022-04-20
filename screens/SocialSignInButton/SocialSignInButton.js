import { View, Text } from "react-native";
import React from "react";
import CustomButton from "../../customComponent/CustomButton";
import { authentication } from "../../firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const onClickGoogle = () => {
  // provider.setCustomParameters({ prompt: "select_account" });

  // signInWithPopup(authentication, provider)
  //   .then((res) => {
  //     const credential = GoogleAuthProvider.credentialFromResult(res);
  //     const token = credential.accessToken;
  //     const user = res.user;
  //   })
  //   .catch((err) => {
  //     const errorCode = err.code;
  //     const errorMessage = err.message;
  //     const email = err.email;
  //     const credential = GoogleAuthProvider.credentialFromError(err);
  //   });

  getRedirectResult(authentication, provider)
    .then((res) => {
      const credential = GoogleAuthProvider.credentialFromResult(res);
      const token = credential.accessToken;
      const user = res.user;
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMessage = err.message;
      const email = err.email;
      const credential = GoogleAuthProvider.credentialFromError(err);
    });
};

const SocialSignInButton = () => {
  return (
    <View>
      <CustomButton
        fgColor="#FAE9EA"
        bgColor="#DD4D44"
        btnTitle={"Sign-In with Google"}
        onPress={onClickGoogle}
      />
    </View>
  );
};

export default SocialSignInButton;
