import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";

// Type declarations for the fields in the accommodations collection
interface ExperienceData {
  isActive: boolean;
  owner: string; // use id to link to post owner's profile
  title: string;
  description: string;
  images: string[]; // these are download URLs obtained from cloud storage
  price: number; // assumed price per person
  address: string; // replace with location coordinates so that potentially a map can be embedded in the future
  experienceTags: string[]; // for use in search and itinerary generation
  postingDate: Timestamp;
  // TODO: @Ryan, for your reviews feature, add in the 'reviews' collection as a subcollection here
}

export default async function createExperience() {
  // TODO: @Jishnu, add image saving process, and pass in the download URLs to the image field below

  // TODO: @Celeste, Replace these test values with user input from an upload page, passed in as props
  const data: ExperienceData = {
    isActive: true,
    owner: "testOwner - this should be replaced with the user's UID",
    title: "Terrific testing tricycling",
    description: "This is a terrific testing tricycling experience",
    images: [],
    price: 1,
    address: "456 Testing Avenue",
    experienceTags: ["testing", "terrific", "tricycling"],
    postingDate: Timestamp.fromDate(new Date()),
  };

  try {
    const docRef = await addDoc(collection(firestore, "experiences"), data);
    console.log(
      "Document written in experiences collection with ID: ",
      docRef.id
    );
  } catch (error) {
    console.error(
      "Error creating new document in experiences collection:",
      error
    );
    // Handle error or show error message to the user
  }
}
