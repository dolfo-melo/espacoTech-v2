import { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { CircularProgress } from '@mui/material'

export default function AdminRoute() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      // 1. Pega o usuário logado
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setIsAdmin(false)
        return
      }

      // 2. Verifica no banco se a role é admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      setIsAdmin(profile?.role === 'admin')
    }

    checkUser()
  }, [])

  if (isAdmin === null) {
    return <div className="flex h-screen items-center justify-center"><CircularProgress /></div>
  }

  // Se for admin, mostra o conteúdo (Outlet). Se não, manda pro Login.
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />
}
