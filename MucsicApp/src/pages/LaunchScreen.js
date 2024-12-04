import {Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect } from 'react';
const CLIENT_ID = "764e4774b70046438c3e08ff1429fdbe";
const CLIENT_SECRET = "79bfe267b3f047ebb2acf0ebf1d3d9e8";
export default function LaunchScreen({navigation}) {
    async function getAccessToken() {
        let authParams = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:
                "grant_type=client_credentials&client_id=" +
                CLIENT_ID +
                "&client_secret=" +
                CLIENT_SECRET,
        };
        fetch("https://accounts.spotify.com/api/token", authParams)
            .then((response) => response.json())
            .then((data) => {
                AsyncStorage.setItem("access_token", data.access_token);
            });
    }
    useEffect(() => {
        getAccessToken();
    }, []);
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <Image style={{width: '100%', height: 900, position: 'absolute', top: 0}} source={require('../../assets/LaunchScreen/Image30.png')} />
            <Image style={{width: '100%', height: 900, position: 'absolute', top: 0}} source={require('../../assets/LaunchScreen/Rectangle 3.png')}/>
            <Image style={{marginTop: 30}} source={require('../../assets/LaunchScreen/Image 33.png')}/>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff', marginTop: 300}}>Your music</Text>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff'}}>Your</Text>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff'}}>artists</Text>
            <TouchableOpacity onPress={() => navigation.navigate('LaunchScreenPremium')} style={{backgroundColor: '#000', width: '90%', alignItems: 'center', padding: 10, borderRadius: 30, marginTop: 100}}>
                <Text style={{color: '#fff', fontSize: 20}}>Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SubcritionPlans')} style={{backgroundColor: '#fff', width: '90%', alignItems: 'center', padding: 10, borderRadius: 30, marginTop: 20}}>
                <Text style={{color: '#21a2fb', fontSize: 20}}>I already have an account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}