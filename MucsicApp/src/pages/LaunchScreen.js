import {Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LaunchScreen() {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <Image style={{width: '100%', height: 900, position: 'absolute', top: 0}} source={require('../../assets/LaunchScreen/Image30.png')} />
            <Image style={{width: '100%', height: 900, position: 'absolute', top: 0}} source={require('../../assets/LaunchScreen/Rectangle 3.png')}/>
            <Image style={{marginTop: 30}} source={require('../../assets/LaunchScreen/Image 33.png')}/>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff', marginTop: 300}}>Your music</Text>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff'}}>Your</Text>
            <Text style={{fontSize: 40, fontWeight: 'bold', color: '#fff'}}>artists</Text>
            <TouchableOpacity style={{backgroundColor: '#000', width: '90%', alignItems: 'center', padding: 10, borderRadius: 30, marginTop: 100}}>
                <Text style={{color: '#fff', fontSize: 20}}>Create an account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#fff', width: '90%', alignItems: 'center', padding: 10, borderRadius: 30, marginTop: 20}}>
                <Text style={{color: '#21a2fb', fontSize: 20}}>I already have an account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}