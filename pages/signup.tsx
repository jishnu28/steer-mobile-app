import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestore } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import COLORS from "../config/COLORS";
import SPACINGS from "../config/SPACINGS";
import FONTSIZES from "../config/FONTSIZES";
import H3 from "../custom_components/typography/H3";

interface SignupProps {
  navigation: NativeStackNavigationProp<any>;
}

const auth = firebaseAuth;

const { width, height } = Dimensions.get("screen");

const SignupScreen: React.FC<SignupProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Registered with:", user.email);

      await setDoc(doc(firestore, "userChats", user.uid), {
        myName: username,
        chats: [],
      });
      await setDoc(doc(firestore, "users", user.uid), {
        displayName: username,
        email: user.email,
        uid: user.uid,
        profilePic: "",
        favouritedPosts: [],
      });
      await setDoc(doc(firestore, "savedPosts", user.uid), {
        posts: [],
      });
    } catch (error: any) {
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={-0.5 * height} // to fix keyboard pushing content above in android devices
      behavior="padding"
    >
      <View>
        <Image
          source={require("../assets/images/steer-logo.png")}
          style={{ width: 191, height: 151, marginBottom: 40 }}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button}>
          <H3 style={styles.buttonText}>Sign up</H3>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <H3 style={styles.redirectText}> Have an account? Login here </H3>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.LIGHTBG,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: COLORS.LIGHTACCENT,
    paddingHorizontal: SPACINGS.LG,
    paddingVertical: SPACINGS.MD,
    borderRadius: SPACINGS.LG,
    marginTop: SPACINGS.SM,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACINGS.XL,
  },
  button: {
    backgroundColor: COLORS.PRIMARY,
    width: "100%",
    padding: SPACINGS.LG,
    borderRadius: SPACINGS.LG,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.WHITE,
  },
  redirectText: {
    color: COLORS.PRIMARY,
    fontFamily: "Bitter-Medium",
    fontSize: FONTSIZES.MD,
    marginTop: SPACINGS.SM,
  },
});
