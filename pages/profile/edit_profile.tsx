import React from "react";
import { NativeBaseProvider } from "native-base";
import {
  StyleSheet,
  Text,
  Image,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebaseAuth } from "../../firebaseConfig";

const auth = firebaseAuth;

type RootStackParamList = {
  Profile: undefined;
  Edit: undefined;
  EditName: undefined;
  EditEmail: undefined;
};

type editProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Edit"
>;

type Props = {
  navigation: editProfileScreenNavigationProp;
};

const EditProfile = ({ navigation }: Props) => {
  const [image, setImage] = React.useState("");

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={{ position: "absolute", top: "15%", left: "15%" }}
          onPress={() => navigation.navigate("Profile")}
        >
          <MaterialCommunityIcons
            name="arrow-left-circle"
            size={40}
            color="#88838A"
          />
        </TouchableOpacity>

        <View style={{ position: "absolute", top: "22%" }}>
          {image == "" && (
            <MaterialCommunityIcons
              name="account-circle"
              size={140}
              color="#88838A"
            />
          )}
          {image != "" && (
            <Image source={{ uri: image }} style={styles.profilePic} />
          )}
        </View>

        <View style={styles.infoSection}>
          <TouchableOpacity
            style={styles.infoBox}
            onPress={() => navigation.navigate("EditName")}
          >
            <Text
              style={{
                position: "absolute",
                left: "5%",
                fontSize: 18,
                color: "#88838A",
                fontWeight: "bold",
              }}
            >
              Name:
            </Text>
            <Text
              style={{
                position: "absolute",
                left: "40%",
                fontSize: 18,
                color: "#88838A",
              }}
            >
              User 1
            </Text>
            <MaterialCommunityIcons
              name="arrow-right-drop-circle"
              size={25}
              color="#88838A"
              style={{ position: "absolute", left: "100%" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.infoBox}
            onPress={() => navigation.navigate("EditEmail")}
          >
            <Text
              style={{
                position: "absolute",
                left: "5%",
                fontSize: 18,
                color: "#88838A",
                fontWeight: "bold",
              }}
            >
              Email:
            </Text>
            <Text
              style={{
                position: "absolute",
                left: "40%",
                fontSize: 18,
                color: "#88838A",
                width: "60%",
              }}
              numberOfLines={2}
            >
              {auth.currentUser?.email}
            </Text>
            <MaterialCommunityIcons
              name="arrow-right-drop-circle"
              size={25}
              color="#88838A"
              style={{ position: "absolute", left: "100%" }}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAF0",
    alignItems: "center",
  },

  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#88838A",
    margin: 10,
  },

  infoSection: {
    width: "100%",
    position: "absolute",
    top: "45%",
    alignItems: "center",
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    width: "75%",
    height: 42,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 4,
    backgroundColor: "#E5E8D9",
    borderColor: "#E5E8D9",
  },
});

export default EditProfile;
