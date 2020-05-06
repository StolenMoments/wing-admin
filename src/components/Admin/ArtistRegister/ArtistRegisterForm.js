import React, { useCallback, useState } from 'react'
import axios from "axios";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";
import CheckTemplate from "../Template/CheckTemplate";
import DataCheck from "../Function/DataCheck";
import DateConvert from "../Function/DateConvert";
import ArtistCheckForm from "./ArtistCheckForm";

const URI = "http://localhost:8080";

const StyledDiv = styled.div`
  display: grid;
  grid-row-start: 2;
  grid-row-end: 7;
  grid-column-start: 1;
  grid-column-end : 4;
  justify-content: center; 
  
  .MuiTextField-root {
    margin-bottom: 1rem;
  }
  
`;


const ArtistRegisterForm = () => {

    // popup toggle
    const [popUp, setPopUp] = useState(true);

    // 중복 체크 여부
    const [existCheck, setExistCheck] = useState(false);

    // 수정 true, 신규 false
    const [updateFlag, setUpdateFlag] = useState(false);


    const [artistId, setArtistId] = useState(0);
    const [artistName, setArtistName] = useState("");
    const [artistCompany, setArtistCompany] = useState("");
    const [artistGenre, setArtistGenre] = useState("");
    const [debutDate, setDebutDate] = useState(new Date());
    const [imageUri, setImageUri] = useState("");
    const [description, setDescription] = useState("");
    const [realName, setRealName] = useState("");
    const [account, setAccount] = useState("");
    const [bank, setBank] = useState("");

    const setList = {
        artistId: setArtistId,
        artistCompany: setArtistCompany,
        artistGenre: setArtistGenre,
        artistName: setArtistName,
        imageUri: setImageUri,
        description: setDescription,
        debutDate: setDebutDate,
        realName: setRealName,
        account: setAccount,
        bank: setBank
    };

    const onChangeArtistName = useCallback(e => { setArtistName(e.target.value); }, []);
    const onChangeArtistCompany = useCallback(e => { setArtistCompany(e.target.value); }, []);
    const onChangeArtistGenre = useCallback(e => { setArtistGenre(e.target.value); }, []);
    const onChangeImageUri = useCallback(e => { setImageUri(e.target.value); }, []);
    const onChangeDescription = useCallback(e => { setDescription(e.target.value); }, []);
    const onChangeRealName = useCallback(e => { setRealName(e.target.value); }, []);
    const onChangeAccount = useCallback(e => { setAccount(e.target.value); }, []);
    const onChangeBank = useCallback(e => { setBank(e.target.value); }, []);

    const togglePopUp = () => setPopUp(!popUp);

    const PostArtist = () => {
        if (!existCheck) {
            alert("아티스트 중복 체크를 해주세요");
            return;
        }

        const data = {
            artistId: artistId,
            artistName: artistName,
            artistCompany: artistCompany,
            artistGenre: artistGenre,
            debutDate: DateConvert(debutDate),
            imageUri: imageUri,
            description: description,
            realName: realName,
            account: account,
            bank: bank
        };


        if (DataCheck(data)) return;

        if (Number(data.artistId) > 0) setUpdateFlag(true);

        if (!updateFlag) {

            data[artistId] = null;
            console.log(updateFlag);
            console.log("포스트");
            axios.post(URI + "/api/artist", data)
                .then(res => {
                    console.log(res);
                    alert("등록 성공");
                    // eslint-disable-next-line no-restricted-globals
                    history.go(0);
                }).catch(rjt => {
                alert(rjt);
            });

            return;
        }

        axios.put(URI + "/api/artist/" + data.artistId, data)
            .then(res => {
                console.log(res);
                alert("수정 성공");
                // eslint-disable-next-line no-restricted-globals
                history.go(0);
            }).catch(rjt => {
            alert(rjt);
        });
    };

    return (
        <StyledDiv>
            <TextField label="아티스트 ID" value={artistId} readOnly={true}/>
            <TextField label="아티스트 이름" value={artistName} onChange={onChangeArtistName} />
            <Button variant="contained" onClick={togglePopUp}>아티스트 중복 체크</Button>
            {
                popUp ? "" :
                    (
                        <CheckTemplate>
                            <ArtistCheckForm setExistCheck={setExistCheck}
                                             setList={setList}
                                             togglePopUp={togglePopUp}/>
                        </CheckTemplate>
                    )
            }
            <br/>
            <TextField label="아티스트 소속사" value={artistCompany} onChange={onChangeArtistCompany} />
            <TextField label="아티스트 장르" value={artistGenre} onChange={onChangeArtistGenre} />
            <TextField label="프로필 이미지 링크" value={imageUri} onChange={onChangeImageUri} />
            <TextField label="아티스트 설명" style={{width: "350px", height: "300px"}} rows={14}
                       multiline={true} value={description} onChange={onChangeDescription} /><br/>
            <TextField label="예금주 성명" value={realName} onChange={onChangeRealName} />
            <TextField label="계좌번호" value={account} onChange={onChangeAccount} />
            <TextField label="은행" value={bank} onChange={onChangeBank} />
            <br/>
            <TextField label="데뷔일" value={DateConvert(debutDate)} readOnly={true} />
            <Calendar value={debutDate} onChange={setDebutDate}/>
            <br />
            <Button style={{borderRadius: "1rem", fontSize : "2rem", backgroundColor: "black", color: "white"}}
                    size="large" onClick={() => PostArtist()}>등 록 / 수 정</Button>
            <br/>
        </StyledDiv>
    );
};

export default ArtistRegisterForm