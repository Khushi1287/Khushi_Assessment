import React, { useState } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AtSign, Loader, MoveRight, UserRound, AlertCircle, CornerUpLeft, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

export function RegistrationPage() {
  const [isLogin, setIsLogin] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const { signUp, signIn, resetPassword, signInWithGoogle, user, loading: authLoading } = useAuth()
  const navigate = useNavigate()

  // Redirect logged-in users to dashboard
  if (!authLoading && user) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      if (isForgotPassword) {
        const { error } = await resetPassword(email)
        if (error) {
          // Provide user-friendly error messages
          if (error.message.includes('not found') || error.message.includes('does not exist')) {
            setError('No account found with this email address.')
          } else {
            setError(error.message)
          }
        } else {
          setSuccess('Password reset email sent! Please check your inbox and follow the instructions.')
        }
      } else if (isLogin) {
        const { error } = await signIn(email, password)
        if (error) {
          // Provide user-friendly error messages
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password. Please try again.')
          } else if (error.message.includes('Email not confirmed')) {
            setError('Please verify your email address before signing in. Check your inbox for the confirmation email.')
          } else {
            setError(error.message)
          }
        } else {
          setSuccess('Successfully signed in!')
          setTimeout(() => {
            navigate('/dashboard')
          }, 1000)
        }
      } else {
        const { error } = await signUp(email, password, name)
        if (error) {
          // Provide user-friendly error messages
          if (error.message.includes('already registered')) {
            setError('An account with this email already exists. Please sign in instead.')
          } else if (error.message.includes('Password')) {
            setError('Password must be at least 6 characters long.')
          } else {
            setError(error.message)
          }
        } else {
          setSuccess('Account created! Please check your email to verify your account before signing in.')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    setLoading(true)

    try {
      const { error } = await signInWithGoogle()
      if (error) {
        setError(error.message)
      } else {
        // For mock auth, we manually redirect since we aren't going to a real OAuth provider
        setSuccess('Successfully signed in with Google!')
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Full Screen Image with Gradient and Quote */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80"
          alt="Education illustration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        {/* Logo at top */}
        <div className="absolute top-0 left-0 right-0 p-8 z-20">
          <Link
            to="/"
            aria-label="home"
            className="flex items-center space-x-2"
          >
            <Logo className="text-white" />
          </Link>
        </div>
        {/* Quote overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-12 z-10">
          <blockquote className="text-white">
            <p className="text-2xl md:text-3xl font-bold mb-4 mr-16 leading-relaxed">
              "The journey of a thousand miles begins with a single step."
            </p>
            <footer className="text-lg text-white/90 font-medium">
              — Lao Tzu
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="-ml-2 inline-flex pl-2 pr-4 py-1 hover:bg-muted rounded-full items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <CornerUpLeft className="w-4 h-4 mr-2" />
            Back to home
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {isForgotPassword ? 'Reset password.' : isLogin ? 'Hello there.' : 'Get started.'}
            </h1>
            <p className="text-muted-foreground mr-12 text-sm">
              {isForgotPassword
                ? 'Enter your email address and we\'ll send you a link to reset your password.'
                : isLogin
                  ? 'Enter your credentials to sign in. You can also create an account if you don\'t have one.'
                  : 'Enter your details to get started. You can also sign in if you already have an account.'}
              {!isForgotPassword && !isLogin && (
                <span
                  onClick={() => setIsLogin(true)}
                  className='underline-offset-4 text-primary hover:underline flex items-center mt-2 cursor-pointer'
                >
                  Sign in<MoveRight className="w-4 h-4 ml-2" />
                </span>
              )}
              {!isForgotPassword && isLogin && (
                <>
                  <span
                    onClick={() => setIsLogin(false)}
                    className='underline-offset-4 text-primary hover:underline flex items-center mt-2 cursor-pointer'
                  >
                    Create an account<MoveRight className="w-4 h-4 ml-2" />
                  </span>
                  <span
                    onClick={() => setIsForgotPassword(true)}
                    className='underline-offset-4 text-primary hover:underline flex items-center mt-2 cursor-pointer'
                  >
                    Forgot password?<MoveRight className="w-4 h-4 ml-2" />
                  </span>
                </>
              )}
              {isForgotPassword && (
                <span
                  onClick={() => {
                    setIsForgotPassword(false)
                    setIsLogin(true)
                  }}
                  className='underline-offset-4 text-primary hover:underline flex items-center mt-2 cursor-pointer'
                >
                  Back to sign in<MoveRight className="w-4 h-4 ml-2" />
                </span>
              )}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-md bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {!isLogin && !isForgotPassword && (
                <div className="flex items-center">
                  <UserRound className="w-4 h-4 mr-2" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full border-b rounded-none border-zinc-400/50"
                  />
                </div>
              )}

              <div className="flex items-center">
                <AtSign className="w-4 h-4 mr-2" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full border-b rounded-none border-zinc-400/50"
                />
              </div>

              {!isForgotPassword && (
                <div className="flex items-center relative">
                  <Loader className="w-4 h-4 mr-2" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full border-b rounded-none border-zinc-400/50 pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              )}

            </div>

            {!isLogin && !isForgotPassword && (
              <div className="flex items-center">
                <label htmlFor="terms" className="ml-2 text-sm text-muted-foreground mr-8">
                  By continuing your agree to the{' '}
                  <a href="#" className="text-primary hover:underline underline-offset-4">
                    Terms and Conditions
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline underline-offset-4">
                    Privacy Policy
                  </a>
                </label>
              </div>
            )}

            <Button
              type="submit"
              className="rounded-full px-6"
              size="sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  {isForgotPassword
                    ? 'Sending...'
                    : isLogin
                      ? 'Signing in...'
                      : 'Creating account...'}
                </>
              ) : (
                isForgotPassword
                  ? 'Send Reset Link'
                  : isLogin
                    ? 'Continue'
                    : 'Create Account'
              )}
            </Button>
          </form>

          {/* Divider and Google Sign In - Only show on login/signup, not forgot password */}
          {!isForgotPassword && (
            <>
              <div className="relative my-6">
                <div className="w-full border-t border-border"></div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full rounded-full"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {loading ? 'Connecting...' : 'Google'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 120 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-5 w-auto', className)}>
      <path
        d="M3 0H5V18H3V0ZM13 0H15V18H13V0ZM18 3V5H0V3H18ZM0 15V13H18V15H0Z"
        fill="url(#logo-gradient-register)"
      />
      <text
        x="25"
        y="14"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="14"
        fontWeight="700"
        fill="currentColor"
      >
        Lekh
      </text>
      <defs>
        <linearGradient
          id="logo-gradient-register"
          x1="10"
          y1="0"
          x2="10"
          y2="20"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop
            offset="1"
            stopColor="#E5E7EB"
          />
        </linearGradient>
      </defs>
    </svg>
  )
}

