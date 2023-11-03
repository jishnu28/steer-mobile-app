import { View, StyleSheet } from "react-native";
import SPACINGS from "../../../config/SPACINGS";
import BodyText from "../../../custom_components/typography/BodyText";
import COLORS from "../../../config/COLORS";

interface TagsSectionProps {
  accommodationTags: string[];
}

const TagsSection: React.FC<TagsSectionProps> = ({ accommodationTags }) => {
  return (
    <View style={styles.mainContainer}>
      {accommodationTags.map((tag) => (
        <View key={tag} style={styles.badgeStyle}>
          <BodyText>{tag}</BodyText>
        </View>
      ))}
    </View>
  );
};

export default TagsSection;

const styles = StyleSheet.create({
  mainContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    padding: SPACINGS.MD,
  },
  badgeStyle: {
    marginRight: SPACINGS.MD,
    marginBottom: SPACINGS.SM,
    paddingVertical: SPACINGS.XS,
    paddingHorizontal: SPACINGS.SM,
    borderWidth: 1,
    borderColor: COLORS.DARKBG,
    borderRadius: SPACINGS.SM,
  },
});
