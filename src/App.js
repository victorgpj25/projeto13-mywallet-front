import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import GlobalStyle from "./style/globalStyles.js";
import WalletContext from "./context/WalletContext";
import Login from "./components/Login.js";
import Cadastro from "./components/Cadastro.js";
import Carteira from "./components/Carteira.js";
import NovaEntrada from "./components/NovaEntrada.js";
import NovaSaida from "./components/NovaSaida.js";



export default function App () {

    const [config, setConfig ] = useState({headers: {Authorization: `Bearer ${localStorage.getItem("config")}`}} || "")

    const [ profileName, setProfileName ] = useState(localStorage.getItem("profileName") || "")

    const [ loading, setLoading ] = useState(false)


    return (
        <WalletContext.Provider value={{ profileName, setProfileName, config, setConfig, loading, setLoading}}>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/carteira" element={<Carteira />} />
                    <Route path="/nova-entrada" element={<NovaEntrada />} />
                    <Route path="/nova-saida" element={<NovaSaida />} />
                </Routes>
        </WalletContext.Provider>
    )
}