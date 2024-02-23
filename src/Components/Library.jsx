import React from 'react';
import LibraryResults from './LibraryResults';
import { store } from '../redux/store';
import { getLibrary } from "../redux/librarySlice";

const Library  = () => {
    const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
    console.log(userLibrary)
    store.dispatch(getLibrary(userLibrary))
    return ( <><h1>My Library</h1>
    <LibraryResults/></>);
}
 
export default Library ;