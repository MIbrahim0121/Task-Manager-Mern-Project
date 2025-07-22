import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Landing from './pages/Landing/Landing.jsx'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import About from './pages/About/About.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return ( <div>
    <Routes>
      <Route path="/" element={<Landing/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/about" element={<About/>} />
    </Routes>
          <ToastContainer position="top-center" autoClose={1500} />

    </div>
  )
}

export default App