import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

// ------------------- Icons -------------------

import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// --------------------Stack Screens---------------------

import Home from "../screens/Home";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import NewPassword from "../screens/NewPassword";

// -------------------Drawer Screens------------------------

import AboutScreen from "../screens/AboutScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import Appointments from "../screens/Appointments";
import CustomDrawer from "../customComponent/CustomDrawer";
import ConfirmSignUpScreen from "../screens/ConfirmSignUpScreen";

// ---------------------Credential Context---------------------
import { CredentialContext } from "../CredentialContext";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const NavigationWithDrawer = () => {
  return (
    <>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerLabelStyle: { marginLeft: -20 },
          drawerActiveBackgroundColor: "#3B71F3",
          drawerActiveTintColor: "#fff",
          drawerInactiveBackgroundColor: "whitesmoke",
          drawerInactiveTintColor: "black",
        }}
      >
        <Drawer.Screen
          name="HomeScreen"
          component={Home}
          options={{
            drawerIcon: ({ color }) => (
              <Ionicons name="home-outline" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={AboutScreen}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="information-outline"
                size={22}
                color={color}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact-US"
          component={ContactUsScreen}
          options={{
            drawerIcon: ({ color }) => (
              <AntDesign name="contacts" size={22} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Appointments"
          component={Appointments}
          options={{
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons name="history" size={22} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

const AppNavigation = () => {
  return (
    <CredentialContext.Consumer>
      {({ storedCredential }) => (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {storedCredential ? (
              <Stack.Screen name="Home" component={NavigationWithDrawer} />
            ) : (
              <>
                <Stack.Screen name="Signin" component={SignInScreen} />
                <Stack.Screen name="Signup" component={SignUpScreen} />
                <Stack.Screen
                  name="ConfirmEmail"
                  component={ConfirmEmailScreen}
                />
                <Stack.Screen name="Newpassword" component={NewPassword} />
                <Stack.Screen
                  name="ConfirmOtp"
                  component={ConfirmSignUpScreen}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialContext.Consumer>
  );
};

export default AppNavigation;
