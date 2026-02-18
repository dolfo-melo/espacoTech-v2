import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"  
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from "@mui/material"

export default function Navbar(){

    const navigate = useNavigate()
    const [user, setUser]= useState<any>(null)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    // Observador de Estados => Login || Logout
    useEffect(() =>{
        supabase.auth.getUser().then(({data}) => {
            setUser(data.user)
        })

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)        
        })
    
        return() => subscription.unsubscribe()
    })

    // Function Dropdown
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    // Logout
    const handleLogout = async () => {
        await supabase.auth.signOut()
        handleCloseMenu()
        navigate("/")
    }

    return(
        <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        {/* Logo / Home Link */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#1976d2' }}>
            <img src="../public/logoEspacoTech" alt="" />
          </Link>
        </Typography>

        {/* Lógica Condicional: Logado vs Visitante */}
        {user ? (
          <Box display="flex" alignItems="center" gap={1}>
             {/* Verifica se é Admin para mostrar botão extra */}
             {/* Nota: Idealmente checaríamos a role 'admin' aqui também, 
                 mas para simplificar o visual, deixamos o link acessível e o AdminRoute protege. */}
             <Button color="inherit" component={Link} to="/admin">
               Painel Admin
             </Button>

            <Typography variant="body2" sx={{ mr: 1, display: { xs: 'none', sm: 'block' } }}>
              Olá, <strong>{user.user_metadata?.nome || 'Usuário'}</strong>
            </Typography>

            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
            </IconButton>

            {/* Menu Dropdown */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem disabled>{user.email}</MenuItem>
              <MenuItem onClick={handleLogout}>Sair (Logout)</MenuItem>
            </Menu>
          </Box>
        ) : (
          <Box display="flex" gap={1}>
            <Button color="primary" component={Link} to="/login">
              Entrar
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to="/login"
              // Passamos um estado para o Login saber que deve abrir na aba "Cadastro"
              state={{ isSignUp: true }} 
            >
              Criar Conta
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
    )

}