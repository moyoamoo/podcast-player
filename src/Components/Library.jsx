import React from 'react';
import LibraryResults from './LibraryResults';
import { store } from '../redux/store';
import { getLibrary } from "../redux/librarySlice";

const Library  = () => {
    const userLibrary = JSON.parse(localStorage.getItem("userLibrary"));
    store.dispatch(getLibrary(userLibrary))

    return ( <><h1>My Library</h1>
    <input type='text' placeholder='Search Library'/>
    <LibraryResults/></>);
}
 
export default Library ;