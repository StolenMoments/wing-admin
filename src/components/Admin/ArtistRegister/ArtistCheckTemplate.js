import React from "react";
import styled from "styled-components";
import ArtistCheckForm from "./ArtistCheckForm";

const GreyBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 2;
  background-color: grey;
`;

const WhiteBox = styled.div`
    width: 800px;
    max-height: 800px;
    overflow: auto;
    text-align: center;
    background-color: white;
    z-index: 1;
`;

const ArtistCheckTemplate = ({ setExistCheck, setList, togglePopUp}) => {

    return (
        <GreyBox>
            <WhiteBox>
                    <ArtistCheckForm setExistCheck={setExistCheck} setList={setList} togglePopUp={togglePopUp} />
            </WhiteBox>
        </GreyBox>
    )

};

export default ArtistCheckTemplate