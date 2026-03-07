import { motion } from "framer-motion"
import { Button } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0 z-[-2]">
        <img
          src="src/assets/espacoTechBackground.png"
          className="w-full h-full object-cover scale-105"
          alt="Espaço Tech Background"
        />
      </div>

      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/60 z-[-1]" />

      {/* Conteúdo Principal */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 px-6 w-full max-w-7xl">
        
        {/* LOGO - Visível apenas em telas grandes (Desktop) */}
        <motion.div
          className="flex-hidden lg:block lg:w-1/3 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="/logoEspacoTech.png"
            className="w-64 md:w-80 drop-shadow-2xl"
            alt="Logo Espaço Tech"
          />
        </motion.div>

        {/* BLOCO DE TEXTO - Centralizado no Mobile, Esquerda no Desktop */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-tight">
              Espaço
            </h1>
            <h1 className="text-[#FFA726] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold drop-shadow-xl leading-tight">
              Tech
            </h1>

            <motion.p
              className="text-white/90 mt-6 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Um espaço moderno para inovação, aprendizado e colaboração.
              Reserve salas tecnológicas para eventos, estudos e projetos
              em um ambiente preparado para o futuro.
            </motion.p>
          </motion.div>

          {/* BOTÃO */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: "#FFA726",
                color: "#0d47a1",
                borderRadius: "50px",
                px: { xs: 4, md: 6 },
                py: 2,
                fontWeight: "bold",
                fontSize: "1.1rem",
                textTransform: "none",
                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                "&:hover": {
                  backgroundColor: "#fb8c00",
                  transform: "scale(1.05)"
                }
              }}
            >
              Ver salas
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-sm mb-1 font-medium tracking-widest uppercase">Explorar</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </motion.div>
      </motion.div>
    </section>
  )
}