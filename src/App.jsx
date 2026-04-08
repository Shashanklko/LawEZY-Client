import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import LawinoAI from './pages/LawinoAI/LawinoAI'
import Login from './pages/Auth/Login/Login'
import Signup from './pages/Auth/Signup/Signup'
import ExpertListing from './pages/Experts/ExpertListing'
import ExpertProfile from './pages/Experts/ExpertProfile'
import Messages from './pages/Messages/Messages'
import Library from './pages/Library/Library'
import Community from './pages/Community/Community'
import About from './pages/About/About'
import FAQ from './pages/FAQ/FAQ'
import Contact from './pages/Contact/Contact'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="lawino-ai" element={<LawinoAI />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="experts" element={<ExpertListing />} />
        <Route path="expert/:id" element={<ExpertProfile />} />
        <Route path="messages" element={<Messages />} />
        <Route path="library" element={<Library />} />
        <Route path="community" element={<Community />} />
        <Route path="about" element={<About />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
        {/* Future routes like Community, etc. will go here */}
      </Route>
    </Routes>
  )
}

export default App
