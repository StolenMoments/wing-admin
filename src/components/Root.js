import React from "react";
import Route from "react-router-dom/es/Route";
import AdminMain from "./Admin/AdminMain";
import ArtistRegisterPage from "./Admin/ArtistRegister/ArtistRegisterPage";
import MusicRegisterPage from "./Admin/MusicRegister/MusicRegisterPage";
import AlbumRegisterPage from "./Admin/AlbumRegister/AlbumRegisterPage";

const Root = () => {
    return (
        <>
            <Route exact path="/" component={AdminMain}/>
            <Route exact path="/artistRegister" component={ArtistRegisterPage}/>
            <Route exact path="/albumRegister" component={AlbumRegisterPage}/>
            <Route exact path="/musicRegister" component={MusicRegisterPage}/>
        </>
    )
};

export default Root