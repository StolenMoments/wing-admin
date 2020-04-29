import React, { useCallback, useState } from 'react'
import axios from "axios";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";

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

/**
 * @return {boolean}
 */
function DataCheck(data) {
    for (let key in data)
        if (key !== "artistCompany" && data[key] === "") {
            alert(key + " 입력하세요");
            return true;
        }

    return false;
}

/**
 * @return {string}
 */
function DateConvert(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10)
        month = '0' + month;

    let day = date.getDate();
    if (day < 10)
        day = '0' + day;

    return year + '-' + month + '-' + day;
}

const ArtistRegisterForm = () => {
    const [artistName, setArtistName] = useState("");
    const [artistCompany, setArtistCompany] = useState("");
    const [artistGenre, setArtistGenre] = useState("");
    const [debutDate, setDebutDate] = useState(new Date());
    const [imageUri, setImageUri] = useState("");
    const [description, setDescription] = useState("");
    const [realName, setRealName] = useState("");
    const [account, setAccount] = useState("");
    const [bank, setBank] = useState("");

    const onChangeArtistName = useCallback(e => { setArtistName(e.target.value); }, []);
    const onChangeArtistCompany = useCallback(e => { setArtistCompany(e.target.value); }, []);
    const onChangeArtistGenre = useCallback(e => { setArtistGenre(e.target.value); }, []);
    const onChangeImageUri = useCallback(e => { setImageUri(e.target.value); }, []);
    const onChangeDescription = useCallback(e => { setDescription(e.target.value); }, []);
    const onChangeRealName = useCallback(e => { setRealName(e.target.value); }, []);
    const onChangeAccount = useCallback(e => { setAccount(e.target.value); }, []);
    const onChangeBank = useCallback(e => { setBank(e.target.value); }, []);


    const PostArtist = () => {
        const data = {
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

        if (DataCheck(data)) return null;

        axios.post("http://localhost:8080/api/post/artist/", data
        ).then(res => {
            console.log(res);
            alert("등록 성공");
            // eslint-disable-next-line no-restricted-globals
            history.go(0);
        }).catch(rjt => {
            alert(rjt);
        });
    };

    return (
        <StyledDiv>
            <TextField className="artistName" label="아티스트 이름" value={artistName} onChange={onChangeArtistName} />
            <TextField className="artistCompany" label="아티스트 소속사" value={artistCompany} onChange={onChangeArtistCompany} />
            <TextField label="아티스트 장르" value={artistGenre} onChange={onChangeArtistGenre} />
            <TextField label="프로필 이미지 링크" value={imageUri} onChange={onChangeImageUri} />
            <TextField className="description" label="아티스트 설명" style={{width: "350px", height: "300px"}} rows={14} multiline={true} value={description} onChange={onChangeDescription} /><br/>
            <TextField label="예금주 성명" value={realName} onChange={onChangeRealName} />
            <TextField label="계좌번호" value={account} onChange={onChangeAccount} />
            <TextField label="은행" value={bank} onChange={onChangeBank} />
            <br/>
            <TextField label="데뷔일" value={DateConvert(debutDate)} readOnly={true} />
            <Calendar value={debutDate} onChange={setDebutDate}/>
            <br />
            <Button style={{borderRadius: "1rem", fontSize : "2rem", backgroundColor: "black", color: "white"}} size="large" onClick={PostArtist}>등 록</Button>
            <br/>
        </StyledDiv>
    );
};

export default ArtistRegisterForm