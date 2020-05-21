import React, { useRef, useState } from "react";
import RegisterFormStyledDiv from "../../StyledComponents/RegisterFormStyledDiv";
import DateConvert from "../../Function/DateConvert";
import DataValidation from "../../Function/DataValidation";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import CheckTemplate from "../../Template/CheckTemplate";
import Calendar from "react-calendar";
import AlbumCheckForm from "./AlbumCheckForm";
import API_URL from "../../Constant/API_URL";
import SubmitButton from "../../CustomMui/SubmitButton";

const AlbumRegisterForm = () => {

    // popup toggle
    const [popUp, setPopUp] = useState(true);

    // 중복 체크 여부
    const [existCheck, setExistCheck] = useState(false);

    // 수정 true, 신규 false
    let updateFlag = useRef(false);

    const [inputs, setInputs] = useState({
        albumId: 0,
        albumName: "",
        albumGenre: "",
        company: "",
        distributor: "",
        date: new Date(),
        imageUri: "",
        description: ""
    })

    const {
        albumId, albumName, albumGenre, company,
        distributor, date, imageUri, description
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
            date: e
        })
    }

    const PostAlbum = () => {
        if (!existCheck) {
            alert("앨범 중복 체크를 해주세요");
            return;
        }

        const data = {
            albumId: albumId,
            albumName: albumName,
            albumGenre: albumGenre,
            company: company,
            distributor: distributor,
            date: DateConvert(date),
            imageUri: imageUri,
            description: description,
        };


        if (DataValidation(data)) return;

        if (Number(data.albumId) > 0) updateFlag.current = !updateFlag;

        if (!updateFlag) {
            data[albumId] = null;
            axios.post(API_URL + "/api/album", data)
                .then(res => {
                    alert("등록 성공");
                    // eslint-disable-next-line no-restricted-globals
                    history.go(0);
                }).catch(rjt => alert(rjt));

            return;
        }

        axios.put(API_URL + "/api/album/" + data.albumId, data)
            .then(res => {
                alert("수정 성공");
                // eslint-disable-next-line no-restricted-globals
                history.go(0);
            }).catch(rjt => alert(rjt));
    };


    return (
        <RegisterFormStyledDiv>
            <TextField label="앨범 이름" name="albumName" value={albumName} onChange={onChange} />
            <Button variant="contained" onClick={() => setPopUp(!popUp)}>앨범 중복 체크</Button>
            {
                popUp ? "" :
                    (
                        <CheckTemplate>
                            <AlbumCheckForm inputs={inputs}
                                            setInputs={setInputs}
                                            setExistCheck={setExistCheck}
                                            setPopUp={() => setPopUp(!popUp)}
                            />
                        </CheckTemplate>
                    )
            }
            <br/>
            <TextField label="앨범 장르" name="albumGenre" value={albumGenre} onChange={onChange} />
            <TextField label="기획사" name="company" value={company} onChange={onChange} />
            <TextField label="발매사" name="distributor" value={distributor} onChange={onChange} />
            <TextField label="앨범 자켓 링크" name="imageUri" value={imageUri} onChange={onChange} />
            <TextField label="앨범 설명" name="description" style={{width: "350px", height: "300px"}} rows={14}
                       multiline={true} value={description} onChange={onChange} /><br/>
            <br/>
            <TextField label="발매일" name="date" value={DateConvert(date)} readOnly={true} />
            <Calendar value={date} onChange={onChangeDate}/>
            <SubmitButton Post={PostAlbum} />
        </RegisterFormStyledDiv>
    )

}

export default AlbumRegisterForm