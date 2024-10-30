import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
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
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: item.category === "artists" ? 50 : 10,
            }}
            source={{ uri: item.image }}
          />
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}
            >
              {item.title}
            </Text>
            <Text style={{ fontSize: 14, color: "#666", marginBottom: 10 }}>
              {item.name}
            </Text>
            {item.category === "album" ? null : item.category === "tracks" || // Kiểm tra nếu là album
              item.category === "popular" ? (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <IconEntypo name="controller-play" size={20} color="#b9bcc1" />
                <Text style={{ color: "#666" }}>{item.views}</Text>
                <IconEntypo name="dot-single" size={25} color="#b9bcc1" />
                <Text style={{ color: "#666" }}>{item.time}</Text>
              </View>
            ) : (
              <View>
                <Text style={{ color: "#666" }}>
                  {item.followers} Followers
                </Text>
              </View>
            )}
          </View>
        </View>
        {item.category === "artists" ? (
          <TouchableOpacity
            style={{
              borderWidth: 0.5,
              borderRadius: 20,
              width: 90,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "300" }}>Follow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={{ marginRight: 10 }}>
            <IconEntypo
              name="dots-three-horizontal"
              size={25}
              color="#b9bcc1"
            />
          </TouchableOpacity>
        )}
      </View>
    )}
  />
);

const Tracks = () => <View style={{ flex: 1, backgroundColor: "red" }} />;
const Albums = () => <View style={{ flex: 1, backgroundColor: "yellow" }} />;
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
    category: "tracks",
  }));

  const normalizedTrendingAlbums = trendingAlbums.flatMap((item) => {
    const mainItem = {
      id: item.id,
      image: item.image,
      name: item.name,
      title: item.title,
      views: null,
      time: null,
      followers: item.followers,
      category: "artists",
    };

    const popularItems = item.populars
      ? item.populars.map((popular) => ({
          id: `${item.id}-${popular.title}`,
          image: popular.image,
          title: popular.title,
          name: item.name,
          time: popular.time,
          views: popular.views,
          category: "popular",
        }))
      : [];

    const albumItems = item.albums
      ? item.albums.map((album) => ({
          id: `${item.id}-${album.title}`,
          image: album.image,
          name: item.name,
          title: album.title,
          category: "album",
        }))
      : [];

    return [mainItem, ...popularItems, ...albumItems];
  });

  return [...normalizedPlayList, ...normalizedTrendingAlbums];
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
        <Text style={{ color: focused ? "#007AFF" : "#333" }}>
          {route.title}
        </Text>
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
