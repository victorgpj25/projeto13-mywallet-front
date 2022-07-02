import { useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";


import Wallet from  "./subcomponents/CarteiraDados.js";
import WalletContext from "../context/WalletContext.js";
import Exit from "../content/exit.png";
import Plus from "../content/plus.png";
import Minus from "../content/minus.png";

export default function Carteira () {
    const { loading, setLoading, profileName } = useContext(WalletContext)

    useEffect(() => { 
        setLoading(false)
	}, []);


    return (
        <Container>
            <header>
                <h1>Olá, {profileName}</h1>
                <StyledImageLink to ="/">
                    <img src={Exit} alt="Exit" />  
                </StyledImageLink>
            </header>
            <Wallet />
            <div>
                <StyledLink to ="/nova-entrada">
                    <img src={Plus} alt="Plus" /> 
                    <p>Nova entrada</p> 
                </StyledLink>
                <StyledLink to ="/nova-saida">
                    <img src={Minus} alt="Minus" /> 
                    <p>Nova saída</p> 
                </StyledLink>
            </div>
            
        </Container>
    )
}

const StyledImageLink = styled(Link)`
    img {
        width: 6.1vw;
        height: auto;
    }
`;

const StyledLink = styled(Link)`
    width: 41.3vw;
    height: 17.1vh;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2.5%;

    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
    color: #FFFFFF;
    background: #A328D6;
    border-radius: 5px;

    img {
        width: 6.9vw;
        height: auto;
        margin-bottom: 4.8vh;
    }
    p {
        width: 40%;
    }
`;

const Container = styled.div`
	width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 6.4%;
	background-color: #8C11BE;

    header {
        width: 100%;
        height: auto;
        margin: 3.7vh 0 3.3vh;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h1 {
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 26px;
            line-height: 31px;
            color: #FFFFFF;
        }
    }

    > div:last-child {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin: 1.95vh 0;

    }

`;