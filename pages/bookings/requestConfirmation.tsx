import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";
import COLORS from "../../config/COLORS";
import H1 from "../../custom_components/typography/H1";
import SPACINGS from "../../config/SPACINGS";
import BodyText from "../../custom_components/typography/BodyText";

const RequestConfirmation = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.LIGHTBG,
        justifyContent: "center",
      }}
    >
      <View style={styles.mainContainer}>
        <H1 style={{ textAlign: "center" }}>
          Your request has been submitted!
        </H1>
        <Icon
          color={COLORS.PRIMARY}
          type="material-community"
          name="check-circle"
          size={70}
          style={{ margin: SPACINGS.LG }}
        />
        <BodyText style={{ textAlign: "center" }}>
          The owner/operator will be in touch to confirm your booking soon.
        </BodyText>
      </View>
    </SafeAreaView>
  );
};

export default RequestConfirmation;

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
});
