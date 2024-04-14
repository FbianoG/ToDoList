import { useEffect, useRef, useState } from 'react'


export default function Home() {

  const [taskForm, setTaskForm] = useState(false)
  const task = useRef()
  const category = useRef()
  const check = useRef()
  const formCreate = useRef()
  const createEmail = useRef()
  const createPassword = useRef()
  const createName = useRef()
  const btnSubmit = useRef()
  const formLogin = useRef()
  const loginEmail = useRef()
  const loginPassword = useRef()
  const formCreateTask = useRef()

  const [Tasks, setTasks] = useState([])



  function changeBg(params) {
    if (params) {
      return "taskCheck"
    }
  }

  function changeCheck(e) {
    const taskId = e.target.id;
    const value = e.target.checked
    console.log(value);
    const updatedTasks = Tasks.map(element => {
      if (element._id === taskId) {
        return { ...element, check: value };
      } else {
        return { ...element };
      }
    });
  }

  async function createUser(e) {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/createUser`, {
      method: "POST",
      body: JSON.stringify({ email: createEmail.current.value, password: createPassword.current.value, name: createName.current.value }),
      headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    console.log(data)

  }

  async function login(e) {
    e.preventDefault()
    const response = await fetch(`http://localhost:3000/login`, {
      method: "POST",
      body: JSON.stringify({ email: loginEmail.current.value, password: loginPassword.current.value }),
      headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    console.log(data)
    localStorage.setItem("Token", data.token)
    await getTasks(data.token)
  }

  async function getTasks(token) {
    const response = await fetch(`http://localhost:3000/getTasks`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    setTasks(data)
  }

  async function createTask(e) {
    e.preventDefault()
    const token = localStorage.getItem("Token")
    const response = await fetch(`http://localhost:3000/createTask`, {
      method: "POST",
      body: JSON.stringify({ token, task: task.current.value, category: category.current.value }),
      headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    console.log(data);
    getTasks(token)
  }


  useEffect(() => {
  }, [Tasks])


  return (
    <>
      <form ref={formCreate} onSubmit={createUser}>
        <input type='text' name='createEmail' placeholder='Email' ref={createEmail} />
        <input type='password' name='createPassword' placeholder='Senha' ref={createPassword} />
        <input type='text' name='createName' placeholder='Nome Completo' ref={createName} />
        <input type='submit' name='createName' ref={btnSubmit} />
      </form>

      <form ref={formLogin} onSubmit={login}>
        <input type='text' name='loginEmail' placeholder='Email' ref={loginEmail} />
        <input type='password' name='loginPassword' placeholder='Senha' ref={loginPassword} />
        <input type='submit' name='loginName' ref={btnSubmit} />
      </form>


      <div className="taskForm">
        {!taskForm ?
          <button onClick={() => setTaskForm(true)}>+</button>
          :
          <>
            <form ref={formCreateTask} onSubmit={createTask}>
              <input type='text' name='task' placeholder='Tarefa' ref={task} />
              <input type='text' name='category' placeholder='Categoria' ref={category} />
              <input type='submit' value="Criar Tarefa" id='btnSubmit' />
              <input type='button' name='' value="Cancelar" id='btnCancel' onClick={() => setTaskForm(false)} />
            </form>
          </>
        }

      </div>
      <div className="taskList">
        {Tasks.map(element => (
          <div key={element._id} className='taskCard' id={changeBg(element.check)}>
            <div className="taskData">
              <h3>{element.task}</h3>
              <legend>{element.category}</legend>
              <span>Criado em: {element.date.slice(0, 10).split("-").reverse().join("/")}</span>
            </div>

            {element.check ?
              <input id={element._id} type="checkbox" checked onChange={changeCheck} ref={check} value="" />
              :
              <input id={element._id} type="checkbox" onClick={changeCheck} ref={check} />
            }
            <button>Excluir</button>
          </div>
        ))}
      </div>

    </>
  )
}


