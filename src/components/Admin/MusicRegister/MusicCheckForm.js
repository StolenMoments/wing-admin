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

const MusicCheckForm = ({ setExistCheck, setList, togglePopUp, singers }) => {
    const [musicList, setMusicList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [input, setInput] = useState("");

    const getMusicList = (name) => {
        axios.get(API_URL + "/api/music", {
            params: {
                name: name
            }
        }).then(res => {
            setFlag(false);
            while(musicList.length > 0) musicList.pop();
            res.data.map(music => musicList.push(music));
            setMusicList(musicList);
            setFlag(true);
        })
    };

    const onChange = useCallback(e => setInput(e.target.value), []);
    const onEnterPress = e => {
        if (e.key === "Enter")
            getMusicList(input);
    }

    return (
        <div>
            <h2>곡 정보 찾기</h2>
            <TextField label="곡 이름 입력" value={input} onChange={onChange} onKeyPress={onEnterPress}/>
            <Button variant="contained" onClick={() => getMusicList(input)}>
                검색하기
            </Button>
            <br/>
            <Button variant="contained"
                    onClick={() => {
                        setList["musicId"](0);
                        setExistCheck(true);
                        togglePopUp();
                    }}>
                신규생성(동명인 경우)
            </Button>
            <Table>
                <TableBody>
                    {
                        flag ? musicList.map(row =>
                            (
                                <TableRow key={row.musicId}
                                          hover
                                          onClick={() =>
                                              TableRowOnClick(
                                                  row, setList,
                                                  setExistCheck, togglePopUp, singers
                                              )}
                                          style={{fontSize: "large"}}
                                >
                                    <TableCell width="300px">{row.musicName}</TableCell>
                                    <TableCell width="120px">{row.musicGenre}</TableCell>
                                </TableRow>
                            )
                        ): flag
                    }
                </TableBody>
            </Table>
        </div>
    )
};

export default MusicCheckForm