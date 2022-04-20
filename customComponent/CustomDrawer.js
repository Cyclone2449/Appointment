import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import SignOut from "../screens/SignOut/SignOut";

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#3B71F3" }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          height: "100%",
          width: "100%",
        }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            paddingTop: 10,
            marginTop: -5,
            paddingBottom: 10,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: 20,
          backgroundColor: "#fff",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        <SignOut />
      </View>
    </View>
  );
};

export default CustomDrawer;
