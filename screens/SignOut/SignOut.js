import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React, { useContext } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { authentication } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialContext } from "../../CredentialContext";

export default function SignOut() {
  const navigation = useNavigation();

  const { storedCredential, setStoredCredential } =
    useContext(CredentialContext);

  const SignOutPress = () => {
    signOut(authentication)
      .then((res) => {
        console.log(storedCredential);
        // navigation.navigate("Signin");
        ToastAndroid.show("Signed Out.", ToastAndroid.SHORT);
        RemoveAsyncData();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const RemoveAsyncData = () => {
    AsyncStorage.removeItem("Appointment")
      .then(() => {
        setStoredCredential("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <TouchableOpacity style={{ paddingVertical: 15 }} onPress={SignOutPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="exit-outline" size={22} />
        <Text
          style={{
            fontSize: 15,
            marginLeft: 10,
          }}
        >
          Logout
        </Text>
      </View>
    </TouchableOpacity>
  );
}
