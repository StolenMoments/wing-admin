import React from 'react'
import styled from 'styled-components'

const TemplateBlock = styled.div`
  display: grid;
`;

const TemplateTitle = styled.div`
  @import url(https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css);
  grid-row: 1;
  grid-column: 2;
  margin-bottom: 2rem;
  height: 5rem;
  text-align: center;
  font-size: 2rem;
  font-family: "NanumSquare",serif;
  
`;

const RegisterTemplate = ({ children, title }) => {

    return (
        <TemplateBlock>
            <TemplateTitle>
                <hr />
                {title}
                <hr />
            </TemplateTitle>
            {children}
        </TemplateBlock>
    )

};


export default RegisterTemplate;