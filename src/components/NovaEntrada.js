import { useContext, useState } from "react";
import styled from "styled-components";
import WalletContext from "../context/WalletContext.js";
import dayjs from "dayjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function CarteiraDados () {

    const { config, loading, setLoading} = useContext(WalletContext)
    const [ valorDado, setValorDado ] = useState("")
    const [ descricaoDado, setDescricaoDado ] = useState("")
    const navigate = useNavigate()

    function enviarDado (event) {
        event.preventDefault()

        if (!(/^[0-9]+(,\d{2})$/.test(valorDado))) {
            alert("O valor deve ser dado no seguinte formato: 9999,99 ")

        } else {
            setLoading(true)

            const body = {
                value: parseFloat(valorDado.replace(",", ".")),
                name: descricaoDado,
                date: dayjs(Date.now()).format("DD/MM"),
                state: true
            }
    
            const promise = axios.post("https://git.heroku.com/victorgpj-mywallet-back.git/carteiraDados", body, config)
    
            promise.then( res => {
                setLoading(false)
                navigate("/carteira")
                }
            )
            promise.catch( err => {
                setLoading(false)
                alert("houve um erro no envio")
                }  
            )
        }
    }


    return (
        <Container>
            <header>Nova entrada</header>
            <form onSubmit={enviarDado}>
                <input disabled={loading} placeholder="Valor" type="text" value={valorDado} onChange={e => setValorDado(e.target.value)} />
                <input disabled={loading} placeholder="Descrição" type="text" value={descricaoDado} onChange={e => setDescricaoDado(e.target.value)} />
                <button type="submit" disabled={!(valorDado && descricaoDado)}>Salvar entrada</button>
            </form>
        </Container>
    )
}


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
        align-items: center;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }

    form {
        width: 100%;
    }

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