import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconFeather from "react-native-vector-icons/Feather";
import {PlayListAudio} from "../../src/components/PlayListAudio"

export default function PlayListDetailsAudioListing({route}) {
    const {imageSource, name} = route.params;
  
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20, marginTop: -40}}>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 40}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                        <IconFeather name="heart" size={25} color="#333" style={{marginRight: 30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <IconFeather name="more-horizontal" size={25} color="#333" />
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity>
                        <IconFeather name="shuffle" size={25} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image style={{marginLeft: 30}} source={require('../../assets/Playlist Details - Audio Listing/Icon Button 2.png')} />
                    </TouchableOpacity>
                </View>
            </View>
            <PlayListAudio />
        </SafeAreaView>
    );
}