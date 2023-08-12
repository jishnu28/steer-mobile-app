import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface DetailInfoCardProps {
  item: any;
}

function DetailInfoCard({ item }: DetailInfoCardProps) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.container}>
        <View style={styles.priceLabel}>
          <Text style={styles.priceText}>{item.price} / night</Text>
        </View>

        <TouchableOpacity
          onPress={() => console.log("Implementation for booking coming soon!")}
        >
          <View style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

export default DetailInfoCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
  },

  infoCard: {
    paddingTop: 10,
  },

  title: {
    textAlign: "left",
    fontFamily: "Bitter-Bold",
    fontSize: 30,
  },

  priceLabel: {
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  priceText: {
    textAlign: "left",
    fontFamily: "Bitter-Medium",
    fontSize: 20,
  },

  bookButton: {
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 10,
  },

  bookButtonText: {
    textAlign: "left",
    fontFamily: "Bitter-Medium",
    fontSize: 20,
  },

  description: {
    textAlign: "left",
    fontFamily: "Bitter-Regular",
    fontSize: 20,
  },
});
