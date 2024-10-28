import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, SafeAreaView } from "react-native";
import { Audio } from 'expo-av';
import { PlayListAudio } from "../../src/components/PlayListAudio";
import IconFeather from "react-native-vector-icons/Feather";
import IconEntypo from "react-native-vector-icons/Entypo";
import playList from "../../assets/data/PlayList.json";
import Orientation from 'react-native-orientation-locker';

export default function PlayListDetailsAudioListing({navigation, route }) {
    const { imageSource, name } = route.params;
    const [selectedItem, setSelectedItem] = useState(null);
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);

    const playSound = async (url) => {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: url },
            { shouldPlay: true }
        );
        setSound(newSound);
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
                playNextSong();
            }
        });
    };

    const handleItemPress = (item) => {
        setSelectedItem(item);
        playSound(item.url);
    };

    const playNextSong = () => {
        const currentIndex = playList.findIndex((item) => item.url === selectedItem.url);
        const nextIndex = (currentIndex + 1) % playList.length; // Chuyển về bài đầu tiên khi hết danh sách
        const nextItem = playList[nextIndex];
        setSelectedItem(nextItem);
        playSound(nextItem.url);
    };

    const handlePausePress = async () => {
        if (sound) {
            await sound.pauseAsync();
            setIsPlaying(false);
        }
    };

    const handlePlayPress = async () => {
        if (sound) {
            await sound.playAsync();
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        
        return () => {
            if (sound) {
                sound.stopAsync();
                sound.unloadAsync();
            }
        };
    }, [sound]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                <Image source={imageSource} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 5 }}>{name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IconFeather name="heart" size={18} color="#00abff" />
                        <Text style={{ fontSize: 15, fontWeight: '200' }}>1,234</Text>
                        <IconFeather name="circle" size={10} color="#333" />
                        <Text style={{ fontSize: 15, fontWeight: '200' }}>05:10:18</Text>
                    </View>
                    <Text style={{ fontSize: 15, fontWeight: '200' }}>Daily chart-toppers update</Text>
                </View>
            </View>
            <PlayListAudio onItemPress={handleItemPress} />
            {selectedItem && (
                <View style={{ backgroundColor: 'black', height: 80, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('PlayAnAudio', {mucsicSelected: selectedItem, sound})} style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: selectedItem.artwork }} style={{ width: 50, height: 50, marginRight: 20, marginLeft: 20, borderRadius: 5 }} />
                        <View>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{selectedItem.artist}</Text>
                            <Text style={{ color: '#fff' }}>{selectedItem.title}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconFeather name="heart" size={25} color="#fff" style={{ marginRight: 20 }} />
                        {isPlaying ? (
                            <TouchableOpacity onPress={handlePausePress}>
                                <IconFeather name="pause" size={25} color="#fff" style={{ marginRight: 20 }} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={handlePlayPress}>
                                <IconFeather name="play" size={25} color="#fff" style={{ marginRight: 20 }} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}
