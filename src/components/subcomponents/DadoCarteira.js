import styled from "styled-components";
import { useContext } from "react";


export default function HabitoUsuario ({ name, date, value, state }) {

    return (
        <StyledItem>
            <h1>{date} <span>{name}</span> </h1>
            <StyledText color={state ? "#03AC00" : "#C70000"}>
                {value.toFixed(2).toString().replace(".", ",")}
            </StyledText>
        </StyledItem>
    )
}

const StyledText = styled.h2`

    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: ${props => props.color};
`;

const StyledItem = styled.li`
    width: 100%;
    height: auto;
    
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5vh;
    background: #FFFFFF;
    border-radius: 5px;

    h1 {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;

        color: #C6C6C6;
    }
    span {
        color: #000000;
    }

`;