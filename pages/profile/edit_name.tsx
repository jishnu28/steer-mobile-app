import React from "react";
import { NativeBaseProvider } from "native-base";
import {StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AntDesign } from '@expo/vector-icons'; 


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

    const [name, setName]= React.useState("");
    
    return (
    <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={()=>navigation.navigate('Edit')}>
                    <AntDesign name="leftcircle" size={40} color='#88838A' />
                </TouchableOpacity>

                <Text style={styles.header_text}>Name</Text>

                <TouchableOpacity
                    onPress={()=>navigation.navigate('Edit')}
                    style={styles.done_button}>
                    <Text style={styles.header_text}>Done</Text>
                </TouchableOpacity>
            </View>
            <TextInput 
                style={styles.info_box}
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

    header_text: {
        fontSize:18, 
        color:'#88838A',
        fontWeight: 'bold'
    },

    done_button:{
        justifyContent:'center',
        alignItems:'center',
        padding: 5,
        borderRadius:6,
        backgroundColor:'#E5E8D9',
    },

    info_box: {
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
