import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import Feed from "../../assets/data/Feed.json";
import IconEntypo from "react-native-vector-icons/Entypo";


const FeedAudioItem = ({ item, onItemPress }) => {

    return (
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Image source={require('../../assets/Feed - Comment on an Audio/Avatar 8.png')} style={{ width: 40, height: 40, borderRadius: 10 }} />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity>
                        <Text style={{ color: 'black', fontSize: 16 }}>{item.artist}</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: 'black', fontSize: 12, marginRight: 10 }}>{item.posted}</Text>
                        <Text style={{ color: 'black', fontSize: 12 }}>{item.timePost}</Text>
                    </View>
                </View>
            </View>
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity>
                    <Image
                        style={{ width: 350, height: 350, borderRadius: 10 }}
                        source={{ uri: item.artwork }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: 350,
                        height: 70,
                        backgroundColor: 'rgba(159, 70, 13, 0.8)',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                            {item.title}
                        </Text>
                        <Text style={{ color: 'white', marginBottom: 5 }}>{item.artist}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginRight: 5 }}>
                        <TouchableOpacity onPress={() => onItemPress(item)}>
                            <IconEntypo style={{ fontWeight: '300', color: 'white', fontWeight: 'bold' }} name="controller-play" size={18} />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: 13,
                            fontWeight: '300', color: 'white', fontWeight: 'bold'
                        }}>{item.views}</Text>
                        <IconEntypo style={{ fontWeight: '300', color: 'white', fontWeight: 'bold' }} name="dot-single" size={22} />
                        <Text style={{
                            fontSize: 13,
                            fontWeight: '300', color: 'white', fontWeight: 'bold'
                        }}>{item.time}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default function FeedAudioListing({ onItemPress }) {
    const mappedFeed = Feed.map(item => ({
        ...item,
        url: item.url
    }));

    return (
        <FlatList
            data={mappedFeed}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
                <FeedAudioItem item={item} onItemPress={onItemPress} />
            )}
            keyExtractor={(item) => item.id}
        />
    );
}