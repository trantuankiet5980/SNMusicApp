import {Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconEntypo from "react-native-vector-icons/Entypo";

export default function SubcritionPlans({navigation}) {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <Image style={{width: '100%', height: 900, position: 'absolute', top: 0}} source={require('../../assets/Subscription Plans/Image 116.png')} />
            <Text style={{fontSize: 35, fontWeight: 'bold', color: '#fff', marginTop: 70}}>Unlimited</Text>
            <Text style={{fontSize: 35, fontWeight: 'bold', color: '#fff'}}>music selections</Text>
            <ScrollView 
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
                snapToInterval={340}
                decelerationRate="fast"
                contentContainerStyle={{paddingHorizontal: 40, marginTop: -120}}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: 330, height: 400, backgroundColor: '#fff', borderRadius: 10, marginRight: 20}}>
                        <View style={{padding: 20}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>Premium</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center'}}>
                                <View style={{backgroundColor: '#f0f0f0', padding: 5, borderRadius: 20}}><Text style={{fontSize: 15, color: 'purple'}}>Free for 1 month</Text></View>
                                <Text style={{fontSize: 17, color: '#000', fontWeight: 'bold'}}>$12.99/month</Text>
                            </View>
                            <View style={{marginTop: 20}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Ad-free listening</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10  }}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Download to listen offline</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Access full catalog Premium</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>High quality audio</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Cancel anytime</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'HomeAudioListing' })} style={{backgroundColor: '#000', width: '80%', alignItems: 'center', padding: 10, borderRadius: 30, marginTop: 20}}>
                                <Text style={{color: '#fff', fontSize: 18}}>Subscribe now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{width: 330, height: 400, backgroundColor: '#fff', borderRadius: 10, marginRight: 20}}>
                        <View style={{padding: 20}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>Premium</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center'}}>
                                <View style={{backgroundColor: '#f0f0f0', padding: 5, borderRadius: 20}}><Text style={{fontSize: 15, color: 'purple'}}>Free for 6 month</Text></View>
                                <Text style={{fontSize: 17, color: '#000', fontWeight: 'bold'}}>$69.99/month</Text>
                            </View>
                            <View style={{marginTop: 20}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Ad-free listening</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10  }}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Download to listen offline</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Access full catalog Premium</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>High quality audio</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Cancel anytime</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'HomeAudioListing' })} style={{backgroundColor: '#2ccff3', width: '80%', alignItems: 'center', padding: 10, borderRadius: 30, marginTop: 20}}>
                                <Text style={{color: '#fff', fontSize: 18}}>Subscribe now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{width: 330, height: 400, backgroundColor: '#fff', borderRadius: 10, marginRight: 20}}>
                        <View style={{padding: 20}}>
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>Premium</Text>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center'}}>
                                <View style={{backgroundColor: '#f0f0f0', padding: 5, borderRadius: 20}}><Text style={{fontSize: 15, color: 'purple'}}>Free for 1 year</Text></View>
                                <Text style={{fontSize: 17, color: '#000', fontWeight: 'bold'}}>$149.99/month</Text>
                            </View>
                            <View style={{marginTop: 20}}>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Ad-free listening</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10  }}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Download to listen offline</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Access full catalog Premium</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>High quality audio</Text>
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                    <IconEntypo name="check" size={20} color="green" />
                                    <Text style={{fontSize: 15, color: '#000', marginLeft: 10}}>Cancel anytime</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => navigation.navigate('MainTabs', { screen: 'HomeAudioListing' })} style={{backgroundColor: '#000', width: '80%', alignItems: 'center', padding: 10, borderRadius: 30, marginTop: 20}}>
                                <Text style={{color: '#fff', fontSize: 18}}>Subscribe now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <TouchableOpacity style={{marginTop: -150}}>
                <IconEntypo name="dots-three-horizontal" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 60, marginBottom: 50}} onPress={() => navigation.navigate('MainTabs', { screen: 'HomeAudioListing' })}>
                <Text style={{color: '#fff', fontSize: 18}}>Back home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}