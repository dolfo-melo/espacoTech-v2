import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useNavigate } from "react-router-dom"
import { Container, Card, CardContent, Typography, TextField, Button, Alert, Link } from "@mui/material"

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
        <div className="flex min-h-screen items-center justify-center">

            <div className="absolute inset-0 z-[-1]">
                <img 
                    src="src/assets/espacoTechBackground.png"
                    className="w-full h-full object-cover"
                />
            </div>

            <Container maxWidth="xs">

                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>

                        <Typography variant="h4" align="center" fontWeight="bold" color="primary">
                            Criar Conta
                        </Typography>

                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

                        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                            <TextField
                                label="Nome"
                                required
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />

                            <TextField
                                label="Email"
                                type="email"
                                required
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />

                            <TextField
                                label="Senha"
                                type="password"
                                required
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? "Carregando..." : "Cadastrar"}
                            </Button>

                        </form>

                        <div className="text-center">
                            <Link href="/login">
                                Já tem conta? Faça login
                            </Link>
                        </div>

                    </CardContent>
                </Card>

            </Container>
        </div>
    )
}