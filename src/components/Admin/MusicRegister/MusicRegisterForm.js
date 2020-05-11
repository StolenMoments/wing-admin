import React, { useCallback, useState } from 'react'
import axios from "axios";
import 'react-calendar/dist/Calendar.css';
import { Button, TextField } from "@material-ui/core";
import CheckTemplate from "../Template/CheckTemplate";
import DataValidation from "../Function/DataValidation";
import MusicCheckForm from "./MusicCheckForm";
import RegisterFormStyledDiv from "../Template/RegisterFormStyledDiv";
import API_URL from "../Constant/API_URL";
import ArtistCheckForm from "../ArtistRegister/ArtistCheckForm";


const MusicRegisterForm = () => {

    // popup toggle
    const [popUp1, setPopUp1] = useState(true);
    const [popUp2, setPopUp2] = useState(true);
    const togglePopUp = (popUp, setPopUp) => setPopUp(!popUp);

    // 중복 체크 여부
    const [existCheck, setExistCheck] = useState(false);

    // 수정 true, 신규 false
    let updateFlag = false;


    const [musicId, setMusicId] = useState(0);
    const [albumId, setAlbumId] = useState(0);
    const [artistList, setArtistList] = useState([]);
    const [musicName, setMusicName] = useState("");
    const [musicGenre, setMusicGenre] = useState("");
    const [fileUri, setFileUri] = useState("");
    const [lyrics, setLyrics] = useState("");
    const [trackNumber, setTrackNumber] = useState("");


    const [singers, setSingers] = useState("");
    const setList = {
        albumId: setAlbumId,
        musicId: setMusicId,
        musicName: setMusicName,
        musicGenre: setMusicGenre,
        artistList: setArtistList,
        fileUri: setFileUri,
        lyrics: setLyrics,
        trackNumber: setTrackNumber,
        singers: setSingers
    };

    const onChangeMusicName = useCallback(e => { setMusicName(e.target.value); }, []);
    const onChangeMusicGenre = useCallback(e => { setMusicGenre(e.target.value); }, []);
    const onChangeFileUri = useCallback(e => { setFileUri(e.target.value); }, []);
    const onChangeLyrics = useCallback(e => { setLyrics(e.target.value); }, []);
    const onChangeTrackNumber = useCallback(e => { setTrackNumber(e.target.value); }, []);


    const PostMusic = () => {
        if (!existCheck) {
            alert("음악 중복 체크를 해주세요");
            return;
        }

        const data = {
            artistList: artistList,
            musicName: musicName,
            musicGenre: musicGenre,
            fileUri: fileUri,
            lyrics: lyrics,
            trackNumber: trackNumber,
            params: {
                albumId: albumId
            }
        };


        if (DataValidation(data)) return;

        if (Number(musicId) > 0)
            updateFlag = true;


        if (!updateFlag) {
            data[musicId] = null;
            axios.post(API_URL + "/api/music", data
            ).then(res => {
                alert("등록 성공");
                // eslint-disable-next-line no-restricted-globals
                history.go(0);
            }).catch(rjt => alert(rjt));

            return;
        }

        axios.put(API_URL + "/api/music/" + musicId, data)
            .then(res => {
                alert("수정 성공");
                // eslint-disable-next-line no-restricted-globals
                history.go(0);
            }).catch(rjt => alert(rjt));
    };

    return (
        <RegisterFormStyledDiv>
            <TextField label="곡 이름" value={musicName} onChange={onChangeMusicName} />
            <Button variant="contained" onClick={() => togglePopUp(popUp1, setPopUp1)}>곡 중복 체크</Button>
            {
                popUp1 ? "" :
                    (
                        <CheckTemplate>
                            <MusicCheckForm setExistCheck={setExistCheck}
                                            setList={setList}
                                            togglePopUp={() => togglePopUp(popUp1, setPopUp1)}
                                            singers={singers}
                            />
                        </CheckTemplate>
                    )
            }
            <br/>
            {/*TODO*/}
            {/*참여 아티스트들을 선택하는 로직 필요..*/}
            <TextField label="참여 아티스트" value={singers} readOnly={true}/>
            <Button variant="contained" onClick={() => togglePopUp(popUp2, setPopUp2)}>아티스트 찾기</Button>
            {
                popUp2 ? "" :
                    (
                        <CheckTemplate>
                            <ArtistCheckForm setExistCheck={setExistCheck}
                                             setList={{addSinger: setSingers}}
                                             togglePopUp={() => togglePopUp(popUp2, setPopUp2)}
                                             singers={singers}

                            />
                        </CheckTemplate>
                    )
            }
            {/*새로운 곡일 경우, 앨범을 선택하는 로직 필요..*/}
            <TextField label="곡 장르" value={musicGenre} onChange={onChangeMusicGenre} />
            <TextField label="트랙 번호" value={trackNumber} onChange={onChangeTrackNumber} />
            <TextField label="음원 파일 링크" value={fileUri} onChange={onChangeFileUri} />
            <TextField label="가사" style={{width: "350px", height: "300px"}} rows={14}
                       multiline={true} value={lyrics} onChange={onChangeLyrics} /><br/>
            <Button style={{borderRadius: "1rem", fontSize : "2rem", backgroundColor: "black", color: "white"}}
                    size="large" onClick={() => PostMusic()}>등 록 / 수 정</Button>
            <br/>
        </RegisterFormStyledDiv>
    );

};

export default MusicRegisterForm