import { Box, Typography, Grid, Card, CardMedia, CardContent, Button, Stack } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import VideocamIcon from "@mui/icons-material/Videocam";
import WifiIcon from "@mui/icons-material/Wifi";
import { motion } from "framer-motion";

// Componente para a Onda Decorativa
const WaveDivider = () => (
  <Box sx={{ position: 'absolute', top: -1, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '60px', fill: '#ffffff', transform: 'rotate(180deg)' }}>
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
    </svg>
  </Box>
);

export function RoomsSection() {
  const salas = [
    {
      nome: "Sala Inovação",
      descricao: "Perfeita para reuniões estratégicas, brainstormings criativos e tomadas de decisão importantes.",
      capacidade: "10 pessoas",
      imagem: "/images/sala1.jpg"
    },
    {
      nome: "Sala Criativa",
      descricao: "Um espaço moderno e disruptivo, ideal para workshops imersivos e colaboração em equipe.",
      capacidade: "15 pessoas",
      imagem: "/images/sala2.jpg"
    },
    {
      nome: "Auditório Tech",
      descricao: "Ambiente amplo e tecnológico para palestras, apresentações de impacto e eventos corporativos.",
      capacidade: "40 pessoas",
      imagem: "/images/sala3.jpg"
    }
  ];

  return (
    <Box
      id="salas"
      sx={{
        position: 'relative', // Necessário para a onda absoluta
        py: 15,
        px: { xs: 2, md: 5, lg: 10 },
        background: "linear-gradient(180deg, #f0f2f8 0%, #ffffff 100%)",
      }}
    >
      <WaveDivider />

      {/* Título da seção */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h3" fontWeight="bold" mb={2} textAlign="center">
          Salas Disponíveis
        </Typography>

        <Typography textAlign="center" color="text.secondary" mb={10} sx={{ maxWidth: 600, mx: 'auto' }}>
          Escolha o ambiente ideal para sua reunião, evento ou workshop com toda a infraestrutura necessária.
        </Typography>
      </motion.div>

      {/* GRID DE SALAS CENTRALIZADO */}
      <Grid container spacing={4} justifyContent="center">
        {salas.map((sala, index) => (
          <Grid key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              style={{ width: '100%', maxWidth: '400px' }} // Aumenta a largura máxima do card
            >
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 6, // Cantos mais arredondados
                  display: 'flex',
                  flexDirection: 'column',
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.05)",
                  "&:hover": {
                    transform: "translateY(-15px)",
                    boxShadow: "0 25px 60px rgba(63, 81, 181, 0.2)"
                  }
                }}
              >
                <CardMedia
                  component="img"
                  height="240" // Imagem maior
                  image={sala.imagem}
                  sx={{ transition: '0.4s', "&:hover": { transform: 'scale(1.05)' } }}
                />

                <CardContent sx={{ p: 4, flexGrow: 1 }}> {/* Aumentado o padding interno */}
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {sala.nome}
                  </Typography>

                  <Typography variant="body1" color="text.secondary" mb={3} sx={{ minHeight: '3em' }}>
                    {sala.descricao}
                  </Typography>

                  <Stack direction="row" spacing={3} mb={4} color="primary.main" fontWeight="medium">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <GroupsIcon fontSize="small" />
                      <Typography variant="caption" fontWeight="bold">{sala.capacidade}</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <WifiIcon fontSize="small" />
                      <Typography variant="caption" fontWeight="bold">Wi-Fi</Typography>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <VideocamIcon fontSize="small" />
                      <Typography variant="caption" fontWeight="bold">TV</Typography>
                    </Stack>
                  </Stack>

                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    sx={{
                      borderRadius: "15px",
                      backgroundColor: "#3f51b5",
                      py: 1.5,
                      textTransform: "none",
                      fontWeight: "bold",
                      fontSize: '1.1rem',
                      boxShadow: '0 8px 20px rgba(63, 81, 181, 0.3)',
                      "&:hover": { backgroundColor: "#303f9f", boxShadow: '0 10px 25px rgba(63, 81, 181, 0.4)' }
                    }}
                  >
                    Reservar agora
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}