import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [sound, setSound] = useState(null);

  return (
    <AudioContext.Provider value={{ sound, setSound }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
