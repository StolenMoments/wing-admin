import React, { useState } from "react";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import API_URL from "../../Constant/API_URL";
import ArtistCheckResultTable from "./ArtistCheckResultTable";


const ArtistCheckForm = ({ inputs, setInputs, setExistCheck, setPopUp}) => {
    // 받아온 아티스트 정보 배열 State
    const [artists, setArtists] = useState([]);

    // 검색어 State
    const [input, setInput] = useState("");

    const getArtists = (name) => {
        if (name.trim() === "") {
            alert("검색어를 입력하세요")
            return null;
        }

        axios.get(API_URL + "/api/artist", {
            params: {
                name: name
            }
        }).then(res => {
            // 불변성을 어떻게 구현할까?..검색할 때 마다 연속성이 보장되지 않으므로 불변성을 유지할 필요가 없다고 생각...
            setArtists(res.data)
            if (Object.keys(res.data).length === 0) throw Error("검색 결과가 없습니다")
        }).catch(err => alert(err));
    };

    const onChange = e => setInput(e.target.value);
    const onEnterPress = e => {
        if (e.key === "Enter")
            getArtists(input);
    }

    return (
        <div>
            <h2>아티스트 정보 찾기</h2>
            <TextField label="아티스트 이름 입력" value={input} onChange={onChange} onKeyPress={onEnterPress}/>
            <Button style={{width: "10rem"}} variant="contained" onClick={() => getArtists(input)}>
                검색하기
            </Button>
            <br/>
            <Button variant="contained"
                    onClick={() => {
                        setInputs({
                            ...inputs,
                            "artistId": 0
                        })
                        setExistCheck(true);
                        setPopUp();
                    }}>
                신규생성(동명인 경우)
            </Button>
            <ArtistCheckResultTable artists={artists}
                                    inputs={inputs}
                                    setInputs={setInputs}
                                    setExistCheck={setExistCheck}
                                    setPopUp={setPopUp}
            />
        </div>
    )
}
export default ArtistCheckForm