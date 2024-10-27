import React from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MyLibrary from '../pages/MyLibrary';
import HomeAudioListing from '../pages/HomeAudioListing';
import FeedAudioListing from '../pages/FeedAudioListing';
import SearchAudio from '../pages/SearchAudio';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
    return (
        <Tab.Navigator
            screenOptions ={{
                tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 0,
                    height: 80
                },
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: 'bold', 
                    marginBottom: 30,
                    marginTop: 5
                }
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={HomeAudioListing} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="home" color={color} size={30} />
                    ),
                    headerTitle: '',
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('LaunchScreen')}>
                            <Image style={{marginLeft: 20}} source={require('../../assets/Home - Audio Listing/Image 36.png')} />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TouchableOpacity>
                                <Icon name="bell" size={30} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={{marginLeft: 20, marginRight: 20}} source={require('../../assets/Home - Audio Listing/Avatar 3.png')} />
                            </TouchableOpacity>
                        </View>
                
                    )
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
