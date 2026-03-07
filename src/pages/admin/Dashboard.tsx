import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { supabase } from "../../lib/supabase"

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  Grid
} from "@mui/material"

import DashboardIcon from "@mui/icons-material/Dashboard"
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom"
import EventIcon from "@mui/icons-material/Event"
import PeopleIcon from "@mui/icons-material/People"

import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"

const drawerWidth = 240

export default function Dashboard() {

  const [currentTab, setCurrentTab] = useState(0)

  /* Queries */

  const { data: rooms } = useQuery({
    queryKey: ["admin-rooms"],
    queryFn: async () => {
      const { data, error } = await supabase.from("rooms").select("*")
      if (error) throw error
      return data
    }
  })

  const { data: bookings } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          date,
          start_time,
          end_time,
          profiles (nome,email),
          rooms (name)
        `)

      if (error) throw error
      return data
    }
  })

  const { data: users } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*")
      if (error) throw error
      return data
    }
  })

  /* Overview */

  const renderOverview = () => {

    return (

      <Box>

        <Typography variant="h5" mb={3} fontWeight="bold">
          Visão Geral do Sistema
        </Typography>

        {/* CARDS */}

        <Grid container spacing={3} mb={4}>

          <Grid>
            <Paper sx={{ p:3, borderRadius:3 }}>
              <Typography variant="subtitle2">Salas</Typography>
              <Typography variant="h4" fontWeight="bold">
                {rooms?.length || 0}
              </Typography>
            </Paper>
          </Grid>

          <Grid>
            <Paper sx={{ p:3, borderRadius:3 }}>
              <Typography variant="subtitle2">Reservas</Typography>
              <Typography variant="h4" fontWeight="bold">
                {bookings?.length || 0}
              </Typography>
            </Paper>
          </Grid>

          <Grid>
            <Paper sx={{ p:3, borderRadius:3 }}>
              <Typography variant="subtitle2">Usuários</Typography>
              <Typography variant="h4" fontWeight="bold">
                {users?.length || 0}
              </Typography>
            </Paper>
          </Grid>

        </Grid>

        {/* Últimas Reservas */}

        <Paper sx={{ p:4, borderRadius:3 }}>

          <Typography variant="h6" mb={3}>
            Últimas Reservas
          </Typography>

          <Table>

            <TableHead>

              <TableRow>
                <TableCell>Sala</TableCell>
                <TableCell>Usuário</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {bookings?.slice(0,5).map((booking:any) => (

                <TableRow key={booking.id}>

                  <TableCell>
                    {booking.rooms?.name}
                  </TableCell>

                  <TableCell>
                    {booking.profiles?.nome || booking.profiles?.email}
                  </TableCell>

                  <TableCell>
                    {booking.date}
                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </Paper>

      </Box>

    )

  }

  /* Salas */

  const renderRooms = () => {

    return (

      <Paper sx={{ p:4, borderRadius:3 }}>

        <Box display="flex" justifyContent="space-between" mb={3}>

          <Typography variant="h6" fontWeight="bold">
            Gerenciar Salas
          </Typography>

          <Button variant="contained" startIcon={<AddIcon />}>
            Nova Sala
          </Button>

        </Box>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {rooms?.map((room:any)=>(
              <TableRow key={room.id} hover>

                <TableCell>{room.id}</TableCell>
                <TableCell>{room.name}</TableCell>
                <TableCell>R$ {room.price}</TableCell>

                <TableCell align="right">

                  <IconButton color="primary">
                    <EditIcon/>
                  </IconButton>

                  <IconButton color="error">
                    <DeleteIcon/>
                  </IconButton>

                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </Paper>

    )

  }

  /* Reservas */

  const renderBookings = () => {

    return (

      <Paper sx={{ p:4, borderRadius:3 }}>

        <Typography variant="h6" mb={3} fontWeight="bold">
          Histórico de Reservas
        </Typography>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>Sala</TableCell>
              <TableCell>Usuário</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {bookings?.map((booking:any)=>(
              <TableRow key={booking.id} hover>

                <TableCell>{booking.rooms?.name}</TableCell>
                <TableCell>{booking.profiles?.nome || booking.profiles?.email}</TableCell>
                <TableCell>{booking.date}</TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </Paper>

    )

  }

  /* Usuários */

  const renderUsers = () => {

    return (

      <Paper sx={{ p:4, borderRadius:3 }}>

        <Typography variant="h6" mb={3} fontWeight="bold">
          Usuários
        </Typography>

        <Table>

          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Função</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {users?.map((user:any)=>(
              <TableRow key={user.id} hover>

                <TableCell>{user.id.substring(0,8)}...</TableCell>
                <TableCell>{user.nome || "Sem nome"}</TableCell>
                <TableCell>
                  {user.role === "admin" ? "Administrador" : "Cliente"}
                </TableCell>

              </TableRow>
            ))}

          </TableBody>

        </Table>

      </Paper>

    )

  }

  /* Render */

  const renderContent = () => {

    if(currentTab === 0) return renderOverview()
    if(currentTab === 1) return renderRooms()
    if(currentTab === 2) return renderBookings()
    if(currentTab === 3) return renderUsers()

  }

  return (

    <Box sx={{ display:"flex", bgcolor:"#f4f6f8", minHeight:"100vh" }}>

      {/* SIDEBAR */}

      <Drawer
        variant="permanent"
        sx={{
          width:drawerWidth,
          "& .MuiDrawer-paper":{
            width:drawerWidth,
            background:"#0d47a1",
            color:"white"
          }
        }}
      >

        <Box sx={{p:3}}>

          <Typography variant="h6" fontWeight="bold">
            EspaçoTech Admin
          </Typography>

        </Box>

        <List>

          <ListItemButton selected={currentTab===0} onClick={()=>setCurrentTab(0)}>
            <DashboardIcon sx={{mr:2}}/>
            <ListItemText primary="Dashboard"/>
          </ListItemButton>

          <ListItemButton selected={currentTab===1} onClick={()=>setCurrentTab(1)}>
            <MeetingRoomIcon sx={{mr:2}}/>
            <ListItemText primary="Salas"/>
          </ListItemButton>

          <ListItemButton selected={currentTab===2} onClick={()=>setCurrentTab(2)}>
            <EventIcon sx={{mr:2}}/>
            <ListItemText primary="Reservas"/>
          </ListItemButton>

          <ListItemButton selected={currentTab===3} onClick={()=>setCurrentTab(3)}>
            <PeopleIcon sx={{mr:2}}/>
            <ListItemText primary="Usuários"/>
          </ListItemButton>

        </List>

      </Drawer>

      {/* CONTENT */}

      <Box sx={{flexGrow:1, p:4}}>

        {renderContent()}

      </Box>

    </Box>

  )

}