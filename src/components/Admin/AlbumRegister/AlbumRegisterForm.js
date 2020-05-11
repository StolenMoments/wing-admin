import React, { useCallback, useState } from "react";
import RegisterFormStyledDiv from "../Template/RegisterFormStyledDiv";
import DateConvert from "../Function/DateConvert";
import DataValidation from "../Function/DataValidation";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import CheckTemplate from "../Template/CheckTemplate";
import Calendar from "react-calendar";
import AlbumCheckForm from "./AlbumCheckForm";
import API_URL from "../Constant/API_URL";

const AlbumRegisterForm = () => {

    // popup toggle
    const [popUp, setPopUp] = useState(true);
    const togglePopUp = () => setPopUp(!popUp);

    // 중복 체크 여부
    const [existCheck, setExistCheck] = useState(false);

    // 수정 true, 신규 false
    const [updateFlag, setUpdateFlag] = useState(false);


    const [albumId, setAlbumId] = useState(0);
    const [albumName, setAlbumName] = useState("");
    const [albumGenre, setAlbumGenre] = useState("");
    const [company, setCompany] = useState("");
    const [distributor, setDistributor] = useState("");
    const [date, setDate] = useState(new Date());
    const [imageUri, setImageUri] = useState("");
    const [description, setDescription] = useState("");

    const setList = {
        albumId: setAlbumId,
        albumName: setAlbumName,
        albumGenre: setAlbumGenre,
        company: setCompany,
        distributor: setDistributor,
        date: setDate,
        imageUri: setImageUri,
        description: setDescription
    };

    const onChangeAlbumName = useCallback(e => { setAlbumName(e.target.value); }, []);
    const onChangeAlbumGenre = useCallback(e => { setAlbumGenre(e.target.value); }, []);
    const onChangeCompany = useCallback(e => { setCompany(e.target.value); }, []);
    const onChangeDistributor = useCallback(e => { setDistributor(e.target.value); }, []);
    const onChangeImageUri = useCallback(e => { setImageUri(e.target.value); }, []);
    const onChangeDescription = useCallback(e => { setDescription(e.target.value); }, []);


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

        if (Number(data.albumId) > 0) setUpdateFlag(true);

        if (!updateFlag) {

            data[albumId] = null;
            console.log(updateFlag);
            console.log("포스트");
            axios.post(API_URL + "/api/album", data)
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

        axios.put(API_URL + "/api/album/" + data.albumId, data)
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
            <TextField label="앨범 이름" value={albumName} onChange={onChangeAlbumName} />
            <Button variant="contained" onClick={togglePopUp}>앨범 중복 체크</Button>
            {
                popUp ? "" :
                    (
                        <CheckTemplate>
                            <AlbumCheckForm setExistCheck={setExistCheck}
                                             setList={setList}
                                             togglePopUp={togglePopUp}
                            />
                        </CheckTemplate>
                    )
            }
            <br/>
            <TextField label="앨범 장르" value={albumGenre} onChange={onChangeAlbumGenre} />
            <TextField label="기획사" value={company} onChange={onChangeCompany} />
            <TextField label="발매사" value={distributor} onChange={onChangeDistributor} />
            <TextField label="앨범 자켓 링크" value={imageUri} onChange={onChangeImageUri} />
            <TextField label="앨범 설명" style={{width: "350px", height: "300px"}} rows={14}
                       multiline={true} value={description} onChange={onChangeDescription} /><br/>
            <br/>
            <TextField label="발매일" value={DateConvert(date)} readOnly={true} />
            <Calendar value={date} onChange={setDate}/>
            <br />
            <Button style={{borderRadius: "1rem", fontSize : "2rem", backgroundColor: "black", color: "white"}}
                    size="large" onClick={() => PostAlbum()}>등 록 / 수 정</Button>
            <br/>
        </RegisterFormStyledDiv>
    )

}

export default AlbumRegisterForm