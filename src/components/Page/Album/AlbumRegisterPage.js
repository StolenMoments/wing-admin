import React from "react";
import RegisterTemplate from "../../Template/RegisterTemplate";
import AlbumRegisterForm from "./AlbumRegisterForm";

const AlbumRegisterPage = () => {

    return (
        <RegisterTemplate title="앨범 정보 등록 / 수정">
            <AlbumRegisterForm/>
        </RegisterTemplate>
    )

}

export default AlbumRegisterPage