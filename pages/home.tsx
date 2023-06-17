import React from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, Box } from "native-base";
import TouristsNavbar from "../custom_components/TouristsNavbar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
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
          source={{
            width: 200,
            height: 300,
            uri: "https://picsum.photos/200/300",
          }}
        />
        <StatusBar style="auto" />
        <Text>Current user: {auth.currentUser?.email}</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <TouristsNavbar navigation={navigation} />
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
    fontWeight: "700",
    fontSize: 16,
  },
});

export default Home;
