import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Modal, ScrollView, TextInput } from "react-native";
import Feed from "../../assets/data/Feed.json";
import IconEntypo from "react-native-vector-icons/Entypo";
import AsyncStorage from '@react-native-async-storage/async-storage';


// Component to render individual audio feed item
const FeedAudioItem = ({ item, onItemPress, likeCounts, loadingLikes, incrementLikeCount, onCommentPress, incrementCommentLike, onReplyPress }) => {
    const likeCount = likeCounts[item.id] || item.interact[0].timInteract || 0;
    const isLoading = loadingLikes[item.id] || false;

    const commentCount = item.interact[0].commentInteract.length;
    const replyCount = item.interact[0].commentInteract.reduce((total, comment) => total + (comment.reply ? comment.reply.length : 0), 0);

    return (
        <View style={{ marginLeft: 20, marginRight: 20, marginTop: 30, flexDirection: 'column', justifyContent: 'space-between' }}>
            {/* Header Section */}
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity>
                    <Image source={require('../../assets/Feed - Audio Listing/mp3.png')} style={{ width: 40, height: 40, borderRadius: 10 }} />
                </TouchableOpacity>
                <View style={{ marginLeft: 10 }}>
                    <TouchableOpacity>
                        <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>{item.artist}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 14, marginRight: 10 }}>{item.posted}</Text>
                        <IconEntypo style={{ color: '#9095a0' }} name="dot-single" size={22} />
                        <Text style={{ color: '#9095a0', fontSize: 14 }}>{item.timePost}</Text>
                    </View>
                </View>
            </View>

            {/* Image and Footer Section */}
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity>
                    <Image
                        style={{ width: 350, height: 350, borderRadius: 10 }}
                        source={{ uri: item.artwork }}
                    />
                </TouchableOpacity>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: 350,
                        height: 70,
                        backgroundColor: 'rgba(159, 70, 13, 0.8)',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        padding: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>
                            {item.title}
                        </Text>
                        <Text style={{ color: 'white', marginBottom: 5 }}>{item.artist}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5, marginRight: 5 }}>
                        <TouchableOpacity onPress={() => onItemPress(item)}>
                            <IconEntypo style={{ fontWeight: '300', color: 'white', fontWeight: 'bold' }} name="controller-play" size={18} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 13, fontWeight: '300', color: 'white' }}>{item.views}</Text>
                        <IconEntypo style={{ fontWeight: '300', color: 'white', fontWeight: 'bold' }} name="dot-single" size={22} />
                        <Text style={{ fontSize: 13, fontWeight: '300', color: 'white' }}>{item.time}</Text>
                    </View>
                </View>
            </View>

            {/* Interaction Buttons */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }}
                        onPress={() => incrementLikeCount(item.id)}
                    >
                        <IconEntypo style={{ marginRight: 5 }} name="heart" size={30} />
                        {isLoading ? (
                            <ActivityIndicator size="small" color="black" />
                        ) : (
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>{likeCount}</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }}
                        onPress={() => onCommentPress(item.id)}
                    >
                        <IconEntypo style={{ marginRight: 5 }} name="message" size={30} />
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>
                            {commentCount}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', marginRight: 20, alignItems: 'center' }}>
                        <IconEntypo style={{ marginRight: 5 }} name="cycle" size={30} />
                        <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>
                            {replyCount}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row', marginRight: 10 }} onPress={() => { }}>
                    <IconEntypo name="dots-three-horizontal" size={20} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

