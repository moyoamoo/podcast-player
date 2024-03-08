import React from "react";
import "./Components/CSS/generic.css";
import Search from "./Components/Search";
import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import Episodes from "./Components/Episodes";
import Footer from "./Components/Footer";
import Index from "./Components/Library/Index";
import { useEffect } from "react";
import { store } from "./redux/store";
import { useDispatch, useSelector } from "react-redux";
import { selectMessage, setMessage } from "./redux/librarySlice";
import { ToastContainer, toast } from "react-toastify";
import Library from "./Components/Library/Library";

const App = () => {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!message) return;
    console.log(message);
    toast(message);

    setTimeout(() => {
      dispatch(setMessage(""));
    }, 3000);
  }, [message]);

  return (
    <>
      <ToastContainer />

      <Header />
      <Routes>
        <Route path="search" element={<Search />} />
        <Route path="library" element={<Library />} />
        <Route path="/episodes/:id" element={<Episodes />} />
        <Route path="/" element={<Index />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
