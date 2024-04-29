import React from "react";
import "./Components/CSS/generic.css";
import Search from "./Components/Search/Search";
import Header from "./Components/Header/Header";
import { Route, Routes } from "react-router-dom";
import Episodes from "./Components/Episodes/Episodes";
import Footer from "./Components/Footer";
import Index from "./Components/Library/Index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMessage, setMessage } from "./redux/librarySlice";
import { ToastContainer, toast } from "react-toastify";
import Library from "./Components/Library/Library";
import Queue from "./Components/Queue/Queue";
import Discover from "./Components/Discover/Discover";
import PodcastPlayer from "./Components/FullPodcastPlayer/PodcastPlayer";
import { getRandom } from "./utils";
import ChangePassword from "./Components/Library/ChangePassword";

const App = () => {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!message) return;
    console.log(message);
    toast(message);

    setTimeout(() => {
      dispatch(setMessage(""));
    }, 3000);
  }, [message]);

  useEffect(() => {
    if (token) {
      return;
    }
    const unique = localStorage.getItem("unique");
    if (!unique) {
      localStorage.setItem("unique", getRandom(32));
    }
  }, []);

  return (
    <>
      <ToastContainer />

      <Header />

      <Routes>
        <Route path="search" element={<Search />} />
        <Route path="library" element={token ? <Library /> : <Index />} />
        <Route path="queue" element={<Queue />} />
        <Route path="discover" element={<Discover />} />
        <Route path="/episodes/:id" element={<Episodes />} />
        <Route path="/" element={<Index />} />
        <Route path="playing" element={<PodcastPlayer />} />
        <Route
          path="update_account"
          element={token ? <ChangePassword /> : <Index />}
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
