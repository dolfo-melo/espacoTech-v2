import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/public/Home'
import Dashboard from './pages/admin/Dashboard'
import AdminRoute from './components/AdminRouter'
import Login from './pages/Login'
import Navbar from './components/NavBar'
import './main.css'
import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2563eb', // Um azul moderno (Tailwind blue-600)
    },
  },
});

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<Dashboard />} />
          </Route>
        </Routes>

        <footer className="space-x-3">
          <Link to="/login" className="text-blue-700">Área Admin</Link>
        </footer>
      </BrowserRouter>
    </ThemeProvider>
  )
}

