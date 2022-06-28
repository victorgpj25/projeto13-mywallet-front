import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useContext } from "react";

import UserContext from "../../contexts/UserContext";
import { ThreeDots } from  "react-loader-spinner";

export default function FormCadastro () {

    const { loading, setLoading } = useContext(UserContext)
    const [ nomeCadastro, setNomeCadastro] = useState("")
    const [ emailCadastro, setEmailCadastro] = useState("")
    const [ senhaCadastro, setSenhaCadastro] = useState("")
    const [ senhaCadastro2, setSenhaCadastro2] = useState("")
    const navigate = useNavigate()

    useEffect(() => { 
        setLoading(false)
	}, []);   

    function Cadastrar (event) {
        event.preventDefault()
        setLoading(true)

        const body = {
            name: nomeCadastro,
            email: emailCadastro,
            password: senhaCadastro
        }

        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", body)

        promise.then( res => {
            setLoading(false)
            navigate("/")
        }
 
        )
        promise.catch( err => {
            setLoading(false)
            alert("houve um erro no cadastro")
            }  
        )
    }
    

    return (
        <Container>
            <form onSubmit={Cadastrar}>
                <input disabled={loading} placeholder="Nome" type="text" value={nomeCadastro} onChange={e => setNomeCadastro(e.target.value)} />
                <input disabled={loading} placeholder="Email" type="email" value={emailCadastro} onChange={e => setEmailCadastro(e.target.value)} />
                <input disabled={loading} placeholder="Senha" type="password" value={senhaCadastro} onChange={e => setSenhaCadastro(e.target.value)} />
                <input disabled={loading} placeholder="Confirme a senha" type="password" value={senhaCadastro2} onChange={e => setSenhaCadastro2(e.target.value)} />
                <button type="submit" disabled={!(nomeCadastro && emailCadastro && senhaCadastro && senhaCadastro2) || senhaCadastro !== senhaCadastro2 || loading}>{loading ? <ThreeDots height="50" width="50" color='white' ariaLabel='loading' /> : "Cadastrar"}</button>
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
        margin: 2% 0 2% 0;
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