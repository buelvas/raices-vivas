import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authMe } from '../utils/api'


export interface User {
  id: number
  name: string
  email: string
  phone?: string
  city?: string
  country?: string
  role?: string
  terms?: boolean
  startedAt?: string
  created_at?: string
}

// Tipo del contexto
interface AuthContextType {
  user: User | null
  setUser: (u: User | null) => void
}


const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {}
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const me = await authMe()
        setUser(me.user)
      } catch {
        setUser(null)
      }
    })()
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
