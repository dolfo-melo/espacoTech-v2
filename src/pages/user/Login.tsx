import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useNavigate } from "react-router-dom"
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  Box
} from "@mui/material"

export function Login(){

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg("")

    try {

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      if (data.user) {

        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single()

        if(profile?.role === "admin"){
          navigate("/admin")
        } else {
          navigate("/")
        }

      }

    } catch (error:any) {
      setErrorMsg(error.message || "Erro ao realizar login")
    } finally {
      setLoading(false)
    }
  }

  return (

    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url('/src/assets/espacoTechBackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      <Container maxWidth="xs">

        <Card
          sx={{
            backdropFilter: "blur(12px)",
            backgroundColor: "rgba(255,255,255,0.75)",
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
          }}
        >

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              p: 5
            }}
          >

            <Box textAlign="center">
              <img
                src="../public/logoEspacoTech.png"
                style={{ width: 70 }}
              />
            </Box>
            
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              color="#1F3C88"
            >
              Login
            </Typography>


            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <form
              onSubmit={handleLogin}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20
              }}
            >

              <TextField
                label="Usuário"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E9A84A"
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E9A84A"
                  }
                }}
              />

              <TextField
                label="Senha"
                type="password"
                variant="outlined"
                fullWidth
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E9A84A"
                  }
                }}
              />

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                sx={{
                  borderRadius: "30px",
                  py: 1.5,
                  fontWeight: "bold",
                  backgroundColor: "#E9A84A",
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "#1F3C88",
                    color: "#fff"
                  }
                }}
              >
                {loading ? "Carregando..." : "Entrar"}
              </Button>

            </form>

            <Typography variant="body2" align="center">
              Não tem cadastro?{" "}
              <Link href="/register">
                Clique aqui
              </Link>
            </Typography>

          </CardContent>

        </Card>

      </Container>

    </Box>
  )
}