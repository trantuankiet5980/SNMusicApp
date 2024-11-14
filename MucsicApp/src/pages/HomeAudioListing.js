import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { TrendingAlbumList } from "../components/TrendingAlbumList";
import { PopularArtistsList } from "../components/PopularArtistsList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";

const USER_ID = "31htox2esjowkcxeewk5gcd74ija";

export default function HomeAudioListing({ navigation, route }) {
  
  const [greeting, setGreeting] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 0 && hour < 10) {
        setGreeting("Good Morning");
      } else if (hour >= 10 && hour < 18) {
        setGreeting("Good Afternoon");
      } else {
        setGreeting("Good Evening");
      }
    };
    updateGreeting();
    const interval = setInterval(updateGreeting, 60000);
    return () => clearInterval(interval);
  }, []);
  const getProlife = async () => {
    const access_token = await AsyncStorage.getItem("access_token");
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/users/${USER_ID}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProlife();
  }, []);
  console.log("user: " + user);
  if (user === null) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30 }}>Loading user data...</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LaunchScreenPremium")}
          >
            <Image
              style={{ marginLeft: 20 }}
              source={require("../../assets/Home - Audio Listing/Image 36.png")}
            />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity>
              <Icon name="bell" size={30} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                }}
                //   source={require("../../assets/Home - Audio Listing/Image 36.png")}
                source={{ uri: user.images[0]?.url }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView style={{ marginTop: 20 }}>
          <View style={{ marginLeft: 25, marginRight: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "200" }}>{greeting},</Text>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              {user.display_name}
            </Text>
            <View
              style={{
                flexDirection: "row",
                borderWidth: 0.3,
                marginTop: 15,
                alignItems: "center",
                borderRadius: 30,
              }}
            >
              <Icon
                name="search"
                size={20}
                color="#000"
                style={{ padding: 12 }}
              />
              <TextInput
                placeholder="What you want to listen to"
                style={{ fontSize: 17, fontWeight: "200" }}
              />
            </View>
          </View>
          {/* Suggestions for you */}
          <View style={{ marginLeft: 25, marginTop: 50 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Suggestions for you
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Image
                  source={require("../../assets/Home - Audio Listing/Container 26.png")}
                />
                <Image
                  source={require("../../assets/Home - Audio Listing/Container 27.png")}
                  style={{ marginLeft: 20 }}
                />
              </View>
            </ScrollView>
          </View>
          {/* Charts */}
          <View style={{ marginLeft: 25, marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 20,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>Charts</Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 14, fontWeight: "200" }}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                style={{marginRight: 15}}
                onPress={() =>
                  navigation.navigate("PlayListDetailsAudio", {
                    name: "Top 50 - Việt Nam",
                  })
                }
              >
                <LinearGradient
                  colors={["#FF0000", "#800080", "#FFD700"]}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={{
                    width: 150,
                    height: 140,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    Top 50 - Việt Nam
                  </Text>
                </LinearGradient>
                <Text style={{ fontSize: 15, fontWeight: "200", width: 150}}>
                  Daily chart-toppers update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginRight: 15}}
                onPress={() =>
                  navigation.navigate("PlayListDetailsAudio", {
                    name: "Top 50 - Global",
                  })
                }
              >
                <LinearGradient
                  colors={['#0000FF', '#800080', '#FFFFFF']}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={{
                    width: 150,
                    height: 140,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    Top 50 - Global
                  </Text>
                </LinearGradient>
                <Text style={{ fontSize: 15, fontWeight: "200", width: 150}}>
                  Daily chart-toppers update
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PlayListDetailsAudio", {
                    name: "Top 50 - Trending",
                  })
                }
              >
                <LinearGradient
                  colors={['#0000FF', '#FFFFFF', '#800080']}
                  start={[0, 0]}
                  end={[1, 1]}
                  style={{
                    width: 150,
                    height: 140,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    Top 50 - Trending
                  </Text>
                </LinearGradient>
                <Text style={{ fontSize: 15, fontWeight: "200", width: 150}}>
                  Daily chart-toppers update
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
          {/* Trending albums */}
          <View style={{ marginLeft: 25, marginTop: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 20,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Trending albums
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 14, fontWeight: "200" }}>See all</Text>
              </TouchableOpacity>
            </View>
            <TrendingAlbumList />
          </View>
          {/* Popular artists */}
          <View style={{ marginLeft: 25, marginTop: 20, marginBottom: 50 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginRight: 20,
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Popular artists
              </Text>
              <TouchableOpacity>
                <Text style={{ fontSize: 14, fontWeight: "200" }}>See all</Text>
              </TouchableOpacity>
            </View>
            <PopularArtistsList navigation={navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
