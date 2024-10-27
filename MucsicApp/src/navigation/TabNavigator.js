import React from 'react'; // Sửa lỗi chính tả 'Rea' thành 'React'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyLibrary from '../pages/MyLibrary';
import HomeAudioListing from '../pages/HomeAudioListing';
import FeedAudioListing from '../pages/FeedAudioListing';
import SearchAudio from '../pages/SearchAudio';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={HomeAudioListing} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={size} />
                    ),
                    headerShown: false
                }} 
            />
            <Tab.Screen 
                name="Search" 
                component={SearchAudio} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="search" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Feed" 
                component={FeedAudioListing} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cordova" color={color} size={size} />
                    ),
                }} 
            />
            <Tab.Screen 
                name="Library" 
                component={MyLibrary} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="book" color={color} size={size} />
                    ),
                }} 
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
