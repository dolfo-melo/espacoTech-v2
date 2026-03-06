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

      <div className="absolute inset-0 bg-black/55 z-[-1]" />

      {/* Conteúdo */}

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">

        {/* LOGO */}

          <img 
            src="/logoEspacoTech.png"
            className="w-32 md:w-40 mb-6"
          />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Coloque sua logo aqui */}
        </motion.div>

        {/* TITULO */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-white text-5xl text-left sm:text-6xl md:text-7xl lg:text-8xl font-bold">
            Espaço
          </h1>

          <h1 className="text-[#FFA726] text-5xl text-left sm:text-6xl md:text-7xl lg:text-8xl font-bold drop-shadow-xl">
            Tech
          </h1>
            
            {/* DESCRIÇÃO */}

            <motion.p
            className="text-white/90 mt-6 text-sm text-left sm:text-base md:text-lg leading-relaxed max-w-xl"
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
              px: 5,
              py: 1.5,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#fb8c00",
                transform: "translateY(-3px)"
              }
            }}
          >
            Ver salas
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}

      <motion.div
        className="absolute bottom-8 flex flex-col items-center text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-sm mb-1">Explorar</span>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 1.6
          }}
        >
          <KeyboardArrowDownIcon fontSize="large" />
        </motion.div>
      </motion.div>

    </section>
  )
}