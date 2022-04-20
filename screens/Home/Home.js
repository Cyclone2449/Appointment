import { View, StatusBar, SafeAreaView, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import styles from "../../utility/style";

import DatePicker from "../DatePicker";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.Home}>
      <ScrollView>
        <StatusBar />
        <View style={styles.iconalign}>
          <Icon
            name="menu"
            color={"#3B71F3"}
            size={35}
            onPress={() => navigation.toggleDrawer()}
          />
        </View>

        <View style={styles.HomeContainer}>
          <DatePicker />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
