import './home.css'
import { Button, Box} from '@mui/material'

export default function Home(){
    return(
        <Box sx={{ flexGrow: 1 }}>

        {/*  SEÇÃO HERO */}
        <section className="relative h-screen w-full overflow-hidden">
            
            <div className="absolute inset-0 bg-black/40 z-0"></div>
            
            <div className="absolute inset-0 z-[-1]">
            <img 
                src="src\assets\espacoTechBackground.png" 
                className="w-full h-full object-cover" 
                alt="Espaço Tech Background" 
            />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center px-10 md:px-20 lg:px-40">
            <h1 className="text-white text-7xl sm:text-8xl md:text-9xl font-bold leading-tight">
                Espaço
            </h1>
            <h1 className="text-[#ffa726] text-7xl sm:text-8xl md:text-9xl font-bold leading-tight drop-shadow-2xl">
                Tech
            </h1>
            
            <div className="mt-8">
                <Button 
                variant="contained" 
                size="large"
                sx={{ 
                    backgroundColor: '#3f51b5', 
                    color: 'white', 
                    borderRadius: '50px',
                    px: 6,
                    py: 1.5,
                    fontSize: '1.2rem',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#303f9f' }
                }}
                >
                Ver salas
                </Button>
            </div>
            </div>
        </section>
        </Box>
    )
}