import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/public/Home'
import Dashboard from './pages/admin/Dashboard'
import './main.css'
import AdminRoute from './components/AdminRouter'
import LoginAdmin from './pages/admin/LoginAdmin'


export default function App() {

  return (
    <BrowserRouter>
      {/* Navbar Provisória para navegar durante o desenvolvimento */}
      <nav className="space-x-3  max-w-dvw max-h-8/12">
        <Link to="/" className="">
          <img className="w-30 h-30" src="public/logoEspacoTech.png" alt="" />
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AdminRoute />}>
          <Route path="/loginAdmin" element={<LoginAdmin />} />
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Routes>

      <footer className="space-x-3">
        <Link to="/admin" className="text-blue-700">Área Admin</Link>
      </footer>
    </BrowserRouter>
  )
}

