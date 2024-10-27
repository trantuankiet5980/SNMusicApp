import {Text, View, Image, TouchableOpacity, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function HomeAudioListing({navigation}) {
    const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
        const hour = new Date().getHours(); // Lấy giờ hiện tại
        if (hour >= 0 && hour < 10) {
            setGreeting('Good Morning');
        } else if (hour >= 10 && hour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }
    };

    updateGreeting(); // Cập nhật lời chào ban đầu

    const interval = setInterval(updateGreeting, 60000); // Cập nhật mỗi phút

    return () => clearInterval(interval);
    }, []);
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={{marginTop: -20, marginLeft: 25, marginRight: 20}}>
                <Text style={{fontSize: 18, fontWeight: '200'}}>{greeting},</Text>
                <Text style={{fontSize: 25,fontWeight: 'bold'}}>Tran Tuan Kiet</Text>
                <View style={{flexDirection: 'row', borderWidth: 1, marginTop: 15, alignItems: 'center', borderRadius: 30}}>
                    <Icon name="search" size={20} color="#000" style={{padding: 10}} />
                    <TextInput placeholder="What you want to listen to" style={{fontSize: 16, fontWeight: '200'}} />
                </View>
            </View>
            <Button title="Go to HomeAudioListing" onPress={() => navigation.navigate('LaunchScreen')} />
        </SafeAreaView>
    );
}