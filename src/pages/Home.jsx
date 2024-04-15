import { useEffect, useRef, useState } from 'react'


export default function Home(props) {
    
    const formLogin = useRef()
    const loginEmail = useRef()
    const loginPassword = useRef()

    localStorage.clear()

    async function login(e) {
        e.preventDefault()
        try {
            const response = await fetch(`${props.url}/login`, {
                method: "POST",
                body: JSON.stringify({ email: loginEmail.current.value, password: loginPassword.current.value }),
                headers: { "Content-Type": "application/json" }
            })
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem("Token", data.token)
                location.href = "/tasks"
                console.log(data);
            } else if (response.status === 401) {
                console.log("Email ou senha inválidos.");
            }
            console.log(response.status)
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <>
            <form ref={formLogin} onSubmit={login}>
                <input type='text' name='loginEmail' placeholder='Email' ref={loginEmail} />
                <input type='password' name='loginPassword' placeholder='Senha' ref={loginPassword} />
                <input type='submit' />
            </form>
        </>
    )
}


