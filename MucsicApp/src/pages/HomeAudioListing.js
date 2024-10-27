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
                <View style={{marginLeft: 25, marginRight: 20, marginTop: -20}}>
                    <Text style={{fontSize: 18, fontWeight: '200'}}>{greeting},</Text>
                    <Text style={{fontSize: 25,fontWeight: 'bold'}}>Tran Tuan Kiet</Text>
                    <View style={{flexDirection: 'row', borderWidth: 0.3, marginTop: 15, alignItems: 'center', borderRadius: 30}}>
                        <Icon name="search" size={20} color="#000" style={{padding: 12}} />
                        <TextInput placeholder="What you want to listen to" style={{fontSize: 17, fontWeight: '200'}} />
                    </View>
                </View>
                <View style={{marginLeft: 25, marginTop: 50}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Suggestions for you</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                            <Image source={require('../../assets/Home - Audio Listing/Container 26.png')} />
                            <Image source={require('../../assets/Home - Audio Listing/Container 27.png')} style={{marginLeft: 20}} />
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}