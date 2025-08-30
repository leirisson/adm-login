// src/pages/Dashboard.tsx
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div>
      <h2>Bem-vindo, {user?.email}!</h2>
      <p>Você está logado com Supabase.</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  )
}