import React from 'react'
import RegisterTemplate from "../Template/RegisterTemplate";
import ArtistRegisterForm from "./ArtistRegisterForm";


const ArtistRegisterPage = () => {

    return (
        <RegisterTemplate title="아티스트 정보 등록 / 수정">
            <ArtistRegisterForm />
        </RegisterTemplate>
    )

};

export default ArtistRegisterPage