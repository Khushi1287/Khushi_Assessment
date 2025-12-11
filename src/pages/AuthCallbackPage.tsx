import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Loader, CheckCircle, XCircle } from 'lucide-react'

export function AuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Processing authentication...')

  useEffect(() => {
    // Check for hash fragments (Supabase auth callbacks use hash)
    const hashParams = new URLSearchParams(window.location.hash.substring(1))
    const accessToken = hashParams.get('access_token')
    const error = hashParams.get('error')
    const errorDescription = hashParams.get('error_description')

    // Check for query params (some flows use query params)
    const queryError = searchParams.get('error')
    const queryErrorDescription = searchParams.get('error_description')

    if (error || queryError) {
      setStatus('error')
      setMessage(errorDescription || queryErrorDescription || 'Authentication failed')
      setTimeout(() => {
        navigate('/register')
      }, 3000)
      return
    }

    if (accessToken) {
      // Token is in the URL, Supabase will handle it via onAuthStateChange
      setStatus('loading')
      setMessage('Verifying your account...')

      // Wait a moment for auth state to update
      const timer = setTimeout(() => {
        if (user) {
          setStatus('success')
          setMessage('Successfully authenticated! Redirecting...')
          setTimeout(() => {
            navigate('/dashboard')
          }, 1500)
        } else {
          // If still no user after a delay, might need email confirmation
          setStatus('success')
          setMessage('Please check your email to complete verification.')
          setTimeout(() => {
            navigate('/register')
          }, 3000)
        }
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      // No token found, might be a password reset or other flow
      setStatus('success')
      setMessage('Redirecting...')
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500)
    }
  }, [searchParams, navigate, user])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto p-8">
        {status === 'loading' && (
          <>
            <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-lg text-foreground">{message}</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <p className="text-lg text-foreground">{message}</p>
          </>
        )}
        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
            <p className="text-lg text-foreground mb-4">{message}</p>
            <p className="text-sm text-muted-foreground">Redirecting to login...</p>
          </>
        )}
      </div>
    </div>
  )
}

