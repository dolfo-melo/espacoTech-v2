import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { supabase } from '../../lib/supabase'
import { 
  AppBar, Toolbar, Typography, Button, Tabs, Tab, Box, Paper, Table, 
  TableHead, TableRow, TableCell, TableBody, CircularProgress 
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'

export default function Dashboard() {
  const navigate = useNavigate();
  
  const [currentTab, setCurrentTab] = useState(0)

  // LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  };

  // BUSCAS DE DADOS (TanStack Query)
  // Busca de Salas
  const { data: rooms, isLoading: loadingRooms } = useQuery({
    queryKey: ['admin-rooms'],
    queryFn: async () => {
      const { data, error } = await supabase.from('rooms').select('*')
      if (error) throw error
      return data
    }
  });

  // Busca de Reservas
  const { data: bookings, isLoading: loadingBookings } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
     
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id, date, start_time, end_time,
          profiles (nome, email),
          rooms (name)
        `);
      if (error) throw error
      return data
    }
  });

  // Busca de Usuários
  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*')
      if (error) throw error
      return data
    }
  });

  // === RENDERIZAÇÃO DAS ABAS ===
  const renderContent = () => {
    if (currentTab === 0) {
      // TAB: SALAS
      return (
        <Paper className="p-4 mt-4">
          <Typography variant="h6" className="mb-4">Gerenciar Salas</Typography>
          {loadingRooms ? <CircularProgress /> : (
            <Table>
              <TableHead><TableRow><TableCell>ID</TableCell><TableCell>Nome</TableCell><TableCell>Preço</TableCell></TableRow></TableHead>
              <TableBody>
                {rooms?.map((room: any) => (
                  <TableRow key={room.id}>
                    <TableCell>{room.id}</TableCell>
                    <TableCell>{room.name}</TableCell>
                    <TableCell>R$ {room.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <Button variant="contained" sx={{ mt: 2 }}>+ Nova Sala</Button>
        </Paper>
      );
    } 
    
    if (currentTab === 1) {
      // TAB: RESERVAS
      return (
        <Paper className="p-4 mt-4">
          <Typography variant="h6" className="mb-4">Histórico de Reservas</Typography>
          {loadingBookings ? <CircularProgress /> : (
            <Table>
              <TableHead><TableRow><TableCell>ID</TableCell><TableCell>Sala</TableCell><TableCell>Usuário</TableCell><TableCell>Data/Hora</TableCell></TableRow></TableHead>
              <TableBody>
                {bookings?.map((booking: any) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.rooms?.name}</TableCell>
                    <TableCell>{booking.profiles?.nome || booking.profiles?.email}</TableCell>
                    <TableCell>{booking.date} ({booking.start_time} - {booking.end_time})</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      );
    }

    if (currentTab === 2) {
      // TAB: USUÁRIOS
      return (
        <Paper className="p-4 mt-4">
          <Typography variant="h6" className="mb-4">Gerenciar Usuários</Typography>
          {loadingUsers ? <CircularProgress /> : (
            <Table>
              <TableHead><TableRow><TableCell>ID</TableCell><TableCell>Nome</TableCell><TableCell>Função (Role)</TableCell></TableRow></TableHead>
              <TableBody>
                {users?.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id.substring(0, 8)}...</TableCell>
                    <TableCell>{user.nome || 'Sem nome'}</TableCell>
                    <TableCell>{user.role === 'admin' ? 'Administrador' : 'Cliente'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      );
    }
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      
      <AppBar position="static" color="primary">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Admin Hub - Coworking Space
          </Typography>
      </AppBar>

      {/* SISTEMA DE NAVEGAÇÃO ENTRE AS TABELAS */}
      <Box sx={{ width: '100%', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTab} onChange={(_e, newValue) => setCurrentTab(newValue)} centered>
          <Tab label="Salas" />
          <Tab label="Reservas" />
          <Tab label="Usuários" />
        </Tabs>
      </Box>

      {/* ÁREA DE CONTEÚDO */}
      <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
        {renderContent()}
      </Box>
    </Box>
  );
}