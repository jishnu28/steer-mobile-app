import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NativeBaseProvider, Text, Image } from "native-base";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";

const auth = firebaseAuth;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export type RootStackParamList = {
  Home: undefined;
};

export type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type HomeProps = {
  navigation: NativeStackNavigationProp<any>;
};

const Home = ({ navigation }: HomeProps) => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error: { message: any }) => alert(error.message));
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <Text>This is our awesome Home screen for now.</Text>
        <Text>Tap on one of the icons in the navbar to open a page.</Text>
        <Image
          paddingY={10}
          alt="random image"
          source={{
            width: 200,
            height: 300,
            uri: "https://picsum.photos/200/300",
          }}
        />
        <ExpoStatusBar style="auto" />
        <Text>Current user: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "beige",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    fontFamily: "Bitter-Regular",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontFamily: "Bitter-Regular",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Home;
