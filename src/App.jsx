import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import LawinoAI from './pages/LawinoAI/LawinoAI'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="lawino-ai" element={<LawinoAI />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        {/* Future routes like Community, etc. will go here */}
      </Route>
    </Routes>
  )
}

export default App
