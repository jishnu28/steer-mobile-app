import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseAuth, firestore } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

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

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Registered with:", user.email);

      await setDoc(doc(firestore, "userChats", user.uid), 
        {
          myName: "Some name",
          chats: []
        }
      );
      await setDoc(doc(firestore, "users", user.uid), 
        {
          displayName: "Some name",
          email: user.email,
          uid: user.uid,
          profilePic: "",
        }
      );

    } catch (error: any) {
      const errorMessage = error.message;
      alert(errorMessage);
    }


  };

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
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAF0",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#E5E8D9",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#FFAF87",
    width: "100%",
    padding: 15,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "#F8FAF0",
    marginTop: 5,
    borderColor: "#FFAF87",
    borderWidth: 2,
    borderRadius: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  buttonOutlineText: {
    color: "#FFAF87",
    fontWeight: "700",
    fontSize: 18,
  },
});
