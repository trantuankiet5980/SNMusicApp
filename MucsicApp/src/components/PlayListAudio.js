import { FlatList, Image, Text, View} from "react-native"
import playList from "..//../assets/data/PlayList.json"
import IconEntypo from "react-native-vector-icons/Entypo";
import { TouchableOpacity } from "react-native";

export const PlayListAudio = () => {
    return (
        <FlatList
        data={playList}
        contentContainerStyle={{paddingBottom: 100}}
        renderItem={({item}) => <PlayListItem item={item} />}
        />
    )
}
const PlayListItem = ({item}) => {
    return (
        <View style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
                <View>
                    <Image style={{width: 70, height: 70, borderRadius: 10}} source={{uri: item.artwork}} />
                </View>
                <View style={{justifyContent: 'space-between', marginLeft: 10}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.artist}</Text>
                    <Text style={styles.font}>{item.title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <IconEntypo style={{fontWeight: '300'}} name="controller-play" size={18} />
                        <Text style={styles.font}>{item.views}M</Text>
                        <IconEntypo style={{fontWeight: '300'}} name="dot-single" size={22} />
                        <Text style={styles.font}>{item.time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <IconEntypo name="dots-three-horizontal" size={20} />
            </TouchableOpacity>
        </View>
       
    )
}

const styles = {
    font: {
        fontSize: 13,
        fontWeight: '300'
    }
}