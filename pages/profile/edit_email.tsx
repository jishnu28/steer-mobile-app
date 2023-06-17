import React from "react";
import { NativeBaseProvider } from "native-base";
import {StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialCommunityIcons} from "@expo/vector-icons";

type RootStackParamList = {
    Edit: undefined;
    EditEmail: undefined;
};

type editEmailScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "EditEmail"
>;

type Props = {
    navigation: editEmailScreenNavigationProp;
};

const EditEmail = ({ navigation }: Props) => {

    const [email, setEmail]= React.useState("");
    
    return (
    <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('Edit')}>
                    <MaterialCommunityIcons name="arrow-left-circle" size={40} color='#88838A'/>
                </TouchableOpacity>

                <Text style={styles.headerText}>Email</Text>

                <TouchableOpacity
                    onPress={()=>navigation.navigate('Edit')}
                    style={styles.doneButton}>
                    <Text style={styles.headerText}>Done</Text>
                </TouchableOpacity>
            </View>
            <TextInput 
                style={styles.infoBox}
                placeholder='Email'
                value={email}
                onChangeText={newEmail => setEmail(newEmail)}
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

export default EditEmail;
