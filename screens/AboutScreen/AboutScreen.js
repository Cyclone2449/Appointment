import { Text, SafeAreaView } from "react-native";
import React from "react";
import styles from "../../utility/style";

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.HomeContainer}>
      <Text style={styles.screen_header}> AboutScreen</Text>
    </SafeAreaView>
  );
};

export default AboutScreen;
