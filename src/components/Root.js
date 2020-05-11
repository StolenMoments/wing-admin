import React from "react";
import { Route } from "react-router-dom";
import AdminMain from "./AdminMain";
import ArtistRegisterPage from "./Page/Artist/ArtistRegisterPage";
import MusicRegisterPage from "./Page/Music/MusicRegisterPage";
import AlbumRegisterPage from "./Page/Album/AlbumRegisterPage";
import CheckTemplate from "./Template/CheckTemplate";

const Root = () => {
    return (
        <>
            <Route exact path="/" component={AdminMain}/>
            <Route exact path="/artistRegister" component={ArtistRegisterPage}/>
            <Route exact path="/albumRegister" component={AlbumRegisterPage}/>
            <Route exact path="/musicRegister" component={MusicRegisterPage}/>
            <Route exact path="/artistCheck" component={CheckTemplate}/>
        </>
    )
};

export default Root