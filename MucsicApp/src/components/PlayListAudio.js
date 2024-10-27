import React from "react";
import { FlatList, Image, Text, View, TouchableOpacity } from "react-native";
import { Audio } from 'expo-av';
import playList from "../../assets/data/PlayList.json";
import IconEntypo from "react-native-vector-icons/Entypo";

export const PlayListAudio = ({ onItemPress }) => {
    return (
        <FlatList
            data={playList}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
                <PlayListItem item={item} onItemPress={onItemPress} />
            )}
        />
    );
}

const PlayListItem = ({ item, onItemPress }) => {
    return (
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => onItemPress(item)}>
                <View>
                    <Image style={{ width: 70, height: 70, borderRadius: 10 }} source={{ uri: item.artwork }} />
                </View>
                <View style={{ justifyContent: 'space-between', marginLeft: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.artist}</Text>
                    <Text style={styles.font}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconEntypo style={{ fontWeight: '300' }} name="controller-play" size={18} />
                        <Text style={styles.font}>{item.views}M</Text>
                        <IconEntypo style={{ fontWeight: '300' }} name="dot-single" size={22} />
                        <Text style={styles.font}>{item.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <IconEntypo name="dots-three-horizontal" size={20} />
            </TouchableOpacity>
        </View>
    );
}

const styles = {
    font: {
        fontSize: 13,
        fontWeight: '300'
    }
}
