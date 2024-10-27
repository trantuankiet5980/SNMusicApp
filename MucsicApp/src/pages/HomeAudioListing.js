import {Text, View, Image, TouchableOpacity, Button, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeAudioListing({navigation}) {
    const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 10) {
            setGreeting('Good Morning');
        } else if (hour >= 10 && hour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    };

    updateGreeting(); 

    const interval = setInterval(updateGreeting, 60000);

    return () => clearInterval(interval);
    }, []);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <ScrollView>
                <View style={{marginLeft: 25, marginRight: 20}}>
                    <Text style={{fontSize: 18, fontWeight: '200'}}>{greeting},</Text>
                    <Text style={{fontSize: 25,fontWeight: 'bold'}}>Tran Tuan Kiet</Text>
                    <View style={{flexDirection: 'row', borderWidth: 0.3, marginTop: 15, alignItems: 'center', borderRadius: 30}}>
                        <Icon name="search" size={20} color="#000" style={{padding: 12}} />
                        <TextInput placeholder="What you want to listen to" style={{fontSize: 17, fontWeight: '200'}} />
                    </View>
                </View>
                {/* Suggestions for you */}
                <View style={{marginLeft: 25, marginTop: 50}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Suggestions for you</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <Image source={require('../../assets/Home - Audio Listing/Container 26.png')} />
                            <Image source={require('../../assets/Home - Audio Listing/Container 27.png')} style={{marginLeft: 20}} />
                        </View>
                    </ScrollView>
                </View>
                {/* Charts */}
                <View style={{marginLeft: 25, marginTop: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, alignItems: 'center', marginBottom: 10}}>
                        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Charts</Text>
                        <TouchableOpacity>
                            <Text style={{fontSize: 14, fontWeight: '200'}}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{width: 150}}>
                            <Image source={require('../../assets/Home - Audio Listing/Container 31.png')} />
                            <Text style={{fontSize: 15, fontWeight: '200'}}>Daily chart-toppers update</Text>
                        </View>
                        <View style={{width: 150, marginLeft: 10}}>
                            <Image source={require('../../assets/Home - Audio Listing/Container 32.png')} />
                            <Text style={{fontSize: 15, fontWeight: '200'}}>Daily chart-toppers update</Text>
                        </View>
                        <View style={{width: 150, marginLeft: 10}}>
                            <Image source={require('../../assets/Home - Audio Listing/Container 33.png')} />
                            <Text style={{fontSize: 15, fontWeight: '200'}}>Daily chart-toppers update</Text>
                        </View>
                    </ScrollView>
                </View>
                {/* Trending albums */}
                <View style={{marginLeft: 25, marginTop: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, alignItems: 'center', marginBottom: 10}}>
                        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Trending albums</Text>
                        <TouchableOpacity>
                            <Text style={{fontSize: 14, fontWeight: '200'}}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{width: 150}}>
                            <Image source={require('../../assets/Home - Audio Listing/Image 45.png')} />
                            <View>
                                <Text style={{fontSize: 15, fontWeight: '500'}}>ME</Text>
                                <Text style={{fontSize: 15, fontWeight: '200'}}>Jessica Gonzalez</Text>
                            </View>
                        </View>
                        <View style={{width: 150, marginLeft: 10}}>
                            <Image source={require('../../assets/Home - Audio Listing/Image 46.png')} />
                            <View>
                                <Text style={{fontSize: 15, fontWeight: '500'}}>Magna nost</Text>
                                <Text style={{fontSize: 15, fontWeight: '200'}}>Brian Thomas</Text>
                            </View>
                        </View>
                        <View style={{width: 150, marginLeft: 10}}>
                            <Image source={require('../../assets/Home - Audio Listing/Image 47.png')} />
                            <View>
                                <Text style={{fontSize: 15, fontWeight: '500'}}>Magna nost</Text>
                                <Text style={{fontSize: 15, fontWeight: '200'}}>Christopl Gonzalez</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                {/* Popular artists */}
                <View style={{marginLeft: 25, marginTop: 20, marginBottom: 50}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, alignItems: 'center', marginBottom: 10}}>
                        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Popular artists</Text>
                        <TouchableOpacity>
                            <Text style={{fontSize: 14, fontWeight: '200'}}>See all</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{width: 150, alignItems: 'center'}}>
                            <Image source={require('../../assets/Home - Audio Listing/Image 39.png')} />              
                            <Text style={{fontSize: 15, fontWeight: '500', marginTop: 10}}>Jennifer</Text>
                            <TouchableOpacity style={{backgroundColor: '#000', borderRadius: 20, marginTop: 10, width: 70, height: 35, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 15, fontWeight: '600', color: '#fff'}}>Follow</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{width: 150, alignItems: 'center'}}>
                            <Image source={require('../../assets/Home - Audio Listing/Image 40.png')} />              
                            <Text style={{fontSize: 15, fontWeight: '500', marginTop: 10}}>Elizabeth Hall</Text>
                            <TouchableOpacity style={{backgroundColor: '#000', borderRadius: 20, marginTop: 10, width: 70, height: 35, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 15, fontWeight: '600', color: '#fff'}}>Follow</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{width: 150, alignItems: 'center'}}>
                            <Image source={require('../../assets/Home - Audio Listing/Image 41.png')} />              
                            <Text style={{fontSize: 15, fontWeight: '500', marginTop: 10}}>Anthor Kiet</Text>
                            <TouchableOpacity style={{backgroundColor: '#000', borderRadius: 20, marginTop: 10, width: 70, height: 35, alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontSize: 15, fontWeight: '600', color: '#fff'}}>Follow</Text> 
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
}