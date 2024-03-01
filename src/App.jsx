import React from "react";
import "./Components/CSS/generic.css";
import Search from "./Components/Search";
import Library from "./Components/Library";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Episodes from "./Components/Episodes";
import Footer from "./Components/Footer";
import Index from "./Components/Library/Index";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="search" element={<Search />} />
        <Route path="library" element={<Library />} />
        <Route path="/episodes/:id" element={<Episodes />} />
        <Route path="/" element={<Index/>} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
