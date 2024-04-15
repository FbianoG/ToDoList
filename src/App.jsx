import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Error from './pages/Error'



function App() {

  const URLBack = "https://to-do-list-back-coral.vercel.app"


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home url={URLBack} />} />
        <Route path="/createUser" element={<App url={URLBack}/>} />
        <Route path="/tasks" element={<Tasks url={URLBack}/>} />
        <Route path="/error" element={<Error url={URLBack}/>} />
      </Routes>
    </Router>
  )
}

export default App
