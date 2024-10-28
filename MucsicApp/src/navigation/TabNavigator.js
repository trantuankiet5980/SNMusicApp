import React from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from "react-native-vector-icons/FontAwesome";
import IconEntypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MyLibrary from "../pages/MyLibrary";
import HomeAudioListing from "../pages/HomeAudioListing";
import FeedAudioListing from "../pages/FeedAudioListing";
import ArtistProfile from "../pages/ArtistProfile";
import SearchAudio from "../pages/SearchAudio";
import PlayListDetailsAudio from "../pages/PlayListDetailsAudioListing";
import { TouchableOpacity } from "react-native";


const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen
      name="HomeAudioListing"
      component={HomeAudioListing}
      options={({ navigation }) => ({
        headerTitle: "",
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.navigate("LaunchScreen")}>
            <Image
              style={{ marginLeft: 20 }}
              source={require("../../assets/Home - Audio Listing/Image 36.png")}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity>
              <Icon name="bell" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 20, marginRight: 20 }}
                source={require("../../assets/Home - Audio Listing/Avatar 3.png")}
              />
            </TouchableOpacity>
          </View>
        ),
        headerShadowVisible: false,
      })}
    />
    <HomeStack.Screen
      name="PlayListDetailsAudio"
      component={PlayListDetailsAudio}
      options={{
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false,
        headerRight: () => (
          <TouchableOpacity>
            <IconEntypo
              name="radio"
              size={30}
              color="#000"
              style={{ marginRight: 20 }}
            />
          </TouchableOpacity>
        ),
      }}
    />
    <HomeStack.Screen
      name="ArtistProfile"
      component={ArtistProfile}
      options={{
        headerShown: true,
        headerTitle: "",
        headerShadowVisible: false,
      }}
    />
  </HomeStack.Navigator>
);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 100,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",
          marginBottom: 30,
          marginTop: -20,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={30} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchAudio}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedAudioListing}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cordova" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={MyLibrary}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
