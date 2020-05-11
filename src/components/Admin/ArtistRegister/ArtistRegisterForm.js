import React, { useRef, useState } from 'react'
import axios from "axios";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { Button, TextField } from "@material-ui/core";
import CheckTemplate from "../Template/CheckTemplate";
import DataCheck from "../Function/DataCheck";
import DateConvert from "../Function/DateConvert";
import ArtistCheckForm from "./ArtistCheckForm";
import RegisterFormStyledDiv from "../Template/RegisterFormStyledDiv";
import API_URL from "../Constant/API_URL";


const ArtistRegisterForm = () => {

    // popup toggle
    const [popUp, setPopUp] = useState(true);

    // 중복 체크 여부
    const [existCheck, setExistCheck] = useState(false);

    // 수정 true, 신규 false
    let updateFlag = useRef(false);

    const [inputs, setInputs] = useState({
        artistId: 0,
        artistName: "",
        artistCompany: "",
        artistGenre: "",
        debutDate: new Date(),
        imageUri: "",
        description: "",
        realName: "",
        account: "",
        bank: "",
    })

    const {
        artistId, artistName, artistCompany, artistGenre,
        debutDate, imageUri, description, realName, account, bank
    } = inputs;

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };


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

        if (Number(data.artistId) > 0) updateFlag.current = !updateFlag;

        if (!updateFlag) {

            data[artistId] = null;
            console.log(updateFlag);
            console.log("포스트");
            axios.post(API_URL + "/api/artist", data)
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

        axios.put(API_URL + "/api/artist/" + data.artistId, data)
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
        <RegisterFormStyledDiv>
            <TextField label="아티스트 이름" name="artistName" value={artistName} onChange={onChange} />
            <Button variant="contained" onClick={() => setPopUp(!popUp)}>아티스트 중복 체크</Button>
            {
                popUp ? "" :
                    (
                        <CheckTemplate>
                            <ArtistCheckForm inputs={inputs}
                                             setInputs={setInputs}
                                             setExistCheck={setExistCheck}
                                             setPopUp={() => setPopUp(!popUp)}
                            />
                        </CheckTemplate>
                    )
            }
            <br/>
            <TextField label="아티스트 소속사" name="artistCompany" value={artistCompany} onChange={onChange} />
            <TextField label="아티스트 장르" name="artistGenre" value={artistGenre} onChange={onChange} />
            <TextField label="프로필 이미지 링크" name="imageUri" value={imageUri} onChange={onChange} />
            <TextField label="아티스트 설명" name="description" style={{width: "350px", height: "300px"}} rows={14}
                       multiline={true} value={description} onChange={onChange} /><br/>
            <TextField label="예금주 성명" name="realName" value={realName} onChange={onChange} />
            <TextField label="계좌번호" name="account" value={account} onChange={onChange} />
            <TextField label="은행" name="bank" value={bank} onChange={onChange} />
            <br/>
            <TextField label="데뷔일" name="artistCompany" value={DateConvert(debutDate)} readOnly={true} />
            <Calendar value={debutDate} onChange={onChange}/>
            <br />
            <Button style={{borderRadius: "1rem", fontSize : "2rem", backgroundColor: "black", color: "white"}}
                    size="large" onClick={() => PostArtist()}>등 록 / 수 정</Button>
            <br/>
        </RegisterFormStyledDiv>
    );

};

export default ArtistRegisterForm