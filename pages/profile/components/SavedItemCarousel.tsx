import React, { useEffect } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import HeartButton from "../../explore/components/HeartButton";
import ImageCarousel from "../../explore/components/ImageCarousel";
import { getDoc, collection, DocumentData, doc } from "firebase/firestore";
import { firestore, firebaseAuth } from "../../../firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuthState } from "react-firebase-hooks/auth";

interface SavedItemCarouselProps {
  // activeCategory: number;
  collectionName: string;
  // navigation: NativeStackNavigationProp<any>;
}

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const cardWidth: number = width * 0.8;
const cardHeight: number = height * 0.54;

function SavedItemCarousel({
  // activeCategory,
  // navigation,
  collectionName,
}: SavedItemCarouselProps) {
  const [dbItems, setDbItems] = React.useState<DocumentData[]>([]);
  const [user, loading, error]= useAuthState(firebaseAuth);

  useEffect(() => {
    async function fetchData() {
      const currItems: DocumentData[] = [];
      // console.log("user?.uid", user?.uid);
      try {
        const docSnapshot = await getDoc(doc(firestore, collectionName, user?.uid as any));
        const savedData = docSnapshot.get("posts");
        // console.log("Saved Data", savedData);
        savedData.forEach((item: any) => {
          // console.log("item", item);
          currItems.push(item);
        })
        setDbItems(currItems);
      } catch (error) {
        console.log("Error getting document:", error);
      }
    }

    fetchData();
  }, []);

  if (dbItems.length != 0) {
    return (
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        snapToInterval={height * 0.55}
        decelerationRate="fast"
        pagingEnabled
        style={{ marginVertical: 10 }}
      >
        {dbItems.map((item, index) => (
          <View key={index}>
            {/* <View style={styles.heartButtonContainer}>
              <HeartButton />
            </View> */}

            <View style={styles.card}>
              <View style={styles.descriptionBackground}>
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
              </View>
              <ImageCarousel
                width={cardWidth}
                height={cardHeight}
                imagesToShow={item.images ?? []}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    );
  } else {
    return (
      <View
        style={[
          styles.card,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <MaterialCommunityIcons
          name="emoticon-dead-outline"
          size={cardWidth * 0.8}
          color="#88838A"
        />
        <Text style={styles.title}>No Items Saved</Text>
      </View>
    );
  }
}

export default SavedItemCarousel;

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
