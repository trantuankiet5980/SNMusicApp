import { Image, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LaunchScreen from "./src/pages/LaunchScreen";
import HomeAudioListing from "./src/pages/HomeAudioListing";
import IconFeather from "react-native-vector-icons/Feather";
import TabNavigator from "./src/navigation/TabNavigator";
import PlayListDetailsAudio from "./src/pages/PlayListDetailsAudioListing";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LaunchScreen"
          component={LaunchScreen}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
