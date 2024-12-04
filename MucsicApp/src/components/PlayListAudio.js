import React, { useState, useEffect } from "react";
import { FlatList, Image, Text, View, TouchableOpacity } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import playList from "../../assets/data/PlayList.json";

const PLAYLIST_ID = "37i9dQZEVXbLdGSmz6xilI";

export const PlayListAudio = ({ onItemPress }) => {
  // Map the playlist data to include the actual audio file paths
  const mappedPlaylist = playList.map(item => ({
      ...item,
      // Keep the original url reference instead of trying to require it dynamically
      url: item.url
  }));

  return (
      <FlatList
          data={mappedPlaylist}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
              <PlayListItem item={item} onItemPress={onItemPress} />
          )}
          keyExtractor={(item) => item.id}
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
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
                  <Text style={styles.font}>{item.artist}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <IconEntypo style={{ fontWeight: '300' }} name="controller-play" size={18} />
                      <Text style={styles.font}>{item.views}</Text>
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
