import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Stack } from "@mui/material"
import GroupsIcon from "@mui/icons-material/Groups"
import VideocamIcon from "@mui/icons-material/Videocam"
import WifiIcon from "@mui/icons-material/Wifi"
import { motion } from "framer-motion"

export function RoomsSection() {

  /* Dados das salas
  futuramente você pode puxar isso da API */
  const salas = [
    {
      nome: "Sala Inovação",
      descricao: "Perfeita para reuniões estratégicas e brainstorm.",
      capacidade: "10 pessoas",
      imagem: "/images/sala1.jpg"
    },
    {
      nome: "Sala Criativa",
      descricao: "Espaço moderno ideal para workshops e colaboração.",
      capacidade: "15 pessoas",
      imagem: "/images/sala2.jpg"
    },
    {
      nome: "Auditório Tech",
      descricao: "Ambiente amplo para palestras e apresentações.",
      capacidade: "40 pessoas",
      imagem: "/images/sala3.jpg"
    }
  ]

  return (
    <Box
      id="salas"
      sx={{
        py: 12,
        px: { xs: 4, md: 10, lg: 20 },
        background: "linear-gradient(180deg,#f6f7fb,#ffffff)"
      }}
    >

      {/* Título da seção */}
      <Typography
        variant="h3"
        fontWeight="bold"
        mb={2}
        textAlign="center"
      >
        Salas Disponíveis
      </Typography>

      <Typography
        textAlign="center"
        color="text.secondary"
        mb={8}
      >
        Escolha o ambiente ideal para sua reunião, evento ou workshop.
      </Typography>


      {/* GRID DE SALAS */}
      <Grid container spacing={5}>

        {salas.map((sala, index) => (

          <Grid key={index}>

            {/* ANIMAÇÃO DE ENTRADA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
            >

              <Card
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  transition: "all 0.35s",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",

                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.18)"
                  }
                }}
              >

                {/* IMAGEM */}
                <CardMedia
                  component="img"
                  height="200"
                  image={sala.imagem}
                />

                <CardContent sx={{ p: 3 }}>

                  {/* NOME DA SALA */}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                  >
                    {sala.nome}
                  </Typography>

                  {/* DESCRIÇÃO */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={1}
                    mb={2}
                  >
                    {sala.descricao}
                  </Typography>


                  {/* RECURSOS */}
                  <Stack
                    direction="row"
                    spacing={2}
                    mb={3}
                    alignItems="center"
                    color="text.secondary"
                    fontSize={14}
                  >

                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <GroupsIcon fontSize="small" />
                      {sala.capacidade}
                    </Stack>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <WifiIcon fontSize="small" />
                      Wi-Fi
                    </Stack>

                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <VideocamIcon fontSize="small" />
                      TV
                    </Stack>

                  </Stack>


                  {/* BOTÃO */}
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      borderRadius: "30px",
                      backgroundColor: "#3f51b5",
                      textTransform: "none",
                      fontWeight: "bold",

                      "&:hover": {
                        backgroundColor: "#303f9f"
                      }
                    }}
                  >
                    Reservar sala
                  </Button>

                </CardContent>

              </Card>

            </motion.div>

          </Grid>
        ))}

      </Grid>

    </Box>
  )
}