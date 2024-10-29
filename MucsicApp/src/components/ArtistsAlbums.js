import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, FlatList } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";

export const ArtistsAlbums = ({ data, artist }) => {
  return (
    <FlatList
      data={data}
      horizontal={true}
      renderItem={({ item }) => {
        return (
          <View style={{marginBottom: 20, marginTop: 10, marginRight: 20}}>
            <Image style={{width: 120, height: 130, borderRadius: 5}} source={{uri: item.image}} />
            <Text style={{fontWeight: '500'}}>{item.title}</Text>
            <Text style={{fontWeight: '300'}}>{artist.name}</Text>
          </View>
        );
      }}
    />
  );
};
