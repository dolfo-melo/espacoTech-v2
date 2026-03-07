import { AboutSection } from '../../components/AboutSection'
import { Hero } from '../../components/Hero'
import { RoomsSection } from '../../components/RoomsSection'
import './home.css'
import { Box} from '@mui/material'

export default function Home(){
    return(
        <Box className="home-container">
            <Hero />
            <RoomsSection />
            <AboutSection />
        </Box>
    )
}