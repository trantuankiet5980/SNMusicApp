import React, { createContext, useState } from 'react';

export const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AudioContext.Provider value={{ selectedItem, setSelectedItem, sound, setSound, isPlaying, setIsPlaying }}>
      {children}
    </AudioContext.Provider>
  );
};
