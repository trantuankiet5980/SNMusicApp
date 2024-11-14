import React, { useEffect, useRef, useState  } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import IconFeather from "react-native-vector-icons/Feather";
import IconEntypo from "react-native-vector-icons/Entypo";
import { Audio } from 'expo-av';

export default function PlayAnAudio({navigation, route }) {
    const { mucsicSelected } = route.params;
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const slideAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Animation when opening component
    Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
    }).start();

    // Don't stop sound on unmount since we want it to keep playing
    return () => {};
}, []);
  useEffect(() => {
    const setupSound = async () => {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: mucsicSelected.track.preview_url }
      );
      setSound(newSound);

      // Start playing immediately
      await newSound.playAsync();
    };

    setupSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [mucsicSelected]);

  const handlePlayPause = async () => {
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
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
            source={{ uri: mucsicSelected.track.album.images[0].url}}
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
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 20}}>{mucsicSelected.track.name }</Text>
            <Text style={{color: '#fff', fontSize: 16, marginBottom: 30}}>{mucsicSelected.track.artists[0].name}</Text>
            <Image source={require('../../assets/Play an Audio/Group 4.png')}/>
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
