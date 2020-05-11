import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import styled from "styled-components"
const StyledDiv = styled.div`
  display: grid;
  justify-content: center;
  grid-auto-rows: minmax(100px, auto);
  
  Button {
    //@import url(https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css);
    font-family: "NanumSquare",serif;
    font-weight: bold;
    font-size: 1.2rem;
    width: 17rem;
    height: 5rem;
  }
  
  .artist {
    grid-row: 3;
    text-decoration: none;
  }
  
  .album {
    grid-row: 4;
    text-decoration: none;
  }
  
  .music {
    grid-row: 5;
    text-decoration: none;
  }
`;

const AdminMain = () => {
    return (
        <StyledDiv>
            <Link className="artist" to={"/artistRegister"}>
                <Button variant="contained">
                    아티스트 정보 등록 / 수정
                </Button>
            </Link>
            <Link className="album" to={"/albumRegister"}>
                <Button variant="contained" >
                    앨범 정보 등록
                </Button>
            </Link>
            <Link className="music" to={"/musicRegister"}>
                <Button variant="contained" >
                    음악 정보 등록
                </Button>
            </Link>
        </StyledDiv>
    )
};

export default AdminMain


