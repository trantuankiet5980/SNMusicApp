import { Image, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LaunchScreen from './src/pages/LaunchScreen';
import HomeAudioListing from './src/pages/HomeAudioListing';
import Icon from 'react-native-vector-icons/FontAwesome';
import TabNavigator from './src/navigation/TabNavigator';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} options={{headerShown: false}}/>
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

