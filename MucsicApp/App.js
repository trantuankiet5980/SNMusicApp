import React, { useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LaunchScreen from "./src/pages/LaunchScreen";
import LaunchScreenPremium from "./src/pages/LaunchScreenPremium";
import SubcritionPlans from "./src/pages/SubcritionPlans";
import HomeAudioListing from "./src/pages/HomeAudioListing";
import IconFeather from "react-native-vector-icons/Feather";
import TabNavigator from "./src/navigation/TabNavigator";
import PlayListDetailsAudio from "./src/pages/PlayListDetailsAudioListing";
import PlayAbAudio from "./src/pages/PlayAnAudio";


const Stack = createNativeStackNavigator();
export default function App() {
  const [sound, setSound] = useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LaunchScreen"
          component={LaunchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LaunchScreenPremium"
          component={LaunchScreenPremium}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="SubcritionPlans"
          component={SubcritionPlans}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlayListDetailsAudio"
          component={PlayListDetailsAudio}
          options={{
            headerTitle: "",
            headerStyle: {
              
            },
            headerShadowVisible: false,
            headerRight: () => (
              <TouchableOpacity>
                <IconFeather name="radio" size={30} color="#000" style={{marginRight: 10}} />
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen
          name="PlayAnAudio"
          component={PlayAbAudio}
          options={{ headerShown: false }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
