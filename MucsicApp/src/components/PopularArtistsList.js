import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import TrendingAlbums from '../../assets/data/TrendingAlbums.json';

export const PopularArtistsList = ({navigation}) => {
  return (
    <FlatList
      data={TrendingAlbums}
      keyExtractor={(item) => item.id}
      horizontal={true}
      renderItem={({ item }) => {
        return (
          <View style={{ marginRight: 20 , justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate('ArtistProfile', {artist: item})}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 130, height: 130, borderRadius: 70, marginBottom: 10 }}
              />
            </TouchableOpacity>
            <Text style={{ fontWeight: "300", fontSize: 16 }}>{item.name}</Text>
            <TouchableOpacity style={{backgroundColor: 'black', width: 60, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginTop: 10}}>
              <Text style={{color: '#fff'}}>Follow</Text>
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};