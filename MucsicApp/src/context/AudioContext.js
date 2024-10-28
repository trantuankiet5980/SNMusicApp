import React, { createContext, useState, useRef } from 'react';
import { Audio } from 'expo-av';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const sound = useRef(new Audio.Sound());
    const [isPlaying, setIsPlaying] = useState(false);
    const [playList, setPlayList] = useState([]); // Khởi tạo playList

    const playSound = async (uri) => {
        try {
            await sound.current.loadAsync({ uri });
            await sound.current.playAsync();
            setIsPlaying(true);
        } catch (error) {
            console.error('Error loading sound:', error);
        }
    };

    const pauseSound = async () => {
        try {
            await sound.current.pauseAsync();
            setIsPlaying(false);
        } catch (error) {
            console.error('Error pausing sound:', error);
        }
    };

    const resumeSound = async () => {
        try {
            await sound.current.playAsync();
            setIsPlaying(true);
        } catch (error) {
            console.error('Error resuming sound:', error);
        }
    };

    const stopSound = async () => {
        try {
            await sound.current.stopAsync();
            setIsPlaying(false);
        } catch (error) {
            console.error('Error stopping sound:', error);
        }
    };

    return (
        <AudioContext.Provider value={{ playSound, pauseSound, resumeSound, stopSound, isPlaying, playList, setPlayList }}>
            {children}
        </AudioContext.Provider>
    );
};
