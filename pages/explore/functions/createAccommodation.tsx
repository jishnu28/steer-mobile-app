import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";

// Type declarations for the fields in the accommodations collection
export interface AccommodationData {
  isActive: boolean;
  owner: string;
  title: string;
  description: string;
  images: string[]; // image URLs are fetched from cloud storage and stored as strings here
  numGuests: number;
  numBeds: number;
  numBaths: number;
  numBedrooms: number;
  price: number;
  address: string;
  hasWifi: boolean;
  hasKitchen: boolean;
  hasHeating: boolean;
  hasWaterheater: boolean;
  accommodationTags: string[]; // for use in search and itinerary generation
  postingDate: Timestamp;
  // TODO: Add in the 'reviews' collection as a subcollection here
}

export default async function createAccommodation(newData: AccommodationData) {
  const sampleData: AccommodationData = {
    isActive: true,
    owner: "testOwner - this should be replaced with the user's UID",
    title: "Tiny testing tent",
    description: "This is a tiny testing tent",
    images: [],
    numGuests: 1,
    numBeds: 1,
    numBaths: 1,
    numBedrooms: 1,
    price: 1,
    address: "123 Testing Street",
    hasWifi: true,
    hasKitchen: true,
    hasHeating: true,
    hasWaterheater: true,
    accommodationTags: ["testing", "tiny", "tent"],
    postingDate: Timestamp.fromDate(new Date()),
  };

  try {
    const docRef = await addDoc(
      collection(firestore, "accommodations"),
      newData
    );
  } catch (error) {
    console.error(
      "Error creating new document in accommodations collection:",
      error
    );
    // TODO: Handle error or show error message to the user
  }
}
