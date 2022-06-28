import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import GlobalStyle from "./style/globalStyles.js";
import Login from "./components/Login.js";
import Cadastro from "./components/Cadastro.js";



export default function App () {

    const [config, setConfig ] = useState({headers: {Authorization: `Bearer ${localStorage.getItem("config")}`}} || "")

    const [ emailLogin, setEmailLogin ] = useState("")
    const [ senhaLogin, setSenhaLogin ] = useState("")

    const [ profileName ,setProfileName ] = useState(localStorage.getItem("profileName") || "")

    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()


    return (
        <UserContext.Provider value={{emailLogin, setEmailLogin, senhaLogin, setSenhaLogin, profileName, setProfileName, config, setConfig, loading, setLoading}}>
                <GlobalStyle />
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/carteira" element={<Carteira />} />
                    <Route path="/nova-entrada" element={<NovaEntrada />} />
                    <Route path="/nova-saida" element={<NovaSaida />} />
                </Routes>
        </UserContext.Provider>
    )
}