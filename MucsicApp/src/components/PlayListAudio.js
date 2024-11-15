import React, { useState, useEffect } from "react";
import { FlatList, Image, Text, View, TouchableOpacity } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PLAYLIST_ID = "37i9dQZEVXbLdGSmz6xilI";

export const PlayListAudio = ({ onItemPress }) => {
  const [top50VN, setTop50VN] = useState(null);

  const getData = async () => {
    const accessToken = await AsyncStorage.getItem("access_token");
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setTop50VN(data.items);
    } catch (error) {
      console.error("Error getting top 50 VN:", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //   console.log("top50VN: " + top50VN[0].track.name);
  return (
    <FlatList
      data={top50VN}
      contentContainerStyle={{ paddingBottom: 30 }}
      renderItem={({ item }) => (
        <PlayListItem item={item} onItemPress={onItemPress} />
        
      )}
      // keyExtractor={(item) => item.track.album.id.toString()}
    />
  );
};

const PlayListItem = ({ item, onItemPress }) => {
  return (
    <View
      style={{
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row" }}
        onPress={() => onItemPress(item)}
      >
        <View>
          <Image
            style={{ width: 70, height: 70, borderRadius: 10 }}
            source={{ uri: item.track.album.images[0].url }}
          />
        </View>
        <View style={{ justifyContent: "space-around", marginLeft: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>{item.track.name}</Text>
          <Text style={{fontSize: 14, fontWeight: "400",}}>{item.track.artists[0].name}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <IconEntypo name="heart" size={20} />
      </TouchableOpacity>
    </View>
    
  );
};