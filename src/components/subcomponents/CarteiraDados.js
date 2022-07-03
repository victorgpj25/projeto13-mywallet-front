import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { ThreeDots } from  "react-loader-spinner";
import axios from "axios";

import WalletContext from "../../context/WalletContext.js";
import DadoCarteira from "./DadoCarteira.js"


export default function CarteiraDados () {

    const { loading, setLoading, config } = useContext(WalletContext)
    const [ carteiraDados, setCarteiraDados ] = useState([])
    const [ saldo, setSaldo ] = useState(0) 

    useEffect(() => { 
        setLoading(true)

        const promise = axios.get("https://victorgpj-mywallet-back.herokuapp.com/carteiraDados", config)

        promise.then( resposta => {
            setCarteiraDados(resposta.data)
            setLoading(false)
        })
        promise.catch( err => {
            alert("houve um erro ao receber os dados da carteira")
            setLoading(false)
        })
	}, []);

    useEffect(() => { 
        calcularSaldo()
	}, [carteiraDados]);

    function calcularSaldo () {
        let aux = 0
        for (let i = 0; i < carteiraDados.length; i++) {
            if (carteiraDados[i].state) {
                aux += carteiraDados[i].value
            } else {
                aux -= carteiraDados[i].value
            }
        }
        setSaldo(saldo + aux)
    }

    const displayCarteiraDados = carteiraDados.map( (dado, index) => {
        return (
            <DadoCarteira key={index} name={dado.name} date={dado.date} value={dado.value} state={dado.state} />
        )
    })


    return (
        <Container>
            {carteiraDados.length > 0 ? <ol> {displayCarteiraDados} </ol> : null}

            {carteiraDados.length > 0 ? <div> <h3>SALDO</h3> <StyledText color={saldo > 0 ? "#03AC00" : "#C70000"}>{saldo.toFixed(2).toString().replace(".", ",")}</StyledText> </div> : null}

            {loading ? <ThreeDots height="30" width="500" color='#8C11BE' ariaLabel='loading' /> : carteiraDados.length > 0 ? null : <h2>Não há registros de entrada ou saída</h2>}
        </Container>
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


const Container = styled.div`
	width: 100%;
    height: 66.8vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
	background-color: #FFFFFF;
    border-radius: 5px;
    padding: 5%;



    > h2 {
        width: 65%;

        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;

        color: #868686;
    }
    div > h3 {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
    }
    div {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    ol {
        width: 100%;
        height: 90%;
        display: flex;
        flex-direction: column;

        margin-bottom: 2vh;
        overflow: scroll;
    }
`;