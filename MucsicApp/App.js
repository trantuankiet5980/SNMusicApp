import { Image, TouchableOpacity, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LaunchScreen from './src/pages/LaunchScreen';
import HomeAudioListing from './src/pages/HomeAudioListing';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LaunchScreen" component={LaunchScreen} options={{headerShown: false}}/>
        <Stack.Screen name="HomeAudioListing" component={HomeAudioListing} options={({navigation}) => (
          {
            headerTitle: '',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('./assets/Home - Audio Listing/Image 36.png')}
                  style={{ width: 30, height: 30, marginLeft: 10 }}
                />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity>
                  <Icon name="bell" size={30} color="#000" style={{marginRight: 10}} />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 10}}>
                  <Image source={require('./assets/Home - Audio Listing/Avatar 3.png')} />
                </TouchableOpacity>
              </View>
            ),
            headerShadowVisible: false,
          }
        )} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

