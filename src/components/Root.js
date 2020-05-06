import React from "react";
import { Route } from "react-router-dom";
import AdminMain from "./Admin/AdminMain";
import ArtistRegisterPage from "./Admin/ArtistRegister/ArtistRegisterPage";
import MusicRegisterPage from "./Admin/MusicRegister/MusicRegisterPage";
import AlbumRegisterPage from "./Admin/AlbumRegister/AlbumRegisterPage";
import CheckTemplate from "./Admin/Template/CheckTemplate";

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