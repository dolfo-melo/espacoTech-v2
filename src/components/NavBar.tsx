import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../lib/supabase"
import BookingModal from "./BookingModal"

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { motion } from "framer-motion"

export default function Navbar() {

  const navigate = useNavigate()

  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [openBookings, setOpenBookings] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isMobile = useMediaQuery("(max-width:900px)")

  /* ===================================== */
  /* Verifica sessão e role do usuário     */
  /* ===================================== */

  useEffect(() => {

    const checkSessionAndRole = async (sessionUser: any) => {

      setUser(sessionUser)

      if (sessionUser) {

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", sessionUser.id)
          .single()

        setIsAdmin(profile?.role === "admin")

      } else {
        setIsAdmin(false)
      }

    }

    supabase.auth.getUser().then(({ data }) => checkSessionAndRole(data.user))

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, session) => {
        checkSessionAndRole(session?.user ?? null)
      })

    return () => subscription.unsubscribe()

  }, [])

  /* ===================================== */
  /* Funções de menu                       */
  /* ===================================== */

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    handleCloseMenu()
    navigate("/")
  }

  const handleOpenBookings = () => {
    setOpenBookings(true)
    handleCloseMenu()
  }

  const userName = user?.user_metadata?.nome || user?.email || "Usuário"

  const avatarUrl =
    `https://api.dicebear.com/9.x/initials/svg?seed=${userName}`

  /* ===================================== */
  /* Tema                                  */
  /* ===================================== */

  const theme = createTheme({
    palette: {
      primary: { main: "#0d47a1" },
      secondary: { main: "#FFA726" }
    }
  })

  return (

    <ThemeProvider theme={theme}>

      {/* ===================================== */}
      {/* Navbar com animação                   */}
      {/* ===================================== */}

      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >

        <AppBar
          position="fixed"
          elevation={2}
          sx={{
            backgroundColor: "white",
            paddingX: 3
          }}
        >

          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

            {/* ===================================== */}
            {/* BOTÃO MENU MOBILE */}
            {/* ===================================== */}

            {isMobile && (
              <IconButton
                edge="start"
                onClick={() => setMobileOpen(true)}
                sx={{ color: "primary.main" }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* ===================================== */}
            {/* LOGO */}
            {/* ===================================== */}

            <Box
              sx={{
                flexGrow: isMobile ? 1 : 0,
                display: "flex",
                justifyContent: isMobile ? "center" : "flex-start"
              }}
            >

              <Link to="/">
                <img
                  src="/logoEspacoTech.png"
                  alt="Logo"
                  style={{
                    height: 60,
                    display: "block"
                  }}
                />
              </Link>

            </Box>

            {/* ===================================== */}
            {/* MENU DESKTOP */}
            {/* ===================================== */}

            {!isMobile && (

              user ? (

                <Box display="flex" alignItems="center" gap={2}>

                  <motion.div whileHover={{ scale: 1.05 }}>

                    <Box
                      display="flex"
                      alignItems="center"
                      gap={1}
                      onClick={handleMenu}
                      sx={{ cursor: "pointer" }}
                    >

                      <Typography
                        fontWeight="bold"
                        sx={{ color: "primary.main" }}
                      >
                        Olá, {userName}
                      </Typography>

                      <Avatar src={avatarUrl} />

                    </Box>

                  </motion.div>

                  {/* Menu dropdown */}

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                  >

                    <MenuItem disabled>
                      {user?.email}
                    </MenuItem>

                    <Divider />

                    {isAdmin ? (

                      <MenuItem
                        component={Link}
                        to="/admin"
                        onClick={handleCloseMenu}
                      >
                        Painel Admin
                      </MenuItem>

                    ) : (

                      <MenuItem onClick={handleOpenBookings}>
                        Minhas Reservas
                      </MenuItem>

                    )}

                    <MenuItem onClick={handleLogout} sx={{ color: "red" }}>
                      Logout
                    </MenuItem>

                  </Menu>

                </Box>

              ) : (

                <Box display="flex" gap={2}>

                  <Button
                    component={Link}
                    to="/login"
                    color="primary"
                    sx={{ fontWeight: "bold" }}
                  >
                    ENTRAR
                  </Button>

                  <motion.div whileHover={{ scale: 1.05 }}>

                    <Button
                      variant="contained"
                      component={Link}
                      to="/register"
                      sx={{
                        backgroundColor: "#FFA726",
                        color: "#0d47a1",
                        fontWeight: "bold"
                      }}
                    >
                      CADASTRAR
                    </Button>

                  </motion.div>

                </Box>

              )

            )}

          </Toolbar>

        </AppBar>

      </motion.div>

      {/* ===================================== */}
      {/* DRAWER MOBILE */}
      {/* ===================================== */}

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >

        <Box sx={{ width: 260 }}>

          <List>

            {!user && (
              <>
                <ListItem component={Link} to="/login">
                  <ListItemText primary="Entrar" />
                </ListItem>

                <ListItem component={Link} to="/register">
                  <ListItemText primary="Cadastrar" />
                </ListItem>
              </>
            )}

            {user && (
              <>
                {isAdmin ? (

                  <ListItem  component={Link} to="/admin">
                    <ListItemText primary="Painel Admin" />
                  </ListItem>

                ) : (

                  <ListItem onClick={handleOpenBookings}>
                    <ListItemText primary="Minhas Reservas" />
                  </ListItem>

                )}

                <ListItem onClick={handleLogout}>
                  <ListItemText primary="Logout" />
                </ListItem>

              </>
            )}

          </List>

        </Box>

      </Drawer>

      {/* ===================================== */}
      {/* MODAL DE RESERVAS */}
      {/* ===================================== */}

      {user && !isAdmin && (

        <BookingModal
          open={openBookings}
          onClose={() => setOpenBookings(false)}
          userId={user.id}
        />

      )}

    </ThemeProvider>

  )
}