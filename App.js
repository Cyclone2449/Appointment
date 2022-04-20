import "react-native-gesture-handler";

import AppNavigation from "./Navigation/AppNavigation";

import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useState } from "react";
import { CredentialContext } from "./CredentialContext";

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [storedCredential, setStoredCredential] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem("Appointment")
      .then((res) => {
        if (res !== null) {
          setStoredCredential(JSON.parse(res));
        } else {
          setStoredCredential(null);
        }
      })
      .catch((err) => console.log(err));
  };

  if (!appReady) {
    return (
      <AppLoading
        startAsync={checkLoginCredentials}
        onFinish={() => setAppReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <CredentialContext.Provider
      value={{ storedCredential, setStoredCredential }}
    >
      <AppNavigation />
    </CredentialContext.Provider>
  );
}