// Modal component to handle displaying comments and replies
const CommentModal = ({ visible, comments, onClose, incrementCommentLike, onReplyPress, incrementReplyLike }) => {
    const [newReply, setNewReply] = useState('');
    const [replyingToComment, setReplyingToComment] = useState(null);

    const handleReplyChange = (text) => {
        setNewReply(text);
    };

    const handleReplySubmit = () => {
        if (newReply.trim()) {
            onReplyPress(replyingToComment, newReply);
            setNewReply(''); // Clear input after submitting
            setReplyingToComment(null); // Close reply input
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '50%',  // Chiều cao modal là nửa màn hình
                    backgroundColor: 'white',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: 20,
                }}>
                    {/* Icon đóng modal */}
                    <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
                        <IconEntypo name="chevron-up" size={24} color="gray" />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Comments</Text>
                    <ScrollView>
                        {comments.map((comment, index) => (
                            <View key={index} style={{ flexDirection: 'row', marginBottom: 15 }}>
                                <Image
                                    source={{ uri: comment.imageInteract }}
                                    style={{ width: 25, height: 25, borderRadius: 20, marginRight: 10 }}
                                />
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontWeight: 'bold', marginRight: 5 }}>{comment.nameInteract}</Text>
                                        <Text>{comment.contentInteract}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                        <Text style={{ color: 'gray', fontSize: 12, marginRight: 5 }}>
                                            {comment.timeInteract}
                                        </Text>

                                        {/* Like Button */}
                                        <TouchableOpacity onPress={() => incrementCommentLike(comment.idInteract)}>
                                            <IconEntypo name="heart" size={15} color="black" />
                                        </TouchableOpacity>
                                        <Text style={{ marginLeft: 5 }}>{comment.likeInteract} like</Text>

                                        {comment.timeLike && (
                                            <Text style={{ marginLeft: 10, fontSize: 12, color: 'black' }}>
                                                Liked at {comment.timeLike}
                                            </Text>
                                        )}

                                        {/* Reply Button */}
                                        <TouchableOpacity
                                            onPress={() => {
                                                setReplyingToComment(comment.idInteract); // Set comment to reply to
                                            }}
                                            style={{ marginLeft: 10 }}
                                        >
                                            <Text style={{ color: 'blue', fontSize: 12 }}>Reply</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* Display Replies */}
                                    {comment.reply && comment.reply.map((reply, idx) => (
                                        reply.contentReply && (
                                            <View key={idx} style={{ marginTop: 10, marginLeft: 20 }}>

                                                <View style={{ flexDirection: 'row' }}>
                                                    <Image
                                                        source={{ uri: reply.imageReply }}
                                                        style={{ width: 20, height: 20, borderRadius: 15, marginRight: 10 }}
                                                    />
                                                    <Text style={{ fontWeight: 'bold' }}>{reply.nameReply}</Text>
                                                    <Text>{reply.contentReply}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                                                    <Text style={{ color: 'gray', fontSize: 12 }}>
                                                        {reply.timeReply}
                                                    </Text>
                                                    <TouchableOpacity onPress={() => incrementReplyLike(reply.idReply)}>
                                                        <IconEntypo name="heart" size={15} color="black" />
                                                    </TouchableOpacity>
                                                    <Text style={{ marginLeft: 5 }}>{reply.likeReply} like</Text>
                                                </View>
                                            </View>
                                        )
                                    ))}
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                    {/* Reply Input */}
                    {replyingToComment !== null && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <TextInput
                                value={newReply}
                                onChangeText={handleReplyChange}
                                placeholder="Write a reply..."
                                style={{
                                    flex: 1, // Chiếm toàn bộ không gian còn lại
                                    borderColor: '#ccc',
                                    borderWidth: 1,
                                    padding: 8,
                                    borderRadius: 5,
                                    marginRight: 10, // Khoảng cách giữa TextInput và nút Submit
                                }}
                            />
                            <TouchableOpacity onPress={handleReplySubmit} style={{ padding: 8, backgroundColor: 'blue', borderRadius: 5 }}>
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const getLikesFromStorage = async () => {
    try {
        const likes = await AsyncStorage.getItem('likeCounts');
        return likes ? JSON.parse(likes) : {};
    } catch (e) {
        console.error("Error getting likes from storage", e);
        return {};
    }
};

// Function to save likes to AsyncStorage
const saveLikesToStorage = async (likeCounts) => {
    try {
        await AsyncStorage.setItem('likeCounts', JSON.stringify(likeCounts));
    } catch (e) {
        console.error("Error saving likes to storage", e);
    }
};

// Function to get comments from AsyncStorage
const getCommentsFromStorage = async () => {
    try {
        const comments = await AsyncStorage.getItem('comments');
        return comments ? JSON.parse(comments) : {};
    } catch (e) {
        console.error("Error getting comments from storage", e);
        return {};
    }
};

// Function to save comments to AsyncStorage
const saveCommentsToStorage = async (comments) => {
    try {
        await AsyncStorage.setItem('comments', JSON.stringify(comments));
    } catch (e) {
        console.error("Error saving comments to storage", e);
    }
};



// Main Feed Screen Component
const FeedScreen = () => {
    const [likeCounts, setLikeCounts] = useState({});
    const [loadingLikes, setLoadingLikes] = useState({});
    const [commentsModalVisible, setCommentsModalVisible] = useState(false);
    const [currentComments, setCurrentComments] = useState([]);

    // Load the persisted likes and comments when the component mounts
    useEffect(() => {
        const loadLikesAndComments = async () => {
            const likes = await getLikesFromStorage();
            setLikeCounts(likes);
    
            const comments = await getCommentsFromStorage();
            setCurrentComments(comments);
        };
        loadLikesAndComments();
    }, []);

    // Save the like counts and comments when they change
    useEffect(() => {
        saveLikesToStorage(likeCounts);
        saveCommentsToStorage(currentComments);
    }, [likeCounts, currentComments]);

    const incrementLikeCount = (id) => {
        if (loadingLikes[id]) return; // Prevent multiple clicks while loading
        setLoadingLikes((prev) => ({ ...prev, [id]: true }));

        setTimeout(() => {
            setLikeCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
            setLoadingLikes((prev) => ({ ...prev, [id]: false }));
        }, 1000);
    };

    const onCommentPress = (id) => {
        const selectedPost = Feed.find(item => item.id === id);
        setCurrentComments(selectedPost?.interact[0].commentInteract || []);
        console.log('Setting modal visible:', true); // Add logging
        setCommentsModalVisible(true);
    };

    const incrementCommentLike = async (commentId) => {
        setCurrentComments(prevComments => {
            const updatedComments = prevComments.map(comment =>
                comment.idInteract === commentId
                    ? { ...comment, likeInteract: comment.likeInteract + 1 }
                    : comment
            );
    
            // Save the updated comments with the new like counts to AsyncStorage
            saveCommentsToStorage(updatedComments);
            return updatedComments;
        });
    };
    
    const onReplyPress = (commentId, content) => {
        setCurrentComments(prevComments =>
            prevComments.map(comment =>
                comment.idInteract === commentId
                    ? {
                        ...comment,
                        reply: [
                            ...(comment.reply || []),
                            {
                                idReply: new Date().getTime(),
                                contentReply: content,
                                timeReply: 'Just now',
                                likeReply: 0,
                                imageReply: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxPeUDB133aJoZXik3FwT4t18g2WRx_U-8_Q&s',
                                nameReply: 'User Name'
                            }
                        ]
                    }
                    : comment
            )
        );
    };

    const incrementReplyLike = (replyId) => {
        setCurrentComments(prevComments =>
            prevComments.map(comment =>
                comment.reply
                    ? {
                        ...comment,
                        reply: comment.reply.map(reply =>
                            reply.idReply === replyId
                                ? { ...reply, likeReply: reply.likeReply + 1 }
                                : reply
                        )
                    }
                    : comment
            )
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={Feed}
                renderItem={({ item }) => (
                    <FeedAudioItem
                        item={item}
                        likeCounts={likeCounts}
                        loadingLikes={loadingLikes}
                        incrementLikeCount={incrementLikeCount}
                        onCommentPress={onCommentPress}
                        incrementCommentLike={incrementCommentLike}
                        onReplyPress={onReplyPress}
                    />
                )}
                keyExtractor={(item) => item.id}
            />
            <CommentModal
                visible={commentsModalVisible}
                comments={currentComments}
                onClose={() => setCommentsModalVisible(false)}
                incrementCommentLike={incrementCommentLike}
                onReplyPress={onReplyPress}
                incrementReplyLike={incrementReplyLike}
            />
        </View>
    );
};
export default FeedScreen;
