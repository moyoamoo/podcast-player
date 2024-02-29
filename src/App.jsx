import React from "react";
import "./Components/CSS/generic.css";
import Search from "./Components/Search";
import { getPodcastData } from "./apiRequest";
import Library from "./Components/Library";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Episodes from "./Components/Episodes";
import LibraryPodcast from "./Components/LibraryPodcast";
import Footer from "./Components/Footer";

const App = () => {
  getPodcastData();
  return (
    <>
      <Header />
      <Routes>
        <Route path="search" element={<Search />} />
        <Route path="library" element={<Library />} />
        <Route path="/episodes/:id" element={<Episodes/>}/>        
        <Route path="library/podcasts" element={<LibraryPodcast/>}/>
  

      </Routes>
      <Footer/>
    </>
  );
};

export default App;
