import React from "react";
import { NativeBaseProvider } from "native-base";
import {StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons} from "@expo/vector-icons";
import { firebaseAuth, firestore } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, updateDoc } from "firebase/firestore";

type RootStackParamList = {
    Edit: undefined;
    EditName: undefined;
};

type editNameScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "EditName"
>;

type Props = {
    navigation: editNameScreenNavigationProp;
};

const EditName = ({ navigation }: Props) => {

    const [user, loading, error]= useAuthState(firebaseAuth);
    const [name, setName]= React.useState("");
    
    return (
    <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('Edit')}>
                    <MaterialCommunityIcons name="arrow-left-circle" size={40} color='#88838A'/>
                </TouchableOpacity>

                <Text style={styles.headerText}>Name</Text>

                <TouchableOpacity
                    onPress={async()=> {
                        const docRef= doc(firestore, "users", user.uid)
                        await updateDoc(docRef, {
                            displayName: name
                            }
                        ); 
            
                        navigation.navigate('Edit')}}
                    style={styles.doneButton}>
                    <Text style={styles.headerText}>Done</Text>
                </TouchableOpacity>
            </View>
            <TextInput 
                style={styles.infoBox}
                placeholder='Name'
                value={name}
                onChangeText={newName => setName(newName)}
            />
        </SafeAreaView>
    </NativeBaseProvider>
);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAF0',
        alignItems: "center",
    },

    header: {
        width:"80%", 
        flexDirection: 'row', 
        justifyContent:"space-between", 
        alignItems:'center', 
        position:'absolute', 
        top:'15%', 
        left:'10%'
    },

    headerText: {
        fontSize:18, 
        color:'#88838A',
        fontWeight: 'bold'
    },

    doneButton:{
        justifyContent:'center',
        alignItems:'center',
        padding: 5,
        borderRadius:6,
        backgroundColor:'#E5E8D9',
    },

    infoBox: {
        position:'absolute',
        top:'25%',
        paddingHorizontal:20,
        width:'75%', 
        height:42, 
        borderRadius:20,
        marginVertical: 4,
        backgroundColor:'#E5E8D9',
    },
});

export default EditName;
