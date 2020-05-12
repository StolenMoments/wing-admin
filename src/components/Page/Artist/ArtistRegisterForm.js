import React, { useRef, useState } from 'react'
import axios from "axios";
import Calendar from "react-calendar"
import 'react-calendar/dist/Calendar.css';
import { Button, TextField } from "@material-ui/core";
import CheckTemplate from "../../Template/CheckTemplate";
import DataValidation from "../../Function/DataValidation";
import DateConvert from "../../Function/DateConvert";
import ArtistCheckForm from "./ArtistCheckForm";
import RegisterFormStyledDiv from "../../StyledComponents/RegisterFormStyledDiv";
import API_URL from "../../Constant/API_URL";
import SubmitButton from "../../CustomMui/SubmitButton";


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
        video: ""
    })

    const {
        artistId, artistName, artistCompany, artistGenre,
        debutDate, imageUri, description, realName, account,
        bank, video
    } = inputs;

    const onChange = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    const onChangeDate = e => {
        setInputs({
            ...inputs,
            debutDate: e
        })
    }

    const PostArtist = () => {
        if (!existCheck) {
            alert("아티스트 중복 체크를 해주세요");
            return;
        }

        const data = {
            ...inputs,
            debutDate: DateConvert(debutDate)
        };

        if (DataValidation(data)) return;

        if (Number(data.artistId) > 0) updateFlag.current = !updateFlag;

        // POST
        if (!updateFlag) {
            data[artistId] = null;
            axios.post(API_URL + "/api/artist", data)
                .then(() => {
                    alert("등록 성공");
                    // eslint-disable-next-line no-restricted-globals
                    history.go(0);
                }).catch(rjt =>  alert(rjt));

            return;
        }

        // PUT
        axios.put(API_URL + "/api/artist/" + data.artistId, data)
            .then(res => {
                alert("수정 성공");
                // eslint-disable-next-line no-restricted-globals
                history.go(0);
            }).catch(rjt =>  alert(rjt));
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
            <TextField label="Youtube 영상 코드" name="video" value={video} onChange={onChange} />
            <TextField label="아티스트 설명" name="description" style={{height: "300px"}} rows={14}
                       multiline={true} value={description} onChange={onChange} /><br/>
            <TextField label="예금주 성명" name="realName" value={realName} onChange={onChange} />
            <TextField label="계좌번호" name="account" value={account} onChange={onChange} />
            <TextField label="은행" name="bank" value={bank} onChange={onChange} />
            <br/>
            <TextField label="데뷔일" name="debutDate" value={DateConvert(debutDate)} readOnly={true} />
            <br/>
            <Calendar value={debutDate} onChange={onChangeDate}/>
            <SubmitButton Post={PostArtist}/>
        </RegisterFormStyledDiv>
    );
};

export default ArtistRegisterForm