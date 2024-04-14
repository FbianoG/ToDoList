import { useEffect, useRef, useState } from 'react'


export default function Home() {

  const task = useRef()
  const category = useRef()
  const check = useRef()
  const formCreateTask = useRef()

  const [Tasks, setTasks] = useState([])
  const [taskForm, setTaskForm] = useState(false)



  function changeBg(e) {
    if (e) {
      return "taskCheck"
    }
  }

  async function changeCheck(e) {
    const taskId = e.target.id;
    const value = e.target.checked

    const updatedTasks = Tasks.map(element => {
      if (element._id === taskId) {
        return { ...element, check: value };
      } else {
        return { ...element };
      }
    })
    const token = localStorage.getItem("Token")
    const response = await fetch(`http://localhost:3000/updateTasks`, {
      method: "POST",
      body: JSON.stringify({ token, tasks: updatedTasks }),
      headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    console.log(data)
    setTasks(updatedTasks)
  }

  async function getTasks() {
    const token = localStorage.getItem("Token")
    const response = await fetch(`http://localhost:3000/getTasks`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" }
    })
    if (response.ok) {
      const data = await response.json()
      setTaskForm(false)
      setTasks(data)
    } else if (response.status === 500) {
      location.href = "/"
    } else if (response.status === 401) {
      location.href = "/"
    }

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

  async function deleteTask(e) {
    if (e.target.checked) {
      e.target.setAttribute("checked", "false")
    }
    const token = localStorage.getItem("Token")
    const newTasks = Tasks.filter(element => element._id !== e.target.id)
    setTasks(newTasks)
    const response = await fetch(`http://localhost:3000/deleteTask`, {
      method: "POST",
      body: JSON.stringify({ token, tasks: newTasks }),
      headers: { "Content-Type": "application/json" }
    })
    const data = await response.json()
    console.log(data)

  }


  useEffect(() => {
    getTasks()
  }, [])



  return (
    <>
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
              <input id={element._id} value="" type="checkbox" checked onChange={changeCheck} ref={check} />
              :
              <input id={element._id} value="" type="checkbox" onChange={changeCheck} ref={check} />
            }
            <button onClick={deleteTask} id={element._id}>Excluir</button>
          </div>
        ))}
      </div >
    </>
  )
}


