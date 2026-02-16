import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/public/Home'
import Dashboard from './pages/admin/Dashboard'
import './styles/main.css'
import AdminRoute from './components/AdminRouter'


export default function App() {

  return (
    <BrowserRouter>
      {/* Navbar Provisória para navegar durante o desenvolvimento */}
      <nav className="space-x-3">
        <Link to="/" className="text-blue-700">Site Cliente</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Route element={<AdminRoute />}>
          <Route path="/admin" element={<Dashboard />} />
      </Route>

      <footer className="space-x-3">
        <Link to="/admin" className="text-blue-700">Área Admin</Link>
      </footer>
    </BrowserRouter>
  )
}

