import React from "react";
import RegisterTemplate from "../Template/RegisterTemplate";
import AlbumRegisterForm from "./AlbumRegisterForm";

const URI = "http://localhost:8080";
const AlbumRegisterPage = () => {

    return (
        <RegisterTemplate title="앨범 정보 등록 / 수정">
            <AlbumRegisterForm URI={URI}/>
        </RegisterTemplate>
    )

}

export default AlbumRegisterPage