import React, { JSXElementConstructor, ReactElement, ReactNode, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Dimensions, TouchableOpacity, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle, ImageBackground } from 'react-native';
import { TabView, TabBar, SceneMap, NavigationState, Route, SceneRendererProps, TabBarIndicatorProps, TabBarItemProps } from 'react-native-tab-view';
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { firebaseAuth, firestore } from "../../firebaseConfig";

// import { TabView, TabBar, SceneMap, NavigationState, Route, SceneRendererProps, TabBarIndicatorProps, TabBarItemProps } from 'react-native-tab-view';
// import { Scene, Event } from 'react-native-tab-view/lib/typescript/src/types';
// import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

export default function PostsTabView() {

    // const [experiencesInfo, setExperiencesInfo]= React.useState({});

    // const getProfile= async () => {
    //     const profileRef= doc(firestore, "users", "JPfGsrNSBi7D9olBYCs7"); //Placeholder for now, calls specific document from "experiences" in firebase
    //     const userProfile= await getDoc(profileRef);
    //     console.log(userProfile.data())
    //     setExperiencesInfo(userProfile.data());
    // }

    // React.useEffect(() => {
    //     getProfile()
    // }, []);

    interface PostContainerProps {
        isActive: boolean;
        title: string;
        price: number;
        images: string;
    }

    function PostContainer({isActive, title, price, images}: PostContainerProps) {
        return (
            <View style={styles.infoCard}>
                <ImageBackground 
                    source={{uri: 'https://www.babykidspain.com/wp-content/uploads/2023/01/RAINBOW-M-70cm-1024x1024.jpg'}} 
                    // source={{uri: {images}}}                     
                    style={{height: 350, borderRadius: 30, overflow: 'hidden', justifyContent:'flex-end'}}
                >
                    <View style={{backgroundColor:'#E5E8D9', opacity: 0.8, flexDirection:'row', height:'25%', justifyContent:'space-around', alignItems:'center'}}>
                        <Text style={{width:'60%', maxHeight:'80%', fontSize:15, fontWeight:'bold'}}>{title}</Text>
                        <View style={{width:'30%', maxHeight:'80%'}}>
                            <Text style={{fontSize:20, textAlign:'center', fontWeight:'bold', color:'white', textShadowColor:'rgba(0, 0, 0, 0.75)', textShadowOffset: {width:-1, height:1}, textShadowRadius:10}}>${price}</Text>
                            <Text style={{fontSize:20, fontWeight:'bold', color:'white', textShadowColor:'rgba(0, 0, 0, 0.75)', textShadowOffset: {width:-1, height:1}, textShadowRadius:10}}> /night</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        )
    }


    function PostSection() {
        return (
            <FlatList
                data={PostedData}
                renderItem={({item}) => 
                    <PostContainer
                        isActive= {item.isActive}
                        title= {item.title}
                        price= {item.price}
                        images= {item.image}
                    />}
                showsVerticalScrollIndicator= {false}
                style={styles.posts}
            />
        );
    }

    return (
        <View style={{alignItems: 'center'}}>
            <PostSection/>
        </View>
    )
}


const styles = StyleSheet.create({
    posts: {
        width:'60%',
        height: '85%'
    },

    infoCard: {
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        height: 352,
        // borderWidth: 1,
        borderRadius: 30,
        marginVertical: 10,
    },

    image: {
        borderRadius: 30,
    }
})

const PostedData= [
    {
        isActive: true,
        title: "Beyond Expectations: Luxury Redefined",
        price: 1,
        image: ''
    },

    {
        isActive: true,
        title: "Valley Views",
        price: 27,
        image: ''
    },

    {
        isActive: true,
        title: "Terrific Trials",
        price: 42,
        image: ''
    },
]