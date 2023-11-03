import { View, StyleSheet } from "react-native";
import COLORS from "../../../config/COLORS";
import SPACINGS from "../../../config/SPACINGS";
import BodyText from "../../../custom_components/typography/BodyText";
import H1 from "../../../custom_components/typography/H1";

interface DescriptionSectionProps {
  title: string;
  address: string;
  price: number;
  description: string;
}

const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  title,
  address,
  price,
  description,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <H1>{title}</H1>
          <BodyText>{address}</BodyText>
        </View>
        <View style={styles.pricecontainer}>
          <BodyText>
            <BodyText>$</BodyText>
            <H1>{price}</H1>
            <BodyText>/night</BodyText>
          </BodyText>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <BodyText>{description}</BodyText>
      </View>
    </View>
  );
};

export default DescriptionSection;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: SPACINGS.MD,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: SPACINGS.SM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.DARKACCENT,
  },
  titleContainer: {
    width: "80%",
  },
  pricecontainer: {
    width: "20%",
    alignItems: "center",
  },
  descriptionContainer: {
    paddingVertical: SPACINGS.SM,
  },
});
