import React from "react";
import { FlatList, Image, Text, View, TouchableOpacity } from "react-native";
import playList from "../../assets/data/PlayList.json";

export const FeedAudioListing = ({ data }) => {
    return (
        <FlatList
            data={data}
            contentContainerStyle={{ paddingBottom: 30 }}
            renderItem={({ item }) => (
                <FeedAudioItem item={item} />
            )}
            keyExtractor={(item) => item.id}
        />
    );
}
