import { useEffect, useRef, useState } from 'react'


export default function Home(props) {
    const [createAcc, setCreateAcc] = useState(false)
    const formLogin = useRef()
    const loginEmail = useRef()
    const loginPassword = useRef()
    const alertLogin = useRef()
    const btnSubmit = useRef()

    const formCreateLogin = useRef()
    const createName = useRef()
    const createEmail = useRef()
    const createPassword = useRef()
    const createPassword2 = useRef()

    localStorage.clear()

    async function login(e) {
        e.preventDefault()
        btnSubmit.current.setAttribute("disabled", "true")
        btnSubmit.current.style.opacity = "0.3"
        try {
            const response = await fetch(`${props.url}/login`, {
                method: "POST",
                body: JSON.stringify({ email: loginEmail.current.value, password: loginPassword.current.value }),
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            if (response.ok) {
                localStorage.setItem("Token", data.token)
                location.href = "/tasks"
                console.log(data);
            } else if (response.status === 401 || response.status === 400) {
                incorrectLogin(data.message)
                btnSubmit.current.removeAttribute("disabled")
                btnSubmit.current.style.opacity = ""
            } else {
                btnSubmit.current.removeAttribute("disabled")
                btnSubmit.current.style.opacity = ""
            }
        } catch (error) {
            console.error(error)
        }
    }

    async function createLogin(e) {
        e.preventDefault()
        btnSubmit.current.setAttribute("disabled", "true")
        btnSubmit.current.style.opacity = "0.3"
        if (createPassword.current.value !== createPassword2.current.value) {
            incorrectLogin("As senhas não conferem.")
            return
        }
        try {
            const response = await fetch(`${props.url}/createUser`, {
                method: "POST",
                body: JSON.stringify({ email: createEmail.current.value, password: createPassword.current.value, name: createName.current.value }),
                headers: { "Content-Type": "application/json" }
            })
            const data = await response.json()
            if (response.ok) {
                setCreateAcc(false)
            } else if (response.status === 400) {
                incorrectEmail(data.message)
            }
            btnSubmit.current.removeAttribute("disabled")
            btnSubmit.current.style.opacity = ""
        } catch (error) {
            console.error(error)
        }
    }

    function incorrectLogin(params) {
        if (loginEmail.current) {
            loginEmail.current.style.borderColor = "red"
            loginPassword.current.style.borderColor = "red"
        } else {
            createName.current.style.borderColor = ""
            createEmail.current.style.borderColor = ""
            createPassword.current.style.borderColor = "red"
            createPassword2.current.style.borderColor = "red"
        }
        alertLogin.current.textContent = params
    }

    function incorrectEmail(params) {
        createName.current.style.borderColor = ""
        createEmail.current.style.borderColor = "red"
        createPassword.current.style.borderColor = ""
        createPassword2.current.style.borderColor = ""
        alertLogin.current.textContent = params
    }


    return (
        <>
            {!createAcc ?
                <form ref={formLogin} onSubmit={login} className='taskForm'>
                    <h2>Login</h2>
                    <input type='email' name='loginEmail' placeholder='Email' ref={loginEmail} required />
                    <input type='password' name='loginPassword' placeholder='Senha' ref={loginPassword} required />
                    <span className='alertLogin' ref={alertLogin}></span>
                    <input type='submit' id='btnSubmit' value="Acessar" ref={btnSubmit} />
                    <input type='button' id='btnSubmit' value="Criar Conta" onClick={() => setCreateAcc(true)} />
                </form>
                :
                <form ref={formCreateLogin} onSubmit={createLogin} className='taskForm'>
                    <h2>Criar Conta</h2>
                    <input type='text' name='createName' placeholder='Nome Completo' ref={createName} required />
                    <input type='email' name='createEmail' placeholder='Email' ref={createEmail} required />
                    <input type='password' name='createPassword' placeholder='Senha' ref={createPassword} required />
                    <input type='password' name='createPassword2' placeholder='Repita a Senha' ref={createPassword2} required />
                    <span className='alertLogin' ref={alertLogin}></span>
                    <input type='submit' id='btnSubmit' value="Criar Conta" ref={btnSubmit} />
                    <input type='button' id='btnSubmit' value="Cancelar" onClick={() => setCreateAcc(false)} />
                </form>
            }



        </>
    )
}


