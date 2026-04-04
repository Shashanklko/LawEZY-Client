import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import LawinoAI from './pages/LawinoAI'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="lawino-ai" element={<LawinoAI />} />
        {/* Future routes like Community, etc. will go here */}
      </Route>
    </Routes>
  )
}

export default App
