import React from 'react'
import styled from 'styled-components'


const TemplateTitle = styled.div`
  border-style: solid;
  box-sizing: border-box;
  background: beige;
  color: darkblue;
  font-weight: bold;
  margin-left: 30rem;
  margin-right: 30rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
  font-family: "NanumBarunGothic",serif;
`;

const RegisterTemplate = ({ children, title }) => {

    return (
        <>
            <TemplateTitle>
                {title}
            </TemplateTitle>
            {children}
        </>
    )
};


export default RegisterTemplate;