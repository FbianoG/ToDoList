import { useEffect, useRef, useState } from 'react'


export default function Home(props) {
    const [createAcc, setCreateAcc] = useState(false)
    const formLogin = useRef()
    const loginEmail = useRef()
    const loginPassword = useRef()

    const formCreateLogin = useRef()
    const createName = useRef()
    const createEmail = useRef()
    const createPassword = useRef()

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

    async function createLogin(e) {
        e.preventDefault()
        const response = await fetch(`http://localhost:3000/createUser`, {
            method: "POST",
            body: JSON.stringify({ email: createEmail.current.value, password: createPassword.current.value, name: createName.current.value }),
            headers: { "Content-Type": "application/json" }
        })
        const data = await response.json()
        console.log(data)

    }


    return (
        <>
            {!createAcc ?
                <form ref={formLogin} onSubmit={login} className='taskForm'>
                    <h2>Login</h2>
                    <input type='text' name='loginEmail' placeholder='Email' ref={loginEmail} />
                    <input type='password' name='loginPassword' placeholder='Senha' ref={loginPassword} />
                    <input type='submit' id='btnSubmit' value="Acessar" />
                    <input type='button' id='btnSubmit' value="Criar Conta" onClick={() => setCreateAcc(true)} />
                </form>
                :
                <form ref={formCreateLogin} onSubmit={createLogin} className='taskForm'>
                    <h2>Criar Conta</h2>
                    <input type='text' name='createName' placeholder='Nome Completo' ref={createName} />
                    <input type='text' name='createEmail' placeholder='Email' ref={createEmail} />
                    <input type='password' name='createPassword' placeholder='Senha' ref={createPassword} />
                    {/* <input type='password' name='createPassword' placeholder='Senha' ref={createPassword} /> */}
                    <input type='submit' id='btnSubmit' value="Criar Conta" />
                    <input type='button' id='btnSubmit' value="Cancelar" />
                </form>
            }



        </>
    )
}


