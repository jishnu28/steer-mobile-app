import React from "react";
import { NativeBaseProvider } from "native-base";
import {StyleSheet, Text, Image, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


type RootStackParamList = {
    Profile: undefined;
    Edit: undefined;
    EditName: undefined;
    EditEmail: undefined;
};

type editProfileScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Edit"
>;

type Props = {
    navigation: editProfileScreenNavigationProp;
};

const EditProfile = ({ navigation }: Props) => {

    const [image, setImage]= React.useState("");
    
    return (
    <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={{position:'absolute', top:'15%', left:'15%'}}
                onPress={()=>navigation.navigate('Profile')}>
                <AntDesign name="leftcircle" size={40} color='#88838A' />
            </TouchableOpacity>

            <View style={{position:'absolute', top:'22%'}}>
                {image=='' && <FontAwesome name="user-circle" size={120} color="#88838A"/>}
                {image!='' && <Image source={{uri: image}} style={styles.profile_pic}/>}
            </View>

            <View style={styles.info_section}>
                <TouchableOpacity 
                    style={styles.info_box}
                    onPress={()=>navigation.navigate("EditName")}>
                    <Text style={{position:'absolute', left:'5%', fontSize:18, color:'#88838A' ,fontWeight: 'bold'}}>Name:</Text>
                    <Text style={{position:'absolute', left:'40%', fontSize:18, color:'#88838A'}}>User 1</Text>
                    <AntDesign name="right" size={20} color='#88838A' style={{position:'absolute', left:'100%'}}/>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.info_box}
                    onPress={()=>navigation.navigate("EditEmail")}>
                    <Text style={{position:'absolute', left:'5%', fontSize:18, color:'#88838A' ,fontWeight: 'bold'}}>Email:</Text>
                    <Text 
                        style={{position:'absolute', left:'40%', fontSize:18, color:'#88838A', width:'60%'}}
                        numberOfLines={2}
                    >test@gmail.com</Text>
                    <AntDesign name="right" size={20} color='#88838A' style={{position:'absolute', left:'100%'}}/>
                </TouchableOpacity>
            </View>
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

    profile_pic : {
        width: 120, 
        height: 120, 
        borderRadius: 60, 
        borderWidth:2, 
        borderColor: '#88838A',
        margin: 10,
    },

    info_section: {
        width: '100%',
        position:'absolute', 
        top:'45%', 
        alignItems:'center',
    },

    info_box: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:20,
        width:'75%', 
        height:42, 
        borderWidth:1, 
        borderRadius:20,
        marginVertical: 4,
        backgroundColor:'#E5E8D9',
        borderColor:'#E5E8D9',
    },
});

export default EditProfile;
