import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import COLORS from "../../config/COLORS";
import H1 from "../../custom_components/typography/H1";
import SPACINGS from "../../config/SPACINGS";

interface PostConfirmationProps {
  navigation: NativeStackNavigationProp<any>;
}

const PostConfirmation = ({ navigation }: PostConfirmationProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.LIGHTBG,
        justifyContent: "center",
      }}
    >
      <View style={styles.mainContainer}>
        <H1 style={{ textAlign: "center" }}>Your post has been uploaded!</H1>
        <Icon
          color={COLORS.PRIMARY}
          type="material-community"
          name="check-circle"
          size={70}
          style={{ marginTop: SPACINGS.LG }}
        />
      </View>
    </SafeAreaView>
  );
};

export default PostConfirmation;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
  },
});
