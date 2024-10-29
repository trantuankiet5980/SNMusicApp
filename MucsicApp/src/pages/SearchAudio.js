import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import IconEntypo from "react-native-vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import playList from "../../assets/data/PlayList.json";
import trendingAlbums from "../../assets/data/TrendingAlbums.json";

const All = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item, index) => `${item.id}-${index}`}
    renderItem={({ item }) => (
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.title}</Text>
        <Text style={{ fontSize: 14, color: "#666" }}>{item.name}</Text>
      </View>
    )}
  />
);

const Tracks = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;
const Albums = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;
const Artists = () => <View style={{ flex: 1, backgroundColor: "#673ab7" }} />;

const normalizeData = () => {
  const normalizedPlayList = playList.map((item) => ({
    id: item.id,
    image: item.artwork,
    name: item.artist,
    title: item.title,
    views: item.views,
    time: item.time,
    followers: null,
  }));

  const normalizedTrendingAlbums = trendingAlbums.map((item) => ({
    id: item.id,
    image: item.image,
    name: item.name,
    title: item.title,
    views: null,
    time: null,
    followers: item.followers,
  }));

  return [...normalizedPlayList, ...normalizedTrendingAlbums].sort((a, b) =>
    a.title.localeCompare(b.title)
  );
};

export default function SearchAudio() {
  const [isFocused, setIsFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "tracks", title: "Tracks" },
    { key: "albums", title: "Albums" },
    { key: "artists", title: "Artists" },
  ]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const combinedData = normalizeData();
    setData(combinedData);
  }, []);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "all":
        return <All data={data} />;
      case "tracks":
        return <Tracks />;
      case "albums":
        return <Albums />;
      case "artists":
        return <Artists />;
      default:
        return null;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        backgroundColor: "transparent",
        elevation: 0,
        shadowOpacity: 0,
      }}
      renderLabel={({ route, focused }) => (
        <Text style={{ color: focused ? "#007AFF" : "#333" }}>{route.title}</Text>
      )}
      indicatorStyle={{ backgroundColor: "#007AFF" }}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          margin: 20,
          borderWidth: isFocused ? 1 : 0.7,
          borderColor: isFocused ? "#007AFF" : "#333",
          justifyContent: "space-between",
          borderRadius: 50,
          alignItems: "center",
        }}
      >
        <TextInput
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{ width: "80%", height: 40, marginLeft: 20 }}
          placeholder="Search"
        />
        <IconEntypo
          style={{ marginRight: 20 }}
          name="magnifying-glass"
          size={25}
          color="#b8bdc1"
        />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{}}
      />
    </SafeAreaView>
  );
}
