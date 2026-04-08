import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isWorkspacePage = location.pathname === '/lawino-ai' || location.pathname === '/messages';

  return (
    <div className="layout-root">
      {!isAuthPage && <Navbar />}
      <main className="content">
        <Outlet />
      </main>
      {!isAuthPage && !isWorkspacePage && <Footer />}

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
