import { useState } from 'react'
import { supabase } from '../../lib/supabase' 
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Card, Typography, Alert } from '@mui/material'

export default function LoginAdmin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // Sucesso! Vamos verificar se é admin na próxima tela ou aqui
      navigate('/admin')
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <Card className="p-8 w-full max-w-md shadow-xl">
        <Typography variant="h4" className="mb-6 text-center font-bold text-blue-600">
          Acesso Admin
        </Typography>

        {error && <Alert severity="error" className="mb-4">{error}</Alert>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <TextField 
            label="Email" 
            variant="outlined" 
            fullWidth 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField 
            label="Senha" 
            type="password" 
            variant="outlined" 
            fullWidth 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button 
            type="submit" 
            variant="contained" 
            size="large" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700" // Tailwind controlando a cor
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Card>
    </div>
  )
}