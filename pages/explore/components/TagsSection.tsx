import { View, StyleSheet } from "react-native";
import SPACINGS from "../../../config/SPACINGS";
import BodyText from "../../../custom_components/typography/BodyText";
import COLORS from "../../../config/COLORS";
import H2 from "../../../custom_components/typography/H2";

interface TagsSectionProps {
  heading?: string;
  tags: string[];
}

const TagsSection: React.FC<TagsSectionProps> = ({ heading, tags }) => {
  const noTags = tags.length === 0;
  return (
    <View style={styles.mainContainer}>
      {heading && <H2>{heading}</H2>}
      {!heading && <H2>Tags</H2>}
      <View style={styles.innerContainer}>
        {tags.map((tag) => (
          <View key={tag} style={styles.badgeStyle}>
            <BodyText>{tag}</BodyText>
          </View>
        ))}
        {noTags && <H2 style={{ marginLeft: SPACINGS.SM }}>-</H2>}
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
