import React from "react";
import PodcastPlayer from "./PodcastPlayer/PodcastPlayer";
import "./CSS/footer.scss";
import {  AudioContextProvider } from "./PodcastPlayer/AudioContext";

const Footer = () => {
  return (
    <footer>
      <AudioContextProvider>
        <PodcastPlayer />
      </AudioContextProvider>
    </footer>
  );
};

export default Footer;
