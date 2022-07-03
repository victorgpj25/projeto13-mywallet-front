import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ThreeDots } from  "react-loader-spinner";
import WalletContext from "../../context/WalletContext.js";

export default function FormLogin () {

    const {setProfileName, setConfig, loading, setLoading} = useContext(WalletContext)
    const navigate = useNavigate()

    const [ emailLogin, setEmailLogin ] = useState("")
    const [ senhaLogin, setSenhaLogin ] = useState("")


    useEffect(() => { 
        setLoading(false)
	}, []);

    function Logar (event) {
        event.preventDefault()
        setLoading(true)

        const body = {
            email: emailLogin,
            password: senhaLogin
        }

        const promise = axios.post("https://victorgpj-mywallet-back.herokuapp.com/login", body)

        promise.then( resposta => {
            localStorage.setItem("profileName", resposta.data.name)
            localStorage.setItem("config", resposta.data.token)
            setLoading(false)
            setProfileName(resposta.data.name)
            setConfig({headers: {Authorization: `Bearer ${resposta.data.token}`}})
            navigate("/carteira")
            }
        )
        promise.catch( err => {
            setLoading(false)
            alert("houve um erro no login")
            }  
        )

    }

    return (
        <Container>
            <form onSubmit={Logar}>
                <input disabled={loading} placeholder="email" type="email" value={emailLogin} onChange={e => setEmailLogin(e.target.value)} />
                <input disabled={loading} placeholder="senha" type="password" value={senhaLogin} onChange={e => setSenhaLogin(e.target.value)} />
                <button type="submit" disabled={!(emailLogin && senhaLogin) || loading}>{loading ? <ThreeDots height="50" width="50" color='white' ariaLabel='loading' /> : "Entrar"}</button>
            </form>
        </Container>
    )
}

const Container = styled.div`
	width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    form input {
        width: 100%;
        height: 58px;
        margin: 4% 0 4% 0;
        padding: 0 0 0 15px;
        display: flex;
        align-items: center;
        border: 0;
        border-radius: 5px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
        background: #FFFFFF;
    }
    form input:disabled {
        color: #AFAFAF;
        background: #F2F2F2;
    }
    form input::placeholder {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
    }
    form button {
        width: 100%;
        height: 46px;
    
        background: #A328D6;
        border-radius: 5px;
        border: 0;
        margin-bottom: 12%;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 0.04em;
        text-decoration: none;
        color: #FFFFFF;
    }
    form button:disabled {
        opacity: 0.7;
    }
`;