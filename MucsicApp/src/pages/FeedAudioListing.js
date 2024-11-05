import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import Feed from "../../assets/data/Feed.json";
import IconEntypo from "react-native-vector-icons/Entypo";

const FeedAudioItem = ({ item, onItemPress }) => {
    const [likeCount, setLikeCount] = useState(item.interact[0].timInteract || 0);
    const [loadingLikes, setLoadingLikes] = useState(false);

    const incrementLikeCount = () => {
        setLoadingLikes(true);
        // Simulate an API call or update delay
        setTimeout(() => {
            setLikeCount(likeCount + 1);
            setLoadingLikes(false);
        }, 500); // Adjust the timeout duration as needed
    };

    return (
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Image source={require('../../assets/Feed - Audio Listing/mp3.png')} style={{ width: 40, height: 40, borderRadius: 10 }} />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>{item.artist}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 14, marginRight: 10 }}>{item.posted}</Text>
                        <IconEntypo style={{ color: '#9095a0' }} name="dot-single" size={22} />
                        <Text style={{ color: '#9095a0', fontSize: 14 }}>{item.timePost}</Text>
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }} onPress={incrementLikeCount}>
                        <IconEntypo style={{ marginRight: 5 }} name="heart" size={30} />
                        {loadingLikes ? (
                            <ActivityIndicator size="small" color="black" />
                        ) : (
                            <Text style={{
                                fontSize: 13,
                                fontWeight: 'bold',
                                color: 'black'
                            }}>{likeCount}</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }}>
                        <IconEntypo style={{ marginRight: 5 }} name="message" size={30} />
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: 'black'
                        }}>
                            {item.interact[0].commentInteract.length}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }}>
                        <IconEntypo style={{ marginRight: 5 }} name="cycle" size={30} />
                        <Text style={{
                            fontSize: 13,
                            fontWeight: 'bold',
                            color: 'black'
                        }}>
                            {item.interact[0]?.commentInteract[0]?.reply?.length || 0}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10 }}>
                    <IconEntypo name="dots-three-horizontal" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default function FeedAudioListing({ onItemPress }) {
    const mappedFeed = Feed.map(item => ({
        ...item,
        url: item.url
    }));

    return (
        <View style={{backgroundColor:'white'}}>
            <FlatList
                data={mappedFeed}   
                contentContainerStyle={{ paddingBottom: 30 }}
                renderItem={({ item }) => (
                    <FeedAudioItem item={item} onItemPress={onItemPress} />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>

    );
}
