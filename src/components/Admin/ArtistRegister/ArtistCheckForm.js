import React, { useCallback, useState } from "react";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableRowOnClick from "../Function/TableRowOnClick";
import API_URL from "../Constant/API_URL";

const ArtistCheckForm = ({ inputs, setInputs, setExistCheck, setPopUp}) => {
    const [artists, setArtists] = useState([]);
    const [flag, setFlag] = useState(false);
    const [input, setInput] = useState("");

    const getArtists = (name) => {
        axios.get(API_URL + "/api/artist", {
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

    return (
        <div>
            <h2>아티스트 정보 찾기</h2>
            <TextField label="아티스트 이름 입력" value={input} onChange={onChange} onKeyPress={onEnterPress}/>
            <Button variant="contained" onClick={() => getArtists(input)}>
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
            <Table>
                <TableBody>
                    {
                        flag ? artists.map(row =>
                            (
                                <TableRow key={row.artistId}
                                          hover
                                          onClick={() =>TableRowOnClick( row, inputs, setInputs, setExistCheck, setPopUp )}
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