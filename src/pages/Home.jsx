import { useEffect, useRef, useState } from 'react'


export default function Home() {

    const formLogin = useRef()
    const loginEmail = useRef()
    const loginPassword = useRef()

    localStorage.clear()

    async function login(e) {
        e.preventDefault()
        const response = await fetch(`http://localhost:3000/login`, {
            method: "POST",
            body: JSON.stringify({ email: loginEmail.current.value, password: loginPassword.current.value }),
            headers: { "Content-Type": "application/json" }
        })
        if (response.ok) {
            const data = await response.json()
            localStorage.setItem("Token", data.token)
            location.href = "/tasks"
        }
        console.log(response.status)
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


