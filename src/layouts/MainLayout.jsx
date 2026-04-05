import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="layout-root">
      {!isAuthPage && <Navbar />}
      <main className="content">
        <Outlet />
      </main>

      <style jsx="true">{`
        .layout-root {
          width: 100%;
          min-height: 100vh;
          background: var(--primary-bg);
          display: flex;
          flex-direction: column;
        }
        .content {
          flex: 1;
          width: 100%;
          position: relative;
        }
      `}</style>
    </div>
  )
}

export default MainLayout
