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
import IconFeather from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Audio } from 'expo-av';
import playList from "../../assets/data/PlayList.json";
import trendingAlbums from "../../assets/data/TrendingAlbums.json";
import { audioMapping } from '../../assets/mucsic/AudioMapping';

const ListItem = ({ item, navigation, onTrackPress }) => (
  <TouchableOpacity
    onPress={() => {
      if (item.category === "tracks" || item.category === "popular") {
        onTrackPress(item);
      } else if (item.category === "artists" || item.category === "album") {
        // Find the parent artist data from trendingAlbums
        const artistData = trendingAlbums.find(artist => 
          artist.name === item.name || 
          artist.populars?.some(p => p.title === item.title) ||
          artist.albums?.some(a => a.title === item.title)
        );
        if (artistData) {
          navigation.navigate('ArtistProfile', { artist: artistData });
        }
      }
    }}
  >
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
          {item.category === "album" ? null : item.category === "tracks" ||
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
  </TouchableOpacity>
);

const All = ({ data, navigation, onTrackPress }) => (
  <FlatList
    data={data}
    keyExtractor={(item, index) => `${item.id}-${index}`}
    renderItem={({ item }) => <ListItem item={item} navigation={navigation} onTrackPress={onTrackPress} />}
  />
);

const Tracks = ({ data, navigation, onTrackPress }) => (
  <FlatList
    data={data.filter(item => item.category === "tracks" || item.category === "popular")}
    keyExtractor={(item, index) => `${item.id}-${index}`}
    renderItem={({ item }) => <ListItem item={item} navigation={navigation} onTrackPress={onTrackPress} />}
  />
);

const Albums = ({ data, navigation, onTrackPress }) => (
  <FlatList
    data={data.filter(item => item.category === "album")}
    keyExtractor={(item, index) => `${item.id}-${index}`}
    renderItem={({ item }) => <ListItem item={item} navigation={navigation} onTrackPress={onTrackPress} />}
  />
);

const Artists = ({ data, navigation, onTrackPress }) => (
  <FlatList
    data={data.filter(item => item.category === "artists")}
    keyExtractor={(item, index) => `${item.id}-${index}`}
    renderItem={({ item }) => <ListItem item={item} navigation={navigation} onTrackPress={onTrackPress} />}
  />
);

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
    url: item.url
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

export default function SearchAudio({ navigation }) {
  const [isFocused, setIsFocused] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "tracks", title: "Tracks" },
    { key: "albums", title: "Albums" },
    { key: "artists", title: "Artists" },
  ]);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    const combinedData = normalizeData();
    setData(combinedData);
    setFilteredData(combinedData);
  }, []);

  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false
        });
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    };

    setupAudio();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Filter data when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const playSound = async (audioSource) => {
    try {
      setIsLoading(true);
      
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const soundObject = new Audio.Sound();
      const audioPath = audioMapping[audioSource];
      
      await soundObject.loadAsync(audioPath);
      setSound(soundObject);
      
      await soundObject.playAsync();
      setIsPlaying(true);
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      console.error("Error playing sound:", error);
    }
  };

  const handlePausePress = async () => {
    if (sound && !isLoading) {
      try {
        await sound.pauseAsync();
        setIsPlaying(false);
      } catch (error) {
        console.error("Error pausing sound:", error);
      }
    }
  };

  const handlePlayPress = async () => {
    if (sound && !isLoading) {
      try {
        await sound.playAsync();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error resuming sound:", error);
      }
    }
  };

  const handleTrackPress = (item) => {
    if (!item || isLoading) return;
    setSelectedItem(item);
    playSound(item.url);
  };

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "all":
        return <All data={filteredData} navigation={navigation} onTrackPress={handleTrackPress} />;
      case "tracks":
        return <Tracks data={filteredData} navigation={navigation} onTrackPress={handleTrackPress} />;
      case "albums":
        return <Albums data={filteredData} navigation={navigation} onTrackPress={handleTrackPress} />;
      case "artists":
        return <Artists data={filteredData} navigation={navigation} onTrackPress={handleTrackPress} />;
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
          value={searchQuery}
          onChangeText={setSearchQuery}
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
      {selectedItem && (
        <View style={{ backgroundColor: 'black', height: 80, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.navigate('PlayAnAudio', {mucsicSelected: selectedItem, sound})} style={{ flexDirection: 'row' }}>
            <Image source={{ uri: selectedItem.image }} style={{ width: 50, height: 50, marginRight: 20, marginLeft: 20, borderRadius: 5 }} />
            <View>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>{selectedItem.title}</Text>
              <Text style={{ color: '#fff' }}>{selectedItem.name}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <IconFeather name="heart" size={25} color="#fff" style={{ marginRight: 20 }} />
            {isLoading ? (
              <Text style={{ color: '#fff', marginRight: 20 }}>Loading...</Text>
            ) : isPlaying ? (
              <TouchableOpacity onPress={handlePausePress}>
                <IconFeather name="pause" size={25} color="#fff" style={{ marginRight: 20 }} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handlePlayPress}>
                <IconFeather name="play" size={25} color="#fff" style={{ marginRight: 20 }} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={() => setSelectedItem(null)} style={{ marginRight: 15 }}>
              <IconFeather name="x" size={25} color="#fff" />
            </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
