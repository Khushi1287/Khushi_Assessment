import React, { createContext, useContext, useEffect, useState } from 'react'

// Mock types to avoid dependency on @supabase/supabase-js if it fails, 
// or we can use them if installed. For safety, let's define compatible interfaces.
// But since the project has supabase-js, we can try to use its types, or just mock them.
// Let's use simple compatible types to be safe and dependency-free for the logic.

interface User {
  id: string
  email?: string
  user_metadata?: {
    name?: string
    [key: string]: any
  }
  aud: string
  created_at: string
}

interface Session {
  user: User
  access_token: string
}

interface AuthError {
  message: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, name?: string) => Promise<{ error: AuthError | null }>
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signInWithGoogle: () => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check local storage for existing session
    const storedSession = localStorage.getItem('mock_session')
    if (storedSession) {
      try {
        const parsedSession = JSON.parse(storedSession)
        setSession(parsedSession)
        setUser(parsedSession.user)
      } catch (e) {
        console.error('Failed to parse session', e)
        localStorage.removeItem('mock_session')
      }
    }
    setLoading(false)
  }, [])

  const signUp = async (email: string, password: string, name?: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    if (!email || !password) {
      return { error: { message: 'Email and password are required' } }
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      user_metadata: { name },
      aud: 'authenticated',
      created_at: new Date().toISOString()
    }

    const newSession: Session = {
      user: newUser,
      access_token: 'mock-jwt-token-' + crypto.randomUUID()
    }

    // In a real app, sign up might not auto-login, but for this mock we will
    localStorage.setItem('mock_session', JSON.stringify(newSession))
    setSession(newSession)
    setUser(newUser)

    return { error: null }
  }

  const signIn = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))

    // For mock purposes, accept any email/password as long as they are not empty
    // Or we could check against a stored "users" list, but simpler is better for "just works"
    if (!email || !password) {
      return { error: { message: 'Email and password are required' } }
    }

    // Create a mock user on the fly if we don't have persistence of users
    // This allows "logging in" with any credential, which is great for demos
    const mockUser: User = {
      id: 'mock-user-id',
      email,
      user_metadata: { name: email.split('@')[0] },
      aud: 'authenticated',
      created_at: new Date().toISOString()
    }

    const newSession: Session = {
      user: mockUser,
      access_token: 'mock-jwt-token'
    }

    localStorage.setItem('mock_session', JSON.stringify(newSession))
    setSession(newSession)
    setUser(mockUser)

    return { error: null }
  }

  const signInWithGoogle = async () => {
    await new Promise(resolve => setTimeout(resolve, 800))
    // Mock Google Sign in
    const mockUser: User = {
      id: 'google-user-id',
      email: 'user@gmail.com',
      user_metadata: { name: 'Google User' },
      aud: 'authenticated',
      created_at: new Date().toISOString()
    }
    const newSession = { user: mockUser, access_token: 'google-token' }
    localStorage.setItem('mock_session', JSON.stringify(newSession))
    setSession(newSession)
    setUser(mockUser)
    return { error: null }
  }

  const signOut = async () => {
    localStorage.removeItem('mock_session')
    setSession(null)
    setUser(null)
  }

  const resetPassword = async (email: string) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    // Just return success
    return { error: null }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

