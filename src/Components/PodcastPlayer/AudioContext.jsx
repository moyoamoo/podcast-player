import { createContext, createRef, useContext } from "react";
const AudioContext = createContext();
const audioRef = createRef();

export const AudioContextProvider = ({ children }) => {
  return (
    <AudioContext.Provider value={audioRef}>{children}</AudioContext.Provider>
  );
};

export const useAudioContext = () => useContext(AudioContext);