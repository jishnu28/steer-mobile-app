import React from "react";
import { NativeBaseProvider } from "native-base";
import Modal from "react-native-modal";
import {StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TouristsNavbar from "../../custom_components/TouristsNavbar";
import PostsTabView from "./posts";
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebaseAuth, firestore } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { TextInput } from "react-native-gesture-handler";

type RootStackParamList = {
    Profile: undefined;
    Edit: undefined;
};

type profilePageScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Profile"
>;

type Props = {
    navigation: profilePageScreenNavigationProp;
};

const ProfilePage = ({ navigation }: Props) => {

    //Used for user info retrieval
    const [user, loading, error]= useAuthState(firebaseAuth);
    const [profileInfo, setProfileInfo]= React.useState({});

    //Used to set user info
    const [username, setUsername]= React.useState('');
    const [email, setEmail]= React.useState('');
    const [usernameModal, setUsernameModal]= React.useState(false);
    const [emailModal, setEmailModal]= React.useState(false);

    //Code for profile pic upload
    const [image, setImage]= React.useState("");
    const checkForCameraRollPermission= async()=>{
        const {status} = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status!='granted'){
            alert("Please enable camera roll permissions inside your system's settings");
        } else {
            console.log("Media Permissions have been granted")
        }
    }


    const getProfile= async () => {
        const profileRef= doc(firestore, "users", user?.uid);
        const userProfile= await getDoc(profileRef);
        console.log(userProfile.data())
        setProfileInfo(userProfile.data());
    }

    const saveProfilePic= async () => {
        const docRef= doc(firestore, "users", user.uid)
        await updateDoc(docRef, {
            profilePic: image,
        }); 
    }

    const saveUsername= async () => {
        const docRef= doc(firestore, "users", user.uid)
        await updateDoc(docRef, {
            displayName: username,
        }); 
    }

    const saveEmail= async () => {
        const docRef= doc(firestore, "users", user.uid)
        await updateDoc(docRef, {
            email: email,
        }); 
    }

    React.useEffect(() => {
        //Prevent empty uri being uploaded when page first renders
        if (image!=""){
            saveProfilePic()
        }
        getProfile()
    }, [image]);

    // React.useEffect(() => {
    //     getProfile()
    // }, [[], profileInfo]);
    

    React.useEffect(() => {
        checkForCameraRollPermission()
    }, []);

    const addImage= async () => {
        let _image= await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, //determines the type of file used: Image, video or both
            allowsEditing: true, //provides an editing interface to crop/edit image after it is selected from photo library
            aspect: [1,1], //speciifies the fixed aspect ratio for your cropped image
            quality: 1, //controls quality of the selected image, value between 0 to 1, which 1 denoting highest quality
        });
        if (!_image.cancelled) {  //checks that the user doesn't close photo library before selecting an image
            setImage(_image.uri);
        }
    }

    return (
    <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
            {/* Profile Info */}
            <View style={[styles.profile, {flex: 2}]}>
                {/* Profile Pic */}
                <View>
                    {profileInfo['profilePic']=='' && <MaterialCommunityIcons name="account-circle" size={140} color="#88838A"/>}
                    {profileInfo['profilePic']!='' && <Image source={{uri: profileInfo['profilePic']}} style={styles.profilePic}/>}
                    <TouchableOpacity 
                        onPress= {addImage}
                        style={styles.editProfilePic}>
                        <MaterialCommunityIcons name="plus-circle" size={36} color="#FFAF87"/>
                    </TouchableOpacity>
                </View>
                {/* Profile Info */}
                <View style={{marginLeft:15}}>
                    <View style= {styles.button}>
                        <Text style={styles.profileText} numberOfLines={2}>{profileInfo["displayName"]}</Text>
                        <TouchableOpacity
                            onPress={()=>setUsernameModal(!usernameModal)}
                        >
                            <MaterialCommunityIcons name="pencil" size={20} color="#88838A"/>
                        </TouchableOpacity>
                    </View>
                    <View style= {styles.button}>
                        <Text style={styles.profileText} numberOfLines={2}>{profileInfo["email"]}</Text>
                        <TouchableOpacity
                            onPress={()=>setEmailModal(!emailModal)}
                        >
                            <MaterialCommunityIcons name="pencil" size={20} color="#88838A"/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Modals */}
            <Modal 
                isVisible={usernameModal} 
                coverScreen= {false}
                backdropOpacity= {0.4}
                style= {{justifyContent:'center', alignItems:'center'}}
                >
                <View style={styles.modalPopUp}>
                    <Text style={styles.modalText}>Enter your new username below:</Text>
                    <TextInput
                        style={styles.infoBox}
                        value={username}
                        onChangeText={newUsername => setUsername(newUsername)}
                    />
                    <View style={styles.modalButtonSection}>
                        <TouchableOpacity
                            onPress={()=>{
                                setUsername('')
                                setUsernameModal(!usernameModal)
                            }}
                            style={styles.modalButton}
                        >
                            <Text>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                saveUsername()
                                setUsername('')
                                setUsernameModal(!usernameModal)
                            }}
                            style={styles.modalButton}
                        >
                            <Text>Confirm</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>

            <Modal 
                isVisible={emailModal} 
                coverScreen= {false}
                backdropOpacity= {0.4}
                style= {{justifyContent:'center', alignItems:'center'}}
                >
                <View style={styles.modalPopUp}>
                    <Text style={styles.modalText}>Enter your new email below:</Text>
                    <TextInput
                        style={styles.infoBox}
                        value={email}
                        onChangeText={newEmail => setEmail(newEmail)}
                    />
                    <View style={styles.modalButtonSection}>
                        <TouchableOpacity
                            onPress={()=>{
                                setEmail('')
                                setEmailModal(!emailModal)
                            }}
                            style={styles.modalButton}
                        >
                            <Text>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>{
                                saveEmail()
                                setEmail('')
                                setEmailModal(!emailModal)
                            }}
                            style={styles.modalButton}
                        >
                            <Text>Confirm</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
            
            {/* Posts */}
            <View style={[styles.posts, {flex: 5}]}>
                <PostsTabView/>
            </View>
            <TouristsNavbar navigation={navigation} currentIndex={3} />
        </SafeAreaView>
    </NativeBaseProvider>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E8D9',
        alignItems: "center",
        justifyContent: "center",
    },

    profile: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    profilePic : {
        width: 120, 
        height: 120, 
        borderRadius: 60, 
        borderWidth:2, 
        borderColor: '#88838A',
    },

    editProfilePic: {
        position:'absolute', 
        left:'80%', 
        bottom:'0%'
    },

    profileText: {
        // fontFamily: 'Bitter',
        fontSize: 16,
        fontWeight: '600',
        color: '#88838A',
        maxWidth: '80%',
        marginVertical: 1,
        marginHorizontal: 5,
    },

    button: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center", 
        borderRadius: 20,
        marginVertical:3,
        width: 200,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F8FAF0',
    },

    posts: {
        backgroundColor: '#F8FAF0',
        width: '100%',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },

    modalPopUp: {
        justifyContent: "space-around",
        alignItems: 'center',
        width: '90%',
        height: 160,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#E5E8D9'
    },

    modalText: {
        fontSize: 17
    },

    infoBox: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },

    modalButtonSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '80%',
    },

    modalButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 80,
        marginHorizontal: 5,
        borderWidth: 1,
        borderRadius: 40,
    }
});

export default ProfilePage;
