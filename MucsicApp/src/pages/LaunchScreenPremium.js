import {Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

export default function LaunchScreenPremium({navigation}) {

    const handleStartListening = () => {  
        navigation.navigate('MainTabs', {
            screen: 'Home',
            params: {
                screen: 'HomeAudioListing',
            }
        });
    };

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <Image style={{width: '100%', height: 900, position: 'absolute', top: 0}} source={require('../../assets/Launch Screen - Premium/Image 112.png')} />
            <Image style={{width: '100%', height: 900, position: 'absolute', top: 0}} source={require('../../assets/LaunchScreen/Rectangle 3.png')}/>
            <TouchableOpacity onPress={() => navigation.navigate('LaunchScreen')}>
                <Image style={{marginTop: 30}} source={require('../../assets/Launch Screen - Premium/Image 113.png')}/>
            </TouchableOpacity>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff', marginTop: 250}}>Welcome to</Text>
            <Text style={{fontSize: 40, marginBottom: 20, fontWeight: 'bold', color: '#fff'}}>Premium</Text>
            <TouchableOpacity 
                onPress={handleStartListening}
                style={{backgroundColor: '#000', width: '90%', alignItems: 'center', padding: 10, borderRadius: 30, marginTop: 30}}
            >
                <Text style={{color: '#fff', fontSize: 20}}>Sign in with Music</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
}