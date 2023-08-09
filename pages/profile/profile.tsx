import React from "react";
import { NativeBaseProvider } from "native-base";
import {StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TouristsNavbar from "../../custom_components/TouristsNavbar";
import PostsTabView from "./posts";
import SavedItemCarousel from "./components/SavedItemCarousel";
import PopupModal from "./components/PopupModal";
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebaseAuth, firestore } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

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
    userProfile: {};
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

    //Retrieves profile info when page first rendered
    const getProfile= async () => {
        const profileRef= doc(firestore, "users", user?.uid);
        const userProfile= await getDoc(profileRef);
        console.log(userProfile.data())
        setProfileInfo(userProfile.data());
    }

    React.useEffect(() => {
        getProfile()
    }, []); 

    //Code for profile picture upload
    const [image, setImage]= React.useState("");
    const checkForCameraRollPermission= async()=>{
        const {status} = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status!='granted'){
            alert("Please enable camera roll permissions inside your system's settings");
        } else {
            console.log("Media Permissions have been granted")
        }
    }

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
            saveProfilePic();
        }
    }

    const saveProfilePic= async () => {
        const docRef= doc(firestore, "users", user.uid)
        await updateDoc(docRef, {
            profilePic: image,
        });
        getProfile() 
    }

    //Code for profile info upload
    const saveUsername= async () => {
        const docRef= doc(firestore, "users", user.uid)
        await updateDoc(docRef, {
            displayName: username,
        }); 
        getProfile()
    }

    const saveEmail= async () => {
        const docRef= doc(firestore, "users", user.uid)
        await updateDoc(docRef, {
            email: email,    
        }); 
        getProfile()
    }

    return (
    <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
            {/* Profile Info */}

            <View style={[styles.profile, {flex: 2}]}>
                {/* Profile Pic */}
                <View style={{width:140, height:140, justifyContent:'center', alignItems:'center'}}>
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
            <PopupModal
                inputName="username"
                inputValue={username}
                setInputValue={setUsername}
                saveValue= {saveUsername}
                isModalVisible= {usernameModal}
                setModalVisibility= {setUsernameModal}
            />

            <PopupModal
                inputName="email"
                inputValue={email}
                setInputValue={setEmail}
                saveValue= {saveEmail}
                isModalVisible= {emailModal}
                setModalVisibility= {setEmailModal}
            />
            
            {/* Posts */}
            {/* marginBottom to leave space for the NavBar */}
            <View style={[styles.posts, {flex: 5, marginBottom: 60}]}>  
                <View style={styles.header}>
                    <Text style={[styles.headerText, {width:300, textAlign:'center'}]}>Saved</Text>
                </View>
                    <SavedItemCarousel
                        activeCategory={0}
                        navigation={navigation}
                    />
            </View>
            
            <TouristsNavbar navigation={navigation} currentIndex={3} />

        </SafeAreaView>
    </NativeBaseProvider>
);
};

export default ProfilePage;

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
        width: 130, 
        height: 130, 
        borderRadius: 65, 
        borderWidth:2, 
        borderColor: '#88838A',
    },

    editProfilePic: {
        position:'absolute', 
        left:'75%', 
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

    header: {
        alignItems: 'center',
        paddingTop: 10,
        borderBottomWidth: 0.5,
        borderColor: '#88838A',
    },

    headerText: {
        // fontFamily: 'Bitter',
        fontSize: 16,
        fontWeight: '700',
        color: '#88838A',
    },

    posts: {
        backgroundColor: '#F8FAF0',
        width: '100%',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        justifyContent: 'center',
        alignItems: 'center'
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

