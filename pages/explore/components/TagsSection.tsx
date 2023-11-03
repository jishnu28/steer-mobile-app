import { View, StyleSheet } from "react-native";
import SPACINGS from "../../../config/SPACINGS";
import BodyText from "../../../custom_components/typography/BodyText";
import COLORS from "../../../config/COLORS";
import H2 from "../../../custom_components/typography/H2";

interface TagsSectionProps {
  accommodationTags: string[];
}

const TagsSection: React.FC<TagsSectionProps> = ({ accommodationTags }) => {
  return (
    <View style={styles.mainContainer}>
      <H2>Tags</H2>
      <View style={styles.innerContainer}>
        {accommodationTags.map((tag) => (
          <View key={tag} style={styles.badgeStyle}>
            <BodyText>{tag}</BodyText>
          </View>
        ))}
      </View>
    </View>
  );
};

export default TagsSection;

const styles = StyleSheet.create({
  mainContainer: {
    padding: SPACINGS.MD,
  },
  innerContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: SPACINGS.SM,
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
