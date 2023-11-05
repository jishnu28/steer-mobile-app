import { StyleSheet, View } from "react-native";
import { Avatar, Icon } from "@rneui/themed";
import React from "react";
import ICONSIZES from "../../../config/ICONSIZES";
import COLORS from "../../../config/COLORS";
import SPACINGS from "../../../config/SPACINGS";
import H3 from "../../../custom_components/typography/H3";
import FONTSIZES from "../../../config/FONTSIZES";
import H2 from "../../../custom_components/typography/H2";

//TODO: Fetch host info from database

const HostSection = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <H2>Host</H2>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.avatarContainer}>
          <Avatar
            rounded
            source={{ uri: "https://picsum.photos/200/200" }}
            size={64}
          />
        </View>
        <View style={styles.textContainer}>
          <H3 style={{ fontSize: FONTSIZES.XL }}>HostName</H3>
          <View style={styles.ratingContainer}>
            <H3>4.8</H3>
            <Icon
              color={COLORS.PRIMARY}
              type="material-community"
              name="star"
              size={ICONSIZES.MD}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HostSection;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    justifyContent: "center",
    padding: SPACINGS.MD,
  },
  headerContainer: {
    width: "100%",
    marginBottom: SPACINGS.SM,
  },
  innerContainer: {
    backgroundColor: COLORS.LIGHTACCENT,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingVertical: SPACINGS.SM,
    borderRadius: SPACINGS.LG,
  },
  avatarContainer: {
    width: "30%",
    justifyContent: "center",
    padding: SPACINGS.MD,
  },
  textContainer: {
    width: "70%",
    justifyContent: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACINGS.XS,
  },
});
