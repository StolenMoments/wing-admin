import React, { useState } from "react";
import axios from 'axios'
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import StyledTableCell from "../../CustomMui/StyledTableCell";
import TableRowOnClick from "../../Function/TableRowOnClick";
import API_URL from "../../Constant/API_URL";
import DefaultMessageDiv from "../../StyledComponents/DefaultMessageDiv";


const ArtistCheckForm = ({ inputs, setInputs, setExistCheck, setPopUp}) => {
    // 받아온 아티스트 정보 배열 State
    const [artists, setArtists] = useState([]);

    // 팝업 및 검색 시작, 종료 플래그
    const [flag, setFlag] = useState(false);

    // 검색어 State
    const [input, setInput] = useState("");

    const getArtists = (name) => {
        if (name.trim() === "") {
            alert("검색어를 입력하세요")
            return null;
        }

        axios.get(API_URL + "/api/artist", {
            params: {
                name: name
            }
        }).then(res => {
            setFlag(false); // 검색 시작 렌더링. 안하면 재검색 먹통
            while (artists.length > 0) artists.pop();
            res.data.map(artist => artists.push(artist));
            setArtists(artists);

            if (artists.length === 0) throw Error("결과가 없습니다");

            setFlag(true); // 검색 완료 렌더링.
        }).catch(err => alert(err));
    };

    const onChange = e => setInput(e.target.value);
    const onEnterPress = e => {
        if (e.key === "Enter")
            getArtists(input);
    }

    return (
        <div>
            <h3>아티스트 정보 찾기</h3>
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
            {
                flag ? artists.map(row =>
                    (
                        <Table key={row.artistId}>
                            <TableBody>
                                <TableRow hover
                                          onClick={
                                              () => TableRowOnClick
                                              (
                                                  row, inputs,
                                                  setInputs, setExistCheck,
                                                  setPopUp
                                              )
                                          }
                                >
                                    <StyledTableCell>
                                        <img
                                            alt="profile" src={row.imageUri}
                                            style={{ width: "125px", height: "125px" }}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell width="250px">{row.artistName}</StyledTableCell>
                                    <StyledTableCell width="250px">{row.artistCompany}</StyledTableCell>
                                    <StyledTableCell width="120px">{row.artistGenre}</StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    )
                ) : <DefaultMessageDiv>- 먼저 검색 후, 해당 아티스트를 클릭하세요 -</DefaultMessageDiv>
            }
        </div>
    )
}
export default ArtistCheckForm