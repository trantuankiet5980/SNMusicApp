import React, { useEffect, useRef, useState  } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconFeather from "react-native-vector-icons/Feather";
import IconEntypo from "react-native-vector-icons/Entypo";
import { Audio } from 'expo-av';

export default function PlayAnAudio({navigation, route }) {
    const { mucsicSelected, sound } = route.params;
    const slideAnim = useRef(new Animated.Value(0)).current;
    // const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
  
   useEffect(() => {
        // Animation khi mở component
        Animated.timing(slideAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        // Tạo đối tượng âm thanh khi component được mount
        // const loadSound = async () => {
        //     const { sound } = await Audio.Sound.createAsync(
        //         { uri: mucsicSelected.url },
        //         { shouldPlay: true }
        //     );
        //     setSound(sound);
        //     setIsPlaying(true); // Ban đầu phát nhạc luôn khi mở component
        // };
        // loadSound();
        // setIsPlaying(true);
        // setSound(mucsicSelected.uri);

        return () => {
            // Unload âm thanh khi component bị unmount
            if (sound) {
                sound.stopAsync();
                sound.unloadAsync();
            }
        };
    }, []);
    const handlePlayPause = async () => {
        if (isPlaying) {
            // Nếu nhạc đang phát, tạm dừng nhạc
            await sound.pauseAsync();
        } else {
            // Nếu nhạc đang dừng, phát lại nhạc
            await sound.playAsync();
        }
        setIsPlaying(!isPlaying); // Cập nhật trạng thái isPlaying
    };

    const handleClose = () => {
        // Animation khi đóng component
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            navigation.goBack();
        });
    };
  return (
    <SafeAreaView style={{ flex: 1}}>
        <Animated.View
        style={{
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [900, 0],
              }),
            },
          ],
          position: "absolute", right: 0, left: 0, bottom: 0, top: 0, zIndex: 1
        }}
      >
        <Image
            source={{ uri: mucsicSelected.artwork }}
            style={{ width: "100%", height: 900, position: "absolute", top: 0 }}
        />
        <View
            style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: 100, 
            width: '100%',
            padding: 20,
            backgroundColor: "black",
            opacity: 0.7,
            position: "absolute", 
            top: 0
            }}
        >
            <Text style={{color: '#fff', fontSize: 17, marginTop: 30}}>Play</Text>
            <TouchableOpacity onPress={handleClose}>
                <IconFeather style={{marginTop: 30}} name="chevron-down" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
        <View style={{width: '100%', height: 400, backgroundColor: 'black', marginTop: 500, opacity: 0.7, padding: 20}}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>{mucsicSelected.artist}</Text>
            <Text style={{color: '#fff', fontSize: 16, marginBottom: 30}}>{mucsicSelected.title}</Text>
            <Image source={require('../../assets/Play an Audio/Group 4.png')}/>
            <Text style={{color: '#fff'}}>{mucsicSelected.time}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: 20}}>
                <TouchableOpacity>
                    <IconEntypo name="shuffle" size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <IconEntypo name="controller-jump-to-start" size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                            onPress={handlePlayPause}
                            style={{ height: 70, width: 70, borderRadius: 50, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <IconEntypo name={isPlaying ? "controller-paus" : "controller-play"} size={30} color="#000" />
                        </TouchableOpacity>
                <TouchableOpacity>
                    <IconEntypo name="controller-next" size={30} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <IconEntypo name="dots-three-horizontal" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginTop: 50, alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity>
                            <IconEntypo name="heart" size={30} color="#fff" />
                        </TouchableOpacity>
                        <Text style={{color: '#fff', marginLeft: 8}}>12k</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 20}}>
                        <TouchableOpacity>
                            <IconEntypo name="text-document" size={30} color="#fff" />
                        </TouchableOpacity>
                        <Text style={{color: '#fff', marginLeft: 8}}>540</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <IconEntypo name="share-alternative" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </View>
        </Animated.View>
    </SafeAreaView>
  );
}
