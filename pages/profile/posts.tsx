import { JSXElementConstructor, ReactElement, ReactNode, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet, Dimensions, TouchableOpacity, PressableAndroidRippleConfig, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { TabView, TabBar, SceneMap, NavigationState, Route, SceneRendererProps, TabBarIndicatorProps, TabBarItemProps } from 'react-native-tab-view';
import { Scene, Event } from 'react-native-tab-view/lib/typescript/src/types';
// import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

const {width, height}= Dimensions.get('window'); //retrieves dimensions of the screen

const customTabBar = (props: JSX.IntrinsicAttributes & SceneRendererProps & { navigationState: NavigationState<Route>; scrollEnabled?: boolean | undefined; bounces?: boolean | undefined; activeColor?: string | undefined; inactiveColor?: string | undefined; pressColor?: string | undefined; pressOpacity?: number | undefined; getLabelText?: ((scene: Scene<Route>) => string | undefined) | undefined; getAccessible?: ((scene: Scene<Route>) => boolean | undefined) | undefined; getAccessibilityLabel?: ((scene: Scene<Route>) => string | undefined) | undefined; getTestID?: ((scene: Scene<Route>) => string | undefined) | undefined; renderLabel?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => ReactNode) | undefined; renderIcon?: ((scene: Scene<Route> & { focused: boolean; color: string; }) => ReactNode) | undefined; renderBadge?: ((scene: Scene<Route>) => ReactNode) | undefined; renderIndicator?: ((props: TabBarIndicatorProps<Route>) => ReactNode) | undefined; renderTabBarItem?: ((props: TabBarItemProps<Route> & { key: string; }) => ReactElement<any, string | JSXElementConstructor<any>>) | undefined; onTabPress?: ((scene: Scene<Route> & Event) => void) | undefined; onTabLongPress?: ((scene: Scene<Route>) => void) | undefined; tabStyle?: StyleProp<ViewStyle>; indicatorStyle?: StyleProp<ViewStyle>; indicatorContainerStyle?: StyleProp<ViewStyle>; labelStyle?: StyleProp<TextStyle>; contentContainerStyle?: StyleProp<ViewStyle>; style?: StyleProp<ViewStyle>; gap?: number | undefined; testID?: string | undefined; android_ripple?: PressableAndroidRippleConfig | undefined; }) => {
    return (
        <TabBar
            {...props}
            renderLabel={({route}) => (
                <Text style={{color:'#8F8685', fontSize: 16, fontWeight: 'bold'}}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{backgroundColor:'#8F8685', opacity: 0.5,}}
            style={{
                backgroundColor: '#F8FAF0', 
                borderBottomWidth: 1, 
                borderColor:'#8F8685',
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
            }}
        />
    );
};

export default function PostsTabView() {

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'post', title: 'Posts' },
        { key: 'save', title: 'Saved' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar= {customTabBar}
        />
    );
}

const PostRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#F8FAF0' }}>
        <PostSection/>
    </View>
);

const SavedRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#F8FAF0' }}>
        <SavedSection/>
    </View>);

const renderScene = SceneMap({
    post: PostRoute,
    save: SavedRoute,
});

interface PostContainerProps {
    post_title: string;
    post_content: string;
}

function PostContainer({post_title, post_content}: PostContainerProps) {
    return (
        <View style= {styles.each_post}>
            <View>
                <Text style={{fontSize:15, fontWeight: '500', maxWidth: '90%'}}>{post_title}</Text>
                <Text style={{fontSize:12, fontWeight: '300', maxWidth: '100%'}}>{post_content}</Text>
            </View>
        </View>
    )
}

interface SavedContainerProps {
    post_title: string;
    post_content: string;
    saved: boolean;
}
function SavedContainer({post_title, post_content, saved}: SavedContainerProps) {
    return (
        <View style= {styles.each_post}>
            <Image source={require('../../assets/profile_icon.png')} style={styles.post_user_icon}/>
            <View style={{width: width*0.65, marginHorizontal: 10}}>
                <Text style={{fontSize:15, fontWeight: '500', maxWidth: '90%'}}>{post_title}</Text>
                <Text style={{fontSize:12, fontWeight: '300', maxWidth: '100%'}}>{post_content}</Text>
            </View>
            <View style={{justifyContent:'center'}}>
                <Image source={require('../../assets/more.png')}/>
            </View>
        </View>
    )
}

function PostSection() {
    return (
        <FlatList
        data={PostedData}
        renderItem={({item}) => 
            <PostContainer
                post_title={item.title}
                post_content={item.message}
            />}
        />
    );
}

function SavedSection() {
    return (
        <FlatList
        data={SavedData}
        renderItem={({item}) => 
            <SavedContainer
                post_title={item.title}
                post_content={item.message}
                saved= {true}
            />}
        />
    );
}

const styles = StyleSheet.create({
    each_post: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
    },

    post_user_icon: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 50/2,
    }
})

//Just some filler data. Can remove later
const SavedData=[
    {
        id:'1',
        title: 'Lovely accomodation',
        message: 'The hotel exceeded our expectations with its impeccable service and breathtaking views.'
    },

    {
        id:'2',
        title: 'Good Location!',
        message: "The hotel's central location made it convenient for us to explore the city's attractions."
    },

    {
        id:'3',
        title: 'Memorable nature trail',
        message: "The diverse flora and fauna along the trail made it an unforgettable experience for nature enthusiasts."
    },

    {
        id:'4',
        title: '10/10 service. Would highly recommend',
        message: "The hotel's warm hospitality and cozy ambiance made us feel right at home."
    },

    {
        id:'5',
        title: 'Lost in the beauty of nature',
        message: "Walking through the serene nature trail was like stepping into a hidden paradise."
    },

    {
        id:'6',
        title: "Into the Wilderness: Unraveling Nature's Splendor",
        message: "Exploring the winding trails surrounded by majestic mountains left us in awe of Mother Nature's beauty."
    },

    {
        id:'7',
        title: 'Lost in the beauty of nature',
        message: "Walking through the serene nature trail was like stepping into a hidden paradise."
    },

    {
        id:'8',
        title: "Exceeding Expectations: Indulging in Luxury",
        message: "From the moment we arrived, the hotel staff went above and beyond to ensure our stay was nothing short of extraordinary."
    },

]

const PostedData= [
    {
        id:'1',
        title: "Beyond Expectations: Luxury Redefined",
        message: "From the moment we arrived, the hotel staff's extraordinary service ensured a truly indulgent experience."
    },

    {
        id:'2',
        title: 'Gateway to the City: Ideal Hotel Location',
        message: "Conveniently situated in the heart of the city, the hotel allowed us to explore its attractions with ease."
    },

    {
        id:'3',
        title: "Nature's Symphony: An Unforgettable Trail Adventure",
        message: "The trail's abundant flora and fauna created an enchanting experience for nature enthusiasts like us."
    },

    {
        id:'4',
        title: 'A Home Away from Home: Exceptional Service and Comfort',
        message: "The warm hospitality and cozy ambiance of the hotel made our stay truly memorable."
    },

    {
        id:'5',
        title: 'Hidden Gem: Embracing Serenity on the Nature Trail',
        message: "Venturing through the tranquil nature trail felt like discovering a hidden paradise."
    },

    {
        id:'6',
        title: "Embarking on a Journey: Unveiling Nature's Majesty",
        message: "As we explored the winding trails amidst majestic mountains, Mother Nature's beauty left us in awe."
    },

    {
        id:'7',
        title: "Nature's Haven: Embracing Serenity on the Nature Trail",
        message: "Stepping into the serene nature trail felt like being transported to a world of natural beauty."
    },
]