import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <div className="layout-root">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>

      <style jsx="true">{`
        .layout-root {
          width: 100%;
          height: 100vh;
          background: var(--primary-bg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .content {
          flex: 1;
          width: 100%;
          overflow: hidden;
          position: relative;
        }
      `}</style>
    </div>
  )
}

export default MainLayout
