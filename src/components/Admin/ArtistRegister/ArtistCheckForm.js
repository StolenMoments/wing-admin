import React, { useCallback, useState } from "react";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const ArtistCheckForm = ({ setExistCheck, setList, togglePopUp }) => {
    const [artists, setArtists] = useState([]);
    const [flag, setFlag] = useState(false);
    const [input, setInput] = useState("");

    const getArtists = (name) => {
        axios.get("http://localhost:8080/api/artist", {
            params: {
                name: name
            }
        }).then(res => {
            setFlag(false);
            console.log(res);
            while(artists.length > 0) artists.pop();
            res.data.map(artist => artists.push(artist));
            setArtists(artists);
            console.log(artists);
            setFlag(true);
        })
    };

    const onChange = useCallback(e => setInput(e.target.value), []);
    const onEnterPress = e => {
        if (e.key === "Enter")
            getArtists(input);
    }
    const onClick = (event, row) => {
        for(let key in setList){
            if (key === "debutDate") {
                setList[key](new Date(row[key].substr(0, 4), row[key].substr(5,2),row[key].substr(8,2)));
            }
            else setList[key](row[key]);
        }
        setExistCheck(true);
        togglePopUp();
    }

    return (
        <div>
            <h2>아티스트 정보 찾기</h2>
            <TextField label="아티스트 이름 입력" value={input} onChange={onChange} onKeyPress={onEnterPress}/>
            <h2>아티스트 선택 방법 : 프로필 사진 클릭</h2>
            <TextField label="아티스트 이름 입력" value={input} onChange={onChange}/>
            <Button variant="contained" onClick={() => getArtists(input)}>
                검색하기
            </Button>
            <br/>
            <Button variant="contained" onClick={() => {
                setList["artistId"](0);
                setExistCheck(true);
                togglePopUp();
            }}>
                신규생성(동명이인일 경우)
            </Button>
            <Table>
                <TableBody>
                    {
                        flag ? artists.map(row =>
                            (
                                <TableRow key={row.artistId}
                                          hover
                                          onClick={(event) => onClick(event, row)}
                                          style={{fontSize: "large"}}
                                >
                                    <TableCell>
                                        <img
                                            alt="profile" src={row.imageUri}
                                            style={{width: "150px", height: "150px"}}
                                        />
                                    </TableCell>
                                    <TableCell width="300px">{row.artistName}</TableCell>
                                    <TableCell width="200px">{row.artistCompany}</TableCell>
                                    <TableCell width="120px">{row.artistGenre}</TableCell>
                                </TableRow>
                            )
                        ): flag
                    }
                </TableBody>
            </Table>
        </div>
    )
};

export default ArtistCheckForm