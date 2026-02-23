import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import BookingModal from './BookingModal'
import { 
  AppBar, Toolbar, Typography, Button, Menu, MenuItem, Avatar, Box, Divider 
} from '@mui/material'

export default function Navbar() {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openBookings, setOpenBookings] = useState(false)

  // Escutar alterações de Login/Logout e checar a Role
  useEffect(() => {
    const checkSessionAndRole = async (sessionUser: any) => {
      setUser(sessionUser)
      if (sessionUser) {
        
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', sessionUser.id)
          .single()
        setIsAdmin(profile?.role === 'admin');
      } else {
        setIsAdmin(false)
      }
    };

    supabase.auth.getUser().then(({ data }) => checkSessionAndRole(data.user))

    // Ouve mudanças (Login/Logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      checkSessionAndRole(session?.user ?? null)
    });

    return () => subscription.unsubscribe()
  }, []);

  // 2. Funções de Menu e Logout
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleCloseMenu = () => setAnchorEl(null)

  const handleLogout = async () => {
    await supabase.auth.signOut()
    handleCloseMenu()
    navigate('/')
  };

  const handleOpenBookings = () => {
    setOpenBookings(true)
    handleCloseMenu()
  }

  const userName = user?.user_metadata?.nome || user?.email || 'Usuário'
  const avatarUrl = `https://api.dicebear.com/9.x/initials/svg?seed=${userName}`

  return (
    <>
      <AppBar position="static" color="default" elevation={1} sx={{padding: 2}}>
        <Toolbar>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#1976d2'}}>
              <img src="public\logoEspacoTech.png" alt="Logo do Espaço Tech" width={'80px'} height={'80px'}/>
            </Link>
          </Typography>

          {/* Logado vs Visitante */}
          {user ? (
            <Box display="flex" alignItems="center" gap={2}>
              
              {isAdmin && (
                <Button color="primary" variant="outlined" component={Link} to="/admin">
                  Painel Admin
                </Button>
              )}

              {/* Área do Perfil */}
              <Box 
                display="flex" 
                alignItems="center" 
                gap={1} 
                onClick={handleMenu} 
                sx={{ 
                  cursor: 'pointer', 
                  padding: '4px 8px', 
                  borderRadius: '8px', 
                  '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' } 
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Olá, {userName}
                </Typography>
                <Avatar src={avatarUrl} alt={userName} sx={{ width: 36, height: 36, marginRight: 3 }} />
              </Box>

              {/* Menu Dropdown */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem disabled sx={{ fontSize: '0.85rem', color: 'gray' }}>
                  {user.email}
                </MenuItem>
                <Divider />
                
                {/* Botão de Minhas Reservas */}
                <MenuItem onClick={handleOpenBookings} sx={{ fontWeight: 'bold' }}>
                  Minhas Reservas
                </MenuItem>
                
                <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>
                  Sair (Logout)
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box display="flex" gap={1}>
              <Button color="primary" component={Link} to="/login">
                Entrar
              </Button>
              <Button variant="contained" color="primary" component={Link} to="/login" state={{ isSignUp: true }}>
                Criar Conta
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Renderiza o Modal */}
      {user && (
        <BookingModal 
          open={openBookings} 
          onClose={() => setOpenBookings(false)} 
          userId={user.id} 
        />
      )}
    </>
  );
}