import {Text, View, Image, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeAudioListing({navigation}) {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
            <Text>Home</Text>
            <Button title="Go to HomeAudioListing" onPress={() => navigation.navigate('LaunchScreen')} />
        </SafeAreaView>
    );
}