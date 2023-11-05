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
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestore } from "../firebaseConfig";
import COLORS from "../config/COLORS";
import SPACINGS from "../config/SPACINGS";
import H3 from "../custom_components/typography/H3";
import FONTSIZES from "../config/FONTSIZES";

interface LoginProps {
  navigation: NativeStackNavigationProp<any>;
}

const auth = firebaseAuth;

const { width, height } = Dimensions.get("screen");

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
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
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <H3 style={styles.buttonText}>Login</H3>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <H3 style={styles.redirectText}>No account? Sign up here</H3>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

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
