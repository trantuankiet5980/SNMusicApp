import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Modal, ScrollView, TextInput } from "react-native";
import Feed from "../../assets/data/Feed.json";
import IconEntypo from "react-native-vector-icons/Entypo";

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
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
                <View style={{ margin: 20, backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
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
                                                    <Text style={{ fontWeight: 'bold', marginRight: 5 }}>
                                                        {reply.nameReply}
                                                    </Text>
                                                    <Text>{reply.contentReply}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {reply.timeReply && (
                                                        <Text style={{ fontSize: 12, color: 'gray', marginRight: 10 }}>
                                                            {reply.timeReply}
                                                        </Text>
                                                    )}
                                                    <TouchableOpacity onPress={() => incrementReplyLike(comment.idInteract, reply.idReply)}>
                                                        <IconEntypo name="heart" size={15} color="black" />
                                                    </TouchableOpacity>
                                                    <Text style={{ fontSize: 12, color: 'black', marginLeft: 5 }}>
                                                        {reply.likeReply} like
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    ))}
                                </View>
                            </View>
                        ))}
                    </ScrollView>

                    {replyingToComment && (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <TextInput
                                style={{ borderWidth: 1, borderRadius: 5, flex: 1, padding: 5 }}
                                placeholder="Write a reply..."
                                value={newReply}
                                onChangeText={handleReplyChange}
                            />
                            <TouchableOpacity onPress={handleReplySubmit}>
                                <Text style={{ color: 'blue', marginLeft: 10 }}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity onPress={onClose} style={{ marginTop: 20, alignSelf: 'center' }}>
                        <Text style={{ color: 'blue' }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const FeedScreen = () => {
    const [feedData, setFeedData] = useState(Feed);
    const [loadingLikes, setLoadingLikes] = useState({});
    const [likeCounts, setLikeCounts] = useState({});
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const incrementLikeCount = (id) => {
        setLoadingLikes({ ...loadingLikes, [id]: true });
        setTimeout(() => {
            setLikeCounts((prevLikes) => ({
                ...prevLikes,
                [id]: (prevLikes[id] || 0) + 1
            }));
            setLoadingLikes({ ...loadingLikes, [id]: false });
        }, 1000);
    };

    const incrementCommentLike = (commentId) => {
        setFeedData((prevFeed) => {
            return prevFeed.map((item) => {
                item.interact[0].commentInteract = item.interact[0].commentInteract.map((comment) => {
                    if (comment.idInteract === commentId) {
                        comment.likeInteract = (comment.likeInteract || 0) + 1;
                    }
                    return comment;
                });
                return item;
            });
        });
    };
    //haldereplylike
    const incrementReplyLike = (commentId, replyId) => {
        setFeedData((prevFeed) => {
            return prevFeed.map((item) => {
                item.interact[0].commentInteract = item.interact[0].commentInteract.map((comment) => {
                    if (comment.idInteract === commentId) {
                        comment.reply = comment.reply.map((reply) => {
                            if (reply.idReply === replyId) {
                                return {
                                    ...reply,
                                    likeReply: (reply.likeReply || 0) + 1,
                                };
                            }
                            return reply;
                        });
                    }
                    return comment;
                });
                return item;
            });
        });
    };


    const handleCommentPress = (id) => {
        const selectedItem = feedData.find((item) => item.id === id);
        setSelectedItemId(id);
        setShowModal(true);
    };

    const handleReplyPress = (commentId, content) => {
        setFeedData((prevFeed) => {
            return prevFeed.map((item) => {
                item.interact[0].commentInteract = item.interact[0].commentInteract.map((comment) => {
                    if (comment.idInteract === commentId) {
                        const newReply = {
                            idReply: Math.random().toString(),
                            nameReply: "User",
                            contentReply: content,
                            imageReply: "../../assets/Feed - Audio Listing/Avatar 4.png",
                        };
                        comment.reply = comment.reply ? [...comment.reply, newReply] : [newReply];
                    }
                    return comment;
                });
                return item;
            });
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={feedData}
                renderItem={({ item }) => (
                    <FeedAudioItem
                        item={item}
                        onItemPress={() => { }}
                        likeCounts={likeCounts}
                        loadingLikes={loadingLikes}
                        incrementLikeCount={incrementLikeCount}
                        onCommentPress={handleCommentPress}
                        incrementCommentLike={incrementCommentLike}
                        onReplyPress={handleReplyPress}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
            />

            <CommentModal
                visible={showModal}
                comments={feedData.find((item) => item.id === selectedItemId)?.interact[0]?.commentInteract || []}
                onClose={() => setShowModal(false)}
                incrementCommentLike={incrementCommentLike}
                onReplyPress={handleReplyPress}
                incrementReplyLike={incrementReplyLike}
            />


        </View>
    );
};

export default FeedScreen;
