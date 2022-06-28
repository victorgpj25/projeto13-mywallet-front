import styled from "styled-components";
import { Link } from "react-router-dom";


import FormLogin from  "./subcomponents/FormLogin.js";
import Logo from "../content/mywallet.png";

export default function Login () {
    return (
        <Container>
            <img src={Logo} alt="Logo MyWallet" />
            <FormLogin />
            <StyledLink to ="/cadastro">Primeira vez? Cadastre-se!</StyledLink>
        </Container>
    )
}

const StyledLink = styled(Link)`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    text-decoration: none;
    color: #FFFFFF;
`;

const Container = styled.div`
	width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 6.4%;
	background-color: #8C11BE;
    img {
        width: 39.2vw;
        height: auto;
        margin-bottom: 2.5vh;
    }
`;