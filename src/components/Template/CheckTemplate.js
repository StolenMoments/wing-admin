import React from "react";
import styled from "styled-components";

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
    min-height: 800px;
    max-height: 800px;
    overflow: auto;
    text-align: center;
    background-color: white;
    z-index: 1;
`;

const CheckTemplate = ({ children }) => {

    return (
        <GreyBox>
            <WhiteBox>
                {children}
            </WhiteBox>
        </GreyBox>
    )

};

export default CheckTemplate