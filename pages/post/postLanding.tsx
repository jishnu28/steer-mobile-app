import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "@rneui/themed";
import COLORS from "../../config/COLORS";
import H1 from "../../custom_components/typography/H1";
import H3 from "../../custom_components/typography/H3";
import SPACINGS from "../../config/SPACINGS";

const { width } = Dimensions.get("window");

interface PostLandingProps {
  navigation: NativeStackNavigationProp<any>;
}

const PostLanding = ({ navigation }: PostLandingProps) => {
  const [isAccommodationsSelected, setIsAccommodationsSelected] =
    useState(false);
  const [isExperiencesSelected, setIsExperiencesSelected] = useState(false);

  const handlePress = (buttonTitle: string) => {
    if (buttonTitle === "Accommodations") {
      setIsAccommodationsSelected(true);
      navigation.navigate("postAccommodation", { navigation: navigation });
    } else {
      setIsExperiencesSelected(true);
      navigation.navigate("postExperience", { navigation: navigation });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F8FAF0",
        justifyContent: "center",
      }}
    >
      <View style={styles.mainContainer}>
        <H1 style={{ color: COLORS.DARKBG }}>I'm posting an...</H1>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => handlePress("Accommodations")}
            style={[
              styles.button,
              isAccommodationsSelected && styles.selectedButton,
            ]}
          >
            <Icon
              color={COLORS.DARKACCENT}
              type="material-community"
              name="home-group"
              size={70}
            />
            <H3 style={{ color: COLORS.DARKBG, width: "80%" }}>
              Accommodation
            </H3>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handlePress("Experiences")}
            style={[
              styles.button,
              isExperiencesSelected && styles.selectedButton,
            ]}
          >
            <Icon
              color={COLORS.DARKACCENT}
              type="material-community"
              name="forest"
              size={70}
            />
            <H3 style={{ color: COLORS.DARKBG }}>Experience</H3>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: SPACINGS.LG,
  },
  button: {
    width: 0.4 * width,
    height: 0.4 * width,
    marginHorizontal: SPACINGS.MD,
    alignItems: "center",
    backgroundColor: "#E5E8D9",
    justifyContent: "center",
    borderRadius: 20,
  },
  selectedButton: {
    backgroundColor: "#E5E8D9",
  },
});

export default PostLanding;
