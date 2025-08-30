// src/pages/Login.tsx
import { useState } from 'react'
import { supabase } from '../supabase/client'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div style={styles.container}>
      {/* Logo ou título principal */}
      <div style={styles.logo}>
        <h1 style={styles.logoText}>FutVôlei</h1>
        <p>Gerenciamento de Inscrições</p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Entrar</h2>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputGroup}>
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            disabled={loading}
          />
          <label style={styles.label}>Email</label>
        </div>

        <div style={styles.inputGroup}>
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            disabled={loading}
          />
          <label style={styles.label}>Senha</label>
        </div>

        <button
          type="submit"
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      {/* Link para cadastro */}
      <p style={styles.footer}>
        Não tem conta?{' '}
        <a href="/signup" style={styles.link}>
          Cadastre-se
        </a>
      </p>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f7f9fc',
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
    padding: '20px',
    boxSizing: 'border-box' as const,
  },
  logo: {
    textAlign: 'center' as const,
    marginBottom: '30px',
  },
  logoText: {
    margin: '0',
    fontSize: '32px',
    fontWeight: 'bold' as const,
    color: '#1a1a1a',
  },
  form: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    border: '1px solid #e0e0e0',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600' as const,
    color: '#1a1a1a',
    marginBottom: '24px',
    textAlign: 'center' as const,
  },
  inputGroup: {
    position: 'relative' as const,
    margin: '20px 0' as const,
  },
  input: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box' as const,
    backgroundColor: '#fafafa',
  },
  label: {
    position: 'absolute' as const,
    left: '14px',
    top: '14px',
    color: '#888',
    fontSize: '16px',
    transition: 'all 0.2s ease',
    pointerEvents: 'none' as const,
    backgroundColor: '#fff',
    padding: '0 4px',
  },
  // Simulando o efeito de "floating label" com CSS inline (limitado)
  // Para efeito completo, use CSS real ou classes
  inputFocus: {
    borderColor: '#1a73e8',
  },
  error: {
    backgroundColor: '#ffebee',
    color: '#c62828',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '16px',
    border: '1px solid #ef9a9a',
  },
  button: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold' as const,
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#333',
  },
  footer: {
    marginTop: '20px',
    fontSize: '14px',
    color: '#555',
    textAlign: 'center' as const,
  },
  link: {
    color: '#1a73e8',
    fontWeight: '500' as const,
    textDecoration: 'none',
  },
  linkHover: {
    textDecoration: 'underline',
  },
}