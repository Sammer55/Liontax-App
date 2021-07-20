import React, { createContext, useState } from "react"

export const Context = createContext({});

export const Provider = (props) => {

    const [name, setName] = useState({ name: "" })
    const [cpf, setCpf] = useState({ name: "" })
    const [email, setEmail] = useState({ email: email })
    const [tel, setTel] = useState({ name: "" })

    return (
        <Context.Provider value={{ 
            name, setName, 
            cpf, setCpf, 
            email, setEmail,
            tel, setTel,
            }}>
            { props.children }
        </Context.Provider>
    )
}