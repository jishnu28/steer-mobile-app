import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import HeartButton from "./HeartButton";
import ImageCarousel from "./ImageCarousel";
import { getDocs, collection, DocumentData } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import { RefreshControl } from "react-native-gesture-handler";

interface ExploreItemCarouselProps {
  activeCategory: number;
  collectionName: string;
  navigation: NativeStackNavigationProp<any>;
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const cardWidth: number = width * 0.8;
const cardHeight: number = height * 0.6;

// RefreshControl triggers a onRefresh event - executes code to fetch new data from server and add it to the screen
// RefreshControl requires you to handle state of component ie. if refresh is active or not (set to true when fetching data, false once updated)

function ExploreItemCarousel({
  activeCategory,
  navigation,
  collectionName,
}: ExploreItemCarouselProps) {
  const [dbItems, setDbItems] = React.useState<DocumentData[]>([]);
  const [refreshing, setRefreshing] = useState(true);

  async function fetchData() {
    const currItems: DocumentData[] = [];
    const querySnapshot = await getDocs(
      collection(firestore, collectionName)
    );
    querySnapshot.docs.forEach((doc) => {
      currItems.push(doc.data());
    });
    setDbItems(currItems);
    setRefreshing(false)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ marginVertical: 20 }}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={fetchData}/> 
      }
    >
      {dbItems.map((item, index) => (
        <View key={index}>
          <View style={styles.heartButtonContainer}>
            <HeartButton />
          </View>

          <View style={styles.card}>
            <Pressable
              key={index}
              style={styles.descriptionBackground}
              onPress={() =>
                navigation.navigate("Detail", {
                  item: item,
                  navigation: navigation,
                })
              }

              // Uncomment this section to see the Gallery view
              // navigation.navigate("Gallery", {
              //   item: item,
              //   navigation: navigation,
              // })}
            >
              <View style={styles.descriptionContainer}>
                <Text style={styles.title}> {item.title} </Text>
                <Text style={styles.price}>
                  {" "}
                  ${item.price}
                  <Text style={[styles.price, { fontSize: 14 }]}>
                    /night
                  </Text>{" "}
                </Text>
              </View>
            </Pressable>

            <ImageCarousel
              width={cardWidth}
              height={cardHeight}
              imagesToShow={item.images ?? []}
              navigation={navigation}
              item={item}
              page={false}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default ExploreItemCarousel;

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    overflow: "hidden",
    borderRadius: 30,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    fontFamily: "Bitter-Bold",
    fontWeight: "800",
    color: "#343135",
    flexWrap: "wrap",
  },

  price: {
    fontSize: 24,
    fontFamily: "Bitter-Bold",
    fontWeight: "800",
    color: "#FFFFFF",
  },

  descriptionContainer: {
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
    height: 87,
  },

  descriptionBackground: {
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    width: "100%",
    height: 87,
    backgroundColor: "#E5E8D9",
    opacity: 0.8,
  },

  heartButtonContainer: {
    position: "absolute",
    zIndex: 1,
    padding: 10,
    width: "100%",
    justifyContent: "flex-end",
  },
});
