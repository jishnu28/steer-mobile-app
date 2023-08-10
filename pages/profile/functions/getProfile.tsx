// import { doc, getDoc } from "firebase/firestore";
// import { firestore } from "../../../firebaseConfig";

// type getProfileProps= {
//     document: string;
//     setProfile(newInfo: any): any;
// }

// export default async function getProfile({
//     document,
//     setProfile,
// }: getProfileProps) {
    
//     try {
//         const profileRef= doc(firestore, "users", document);
//         const userProfile= await getDoc(profileRef);
//         // console.log(userProfile.data())
//         setProfile(userProfile.data());
//     } catch (error) {
//         console.error(
//             "Error retrieving profile from database:",
//             error
//         );
//     }
// }