import {Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LaunchScreen() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Image style={{width: '100%', height: 900, position: 'absolute', top: 0}} source={require('../../assets/LaunchScreen/Image30.png')} />
        </SafeAreaView>
    );
}