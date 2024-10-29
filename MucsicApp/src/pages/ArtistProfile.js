import React from "react";
import { FlatList, TouchableOpacity, View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Entypo";
import IconEntypo from "react-native-vector-icons/Entypo";
import { ArtistsPopularSongs } from "../components/ArtistsPopularSongs";

export default function ArtistProfile({ route }) {
    const { artist } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', marginTop: -50 }}>
            <FlatList
                data={artist.populars}
                ListHeaderComponent={() => (
                    <View style={{marginHorizontal: 20 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image 
                                source={{ uri: artist.image }} 
                                style={{ width: 200, height: 200, borderRadius: 100 }} 
                            />
                            <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: 15 }}>
                                {artist.name}
                            </Text>
                            <Text style={{ marginTop: 10, fontSize: 13, fontWeight: '300' }}>
                                {artist.followers} Followers
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity 
                                    style={{
                                        marginRight: 20, borderWidth: 0.5, borderRadius: 20,
                                        width: 90, height: 40, justifyContent: 'center', alignItems: 'center'
                                    }}
                                >
                                    <Text style={{ fontWeight: '300' }}>Follow</Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <IconEntypo name="dots-three-horizontal" size={25} color="#b9bcc1" />
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity>
                                    <Icon name="shuffle" size={25} color="#b9bcc1" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginLeft: 20 }}>
                                    <Image source={require('../../assets/Artist Profile/Icon Button 4.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Popular</Text>
                    </View>
                )}
                renderItem={({ item }) => <ArtistsPopularSongs data={[item]} artist={artist} />}

                ListFooterComponent={() => (
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>About</Text>
                        <Text style={{ fontSize: 13, marginTop: 10, fontWeight: '300' }}>
                            {artist.description}
                        </Text>
                       <Text>Kiet test</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
