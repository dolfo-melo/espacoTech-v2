import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useNavigate } from "react-router-dom"
import { Container, Card, CardContent, Typography, TextField, Button, Alert, Link } from "@mui/material"

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

        } catch (error: any) {
            setErrorMsg(error.message || "Erro ao realizar login")
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
                            Bem-vindo ao Espaço Tech
                        </Typography>

                        <Typography variant="body2" align="center" color="text.secondary">
                            Faça login para continuar
                        </Typography>

                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

                        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

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
                                {loading ? "Carregando..." : "Entrar"}
                            </Button>

                        </form>

                        <div className="text-center">
                            <Link href="/register">
                                Não tem conta? Cadastre-se
                            </Link>
                        </div>

                    </CardContent>
                </Card>

            </Container>
        </div>
    )
}