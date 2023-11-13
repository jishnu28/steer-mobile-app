import React from "react";
import { Avatar } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import BodyText from "../../../custom_components/typography/BodyText";
import COLORS from "../../../config/COLORS";
import SPACING from "../../../config/SPACINGS";

interface ReviewCardProps {
  avatarUri: string;
  text: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ avatarUri, text }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        <Avatar source={{ uri: avatarUri }} rounded size={44} />
      </View>
      <View style={styles.textContainer}>
        <BodyText>{text}</BodyText>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.LIGHTACCENT,
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.MD,
    marginVertical: SPACING.XS,
    borderRadius: SPACING.LG,
    flexDirection: "row",
    width: "100%",
  },
  avatarContainer: {
    width: "20%",
  },
  textContainer: {
    width: "80%",
  },
});
