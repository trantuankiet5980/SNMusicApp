import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, FlatList } from "react-native";

const DATA = [
    {id: 1, title: "Playlists"},
    {id: 2, title: "Artists"}, 
    {id: 3, title: "Albums"},
    {id: 4, title: "Tracks"},
    {id: 5, title: "Songs"},
]

export default function MyLibrary() {
    const ListItem = ({item}) => (
        <TouchableOpacity style={{
            marginHorizontal: 5,
            borderRadius: 30,
            backgroundColor: '#f0f0f0',
            width: 100,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Text style={{fontSize: 16}}>{item.title}</Text>
        </TouchableOpacity>
    );
    const renderItem = ({item}) => <ListItem item={item} />;
    return (
        <View style={{backgroundColor: "#fff", flex: 1}}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{padding: 10}}
            />  
        </View>
    );
}