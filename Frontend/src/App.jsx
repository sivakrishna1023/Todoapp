import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar'
import Input from './Components/Input'
import Login from './Components/Login'
import Register from './Components/Register'
function App() {
  return (
    <>
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path="/" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/Tasks" element={<Input/>} />
        </Routes>
      </Router>
    </>
  )
}
export default App
