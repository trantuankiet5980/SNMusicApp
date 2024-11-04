import {Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LaunchScreenPremium({navigation}) {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <Image style={{width: '100%', height: 900, position: 'absolute', top: 0}} source={require('../../assets/Launch Screen - Premium/Image 112.png')} />
            <Image style={{width: '100%', height: 900, position: 'absolute', top: 0}} source={require('../../assets/LaunchScreen/Rectangle 3.png')}/>
            <TouchableOpacity onPress={() => navigation.navigate('LaunchScreen')}>
                <Image style={{marginTop: 30}} source={require('../../assets/Launch Screen - Premium/Image 113.png')}/>
            </TouchableOpacity>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff', marginTop: 300}}>Welcome to</Text>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff'}}>Premium</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'HomeAudioListing' })} style={{backgroundColor: '#000', width: '90%', alignItems: 'center', padding: 10, borderRadius: 30, marginTop: 100}}>
                <Text style={{color: '#fff', fontSize: 20}}>Start listening</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    );
}