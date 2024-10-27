import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconFeather from "react-native-vector-icons/Feather";

export default function PlayListDetailsAudioListing({route}) {
    const {imageSource, name} = route.params
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff', marginTop: -30, paddingLeft: 20, paddingRight: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={imageSource}/>
                <View style={{marginLeft: 10}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom: 5}}>{name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <IconFeather name="heart" size={18} color="#00abff" />
                        <Text style={{fontSize: 15, fontWeight: '200'}}>1,234</Text>
                        <IconFeather name="circle" size={10} color="#333"/>
                        <Text style={{fontSize: 15, fontWeight: '200'}}>05:10:18</Text>
                    </View>
                    <Text style={{fontSize: 15, fontWeight: '200'}}>Daily chart-toppers update</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}