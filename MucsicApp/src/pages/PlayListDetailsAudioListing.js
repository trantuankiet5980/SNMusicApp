import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, SafeAreaView } from "react-native";
import { Audio } from 'expo-av';
import { PlayListAudio } from "../../src/components/PlayListAudio";
import IconFeather from "react-native-vector-icons/Feather";
import IconEntypo from "react-native-vector-icons/Entypo";
import playList from "../../assets/data/PlayList.json";
import { audioMapping } from '../../assets/mucsic/AudioMapping';

export default function PlayListDetailsAudioListing({navigation, route }) {
    const { imageSource, name } = route.params;
    const [selectedItem, setSelectedItem] = useState(null);
    const [sound, setSound] = useState();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const playSound = async (audioSource) => {
        try {
            setIsLoading(true);
            
            if (sound) {
                await sound.stopAsync();
                await sound.unloadAsync();
            }

            const soundObject = new Audio.Sound();
            const audioPath = audioMapping[audioSource];
            
            await soundObject.loadAsync(audioPath);
            setSound(soundObject);
            
            await soundObject.playAsync();
            setIsPlaying(true);
            setIsLoading(false);

            soundObject.setOnPlaybackStatusUpdate((status) => {
                if (status && status.didJustFinish) {
                    playNextSong();
                }
            });

        } catch (error) {
            setIsLoading(false);
            console.error("Error playing sound:", error);
        }
    };

    const handleItemPress = (item) => {
        if (!item || isLoading) return;
        setSelectedItem(item);
        playSound(item.url);
    };

    const playNextSong = async () => {
        if (!selectedItem || isLoading) return;
        
        const currentIndex = playList.findIndex((item) => item.id === selectedItem.id);
        if (currentIndex === -1) return;
        
        const nextIndex = (currentIndex + 1) % playList.length;
        const nextItem = playList[nextIndex];
        
        if (nextItem) {
            setSelectedItem(nextItem);
            await playSound(nextItem.url);
        }
    };

    const handlePausePress = async () => {
        if (sound && !isLoading) {
            try {
                await sound.pauseAsync();
                setIsPlaying(false);
            } catch (error) {
                console.error("Error pausing sound:", error);
            }
        }
    };

    const handlePlayPress = async () => {
        if (sound && !isLoading) {
            try {
                await sound.playAsync();
                setIsPlaying(true);
            } catch (error) {
                console.error("Error resuming sound:", error);
            }
        }
    };

    useEffect(() => {
        const setupAudio = async () => {
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: true,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false
                });
            } catch (error) {
                console.error("Error setting up audio:", error);
            }
        };

        setupAudio();

        // Add navigation listener for when screen is blurred (navigating away)
        const unsubscribe = navigation.addListener('blur', async () => {
            if (sound) {
                try {
                    await sound.stopAsync();
                    await sound.unloadAsync();
                    setSound(null);
                    setIsPlaying(false);
                } catch (error) {
                    console.error("Error stopping sound:", error);
                }
            }
        });
        
        return () => {
            unsubscribe();
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [navigation, sound]);

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
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{selectedItem.title}</Text>
                            <Text style={{ color: '#fff' }}>{selectedItem.artist}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconFeather name="heart" size={25} color="#fff" style={{ marginRight: 20 }} />
                        {isLoading ? (
                            <Text style={{ color: '#fff', marginRight: 20 }}>Loading...</Text>
                        ) : isPlaying ? (
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
