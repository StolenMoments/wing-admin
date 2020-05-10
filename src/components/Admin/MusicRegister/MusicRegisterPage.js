import React from 'react'
import MusicRegisterForm from "./MusicRegisterForm";
import RegisterTemplate from "../Template/RegisterTemplate";

const MusicRegisterPage = () => {
    return (
        <RegisterTemplate title="음악 등록 / 수정">
            <MusicRegisterForm />
        </RegisterTemplate>
    )
};

export default MusicRegisterPage