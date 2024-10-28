import React from "react";
import { FlatList, Image, Text, TouchableOpacity } from "react-native";
import TrendingAlbums from '../../assets/data/TrendingAlbums.json';

export const TrendingAlbumList = () => {
  return (
    <FlatList
      data={TrendingAlbums}
      keyExtractor={(item) => item.id}
      horizontal={true}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 130, height: 130, borderRadius: 10 }}
            />
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.title}</Text>
            <Text style={{ fontWeight: "300" }}>{item.name}</Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};