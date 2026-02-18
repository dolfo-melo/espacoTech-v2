import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useNavigate } from "react-router-dom"
import { Container, Card, CardContent, Typography, TextField, Button, Alert, Link } from "@mui/material"

export default function Login(){
    
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    // Função do Login
    const handleAuth = async (e: React.SubmitEvent) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg("")

        try{
            if (isSignUp){
                // Cadastro Usuário
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { nome : name }
                    }
                })
                if (error) throw error
                alert("Cadastro Realizado! Realize o Login.")
                setIsSignUp(false)
            } else {
              // Login Usuário
              const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password,
              })
              if (error) throw error

              // Redirecionamento

              // Verificação Perfil -> User ou Admin
              if (data.user) {
                const {data: profile} = await supabase
                .from("profiles")
                .select("role")
                .eq("id","data.user.id")
                .single()

                // Admin
                if(profile?.role === "admin"){
                    navigate("/admin")
                } else {
                    // Usuário Padrão
                    navigate("/")                    
                }
              }
            }
            
            } catch (error: any) {
                setErrorMsg(error.message || "Ocorreu um erro.")
            } finally {
                setLoading(false)
            } 
        } 
        
        return(
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <Container maxWidth="xs">
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 4 }}>
            
                            <Typography variant="h4" component="h1" align="center" fontWeight="bold" color="primary">
                                {isSignUp ? 'Criar Conta' : 'Bem-vindo'}
                            </Typography>
            
                            <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 2 }}>
                                {isSignUp ? 'Preencha os dados para começar' : 'Faça login para continuar'}
                            </Typography>

                        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {isSignUp && (
                            <TextField
                            label="Seu Nome"
                            variant="outlined"
                            fullWidth
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        )}
              
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
              
                        <TextField
                            label="Senha"
                            type="password"
                            variant="outlined"
                            fullWidth
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            size="large" 
                            fullWidth 
                            disabled={loading}
                            sx={{ py: 1.5, fontWeight: 'bold' }}
                        >
                        {loading ? 'Carregando...' : (isSignUp ? 'Cadastrar' : 'Entrar')}
                        </Button>
                    </form>

                <div className="text-center mt-2">
                    <Link 
                        component="button" 
                        variant="body2" 
                        onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }}
                    >
                    {isSignUp 
                    ? 'Já tem uma conta? Faça Login' 
                    : 'Não tem conta? Cadastre-se'}
                    </Link>
                </div>

            </CardContent>
        </Card>
      </Container>
    </div>
        )
    }

