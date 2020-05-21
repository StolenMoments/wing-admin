import React, { useCallback, useState } from "react";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import API_URL from "../../Constant/API_URL";
import AlbumCheckResultTable from "./AlbumCheckResultTable";

const AlbumCheckForm = ({ inputs, setInputs, setExistCheck, setPopUp }) => {
    const [albums, setAlbums] = useState([]);

    const [input, setInput] = useState("");

    const getAlbums = (name) => {
        axios.get(API_URL + "/api/album", {
            params: {
                name: name
            }
        }).then(res => {
            setAlbums(res.data)
            if (Object.keys(res.data).length === 0) throw Error("검색 결과가 없습니다")
        }).catch(err => alert(err));
    };

    const onChange = useCallback(e => setInput(e.target.value), []);

    const onEnterPress = e => {
        if (e.key === "Enter")
            getAlbums(input);
    }

    return (
        <div>
            <h2>앨범 정보 찾기</h2>
            <TextField label="앨범 이름 입력" value={input} onChange={onChange} onKeyPress={onEnterPress}/>
            <Button variant="contained" onClick={() => getAlbums(input)}>
                검색하기
            </Button>
            <br/>
            <Button variant="contained"
                    onClick={() => {
                        setInputs({
                            ...inputs,
                            "albumId": 0
                        })
                        setExistCheck(true);
                        setPopUp();
                    }}
            >
                신규생성(동명인 경우)
            </Button>
            <AlbumCheckResultTable albums={albums}
                                   inputs={inputs}
                                   setInputs={setInputs}
                                   setExistCheck={setExistCheck}
                                   setPopUp={setPopUp}
            />

        </div>
    )
};

export default AlbumCheckForm