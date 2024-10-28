import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, Image, FlatList } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";

export const ArtistsPopularSongs = ({ data, artist }) => {
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={{marginLeft: 20, marginRight: 20, flexDirection: "row", marginBottom: 20, alignItems: 'center', justifyContent: 'space-between'}}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 70, height: 70, borderRadius: 10 }}
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: "300" }}>
                  {item.title}
                </Text>
                <Text>{artist.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <IconEntypo
                    name="controller-play"
                    size={20}
                    color="#b9bcc1"
                  />
                  <Text>{item.views}</Text>
                  <IconEntypo name="dot-single" size={25} color="#b9bcc1" />
                  <Text>{item.time}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity>
              <IconEntypo name="dots-three-horizontal" size={25} color="#b9bcc1" />
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};
