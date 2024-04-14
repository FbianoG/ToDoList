import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Error from './pages/Error'



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createUser" element={<App />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/error" element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
