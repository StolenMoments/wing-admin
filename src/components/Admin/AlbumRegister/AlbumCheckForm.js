import React, { useCallback, useState } from "react";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableRowOnClick from "../Function/TableRowOnClick";

const AlbumCheckForm = ({ setExistCheck, setList, togglePopUp, URI }) => {
    const [albums, setAlbums] = useState([]);
    const [flag, setFlag] = useState(false);
    const [input, setInput] = useState("");

    const getAlbums = (name) => {
        axios.get(URI + "/api/album", {
            params: {
                name: name
            }
        }).then(res => {
            setFlag(false);
            console.log(res);
            while(albums.length > 0) albums.pop();
            res.data.map(album => albums.push(album));
            setAlbums(albums);
            console.log(albums);
            setFlag(true);
        })
    };

    const onChange = useCallback(e => setInput(e.target.value), []);

    const onEnterPress = e => {
        if (e.key === "Enter")
            getAlbums(input);
    }

    return (
        <div>
            <h2>앨범 정보 찾기</h2>
            <TextField label="앨범 이름 입력" value={input} onChange={onChange} onKeyPress={onEnterPress}/>
            <Button variant="contained" onClick={() => getAlbums(input)}>
                검색하기
            </Button>
            <br/>
            <Button variant="contained"
                    onClick={() => {
                        setList["albumId"](0);
                        setExistCheck(true);
                        togglePopUp();
                    }}
            >
                신규생성(동명인 경우)
            </Button>
            <Table>
                <TableBody>
                    {
                        flag ? albums.map(row =>
                            (
                                <TableRow key={row.albumId}
                                          hover
                                          onClick={() =>
                                              TableRowOnClick(
                                                  row, setList,
                                                  setExistCheck, togglePopUp
                                              )}
                                          style={{fontSize: "large"}}
                                >
                                    <TableCell>
                                        <img
                                            alt="profile" src={row.imageUri}
                                            style={{width: "150px", height: "150px"}}
                                        />
                                    </TableCell>
                                    <TableCell width="300px">{row.albumName}</TableCell>
                                    <TableCell width="200px">{row.company}</TableCell>
                                </TableRow>
                            )
                        ): flag
                    }
                </TableBody>
            </Table>
        </div>
    )
};

export default AlbumCheckForm