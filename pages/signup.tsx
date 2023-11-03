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
} from "firebase/auth";
import { firebaseAuth, firestore } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

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

      await setDoc(doc(firestore, "userChats", user.uid), 
        {
          myName: username,
          chats: []
        }
      );
      await setDoc(doc(firestore, "users", user.uid), 
        {
          displayName: username,
          email: user.email,
          uid: user.uid,
          profilePic: "",
          favouritedPosts: [],
        }
      );
      await setDoc(doc(firestore, "savedPosts", user.uid), 
        {
          posts: []
        }
    );

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
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text style={styles.redirectText}> Have an account? Login here </Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

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
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
  redirectText: {
    color: "#FFAF87",
    fontWeight: "700",
    fontSize: 18,
    padding: 10, 
  },
});
