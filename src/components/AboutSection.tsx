import { Box, Typography, Stack, Paper, Container } from '@mui/material';
import { motion } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SecurityIcon from '@mui/icons-material/Security';

export function AboutSection() {
  const infoData = [
    {
      title: 'Horário de Funcionamento',
      icon: <AccessTimeIcon color="primary" />,
      description: 'Segunda a Sexta, das 08h às 21h. Ambiente preparado para sua jornada produtiva.'
    },
    {
      title: 'Serviço de Limpeza',
      icon: <CleaningServicesIcon color="primary" />,
      description: 'Higienização profissional diária e entre reservas, garantindo um espaço impecável.'
    },
    {
      title: 'Portaria e Segurança',
      icon: <SecurityIcon color="primary" />,
      description: 'Controle de acesso rigoroso e monitoramento 24h para sua total tranquilidade.'
    }
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        {/* CONTAINER FLEX: Muda de coluna (mobile) para linha (desktop) */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            alignItems: 'center', 
            gap: { xs: 6, md: 10 } 
          }}
        >
          
          {/* LADO DO TEXTO: Ocupa 60% no desktop */}
          <Box sx={{ flex: { xs: '1', md: '1.5' } }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Typography variant="overline" color="primary" sx={{ fontWeight: 'bold', letterSpacing: 2 }}>
                SOBRE O NOSSO ESPAÇO
              </Typography>
              
              <Typography variant="h3" fontWeight="bold" sx={{ mt: 1, mb: 4, fontSize: { xs: '2.2rem', md: '3rem' } }}>
                Tudo o que você precisa para <span style={{ color: '#FFA726' }}>focar no que importa</span>
              </Typography>

              <Stack spacing={4}>
                {infoData.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2.5 }}>
                    <Box sx={{ 
                      minWidth: 54, 
                      height: 54, 
                      bgcolor: 'rgba(63, 81, 181, 0.08)', 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center' 
                    }}>
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                      <Typography variant="body1" color="text.secondary">{item.description}</Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </motion.div>
          </Box>

          {/* LADO DA IMAGEM: Ocupa 40% no desktop */}
          <Box sx={{ flex: '1', width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Paper
                elevation={6}
                sx={{
                  borderRadius: '30px',
                  overflow: 'hidden',
                  height: { xs: '350px', md: '550px' },
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                }}
              >
                <img 
                  src="src\assets\espacoTechBackground.png" 
                  alt="Interior Espaço Tech"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Paper>
            </motion.div>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}