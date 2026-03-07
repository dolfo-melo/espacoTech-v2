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

export function Register(){

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const handleRegister = async (e: React.FormEvent) => {

    e.preventDefault()
    setLoading(true)
    setErrorMsg("")

    try {

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nome: name }
        }
      })

      if (error) throw error

      alert("Cadastro realizado! Faça login.")
      navigate("/login")

    } catch (error:any) {
      setErrorMsg(error.message || "Erro ao cadastrar")
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
              Criar Conta
            </Typography>

            {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <form
              onSubmit={handleRegister}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20
              }}
            >

              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e)=>setName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "30px"
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E9A84A"
                  }
                }}
              />

              <TextField
                label="Email"
                type="email"
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
                {loading ? "Carregando..." : "Cadastrar"}
              </Button>

            </form>

            <Typography variant="body2" align="center">
              Já tem conta?{" "}
              <Link href="/login">
                Faça login
              </Link>
            </Typography>

          </CardContent>

        </Card>

      </Container>

    </Box>
  )
}