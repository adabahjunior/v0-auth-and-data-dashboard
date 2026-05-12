'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (!fullName || !username || !phone) {
          throw new Error('Please fill in all fields')
        }

        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ??
              `${window.location.origin}/auth/callback`,
            data: {
              full_name: fullName,
              username: username,
              phone: phone,
            },
          },
        })
        if (signUpError) throw signUpError
        setError('Check your email to confirm signup!')
        setFullName('')
        setUsername('')
        setEmail('')
        setPhone('')
        setPassword('')
        setConfirmPassword('')
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (signInError) throw signInError
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <Card className="border-2 border-primary/20 shadow-2xl bg-card/95 backdrop-blur">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            {isSignUp ? 'Join BossuData Gh' : 'Welcome Back'}
          </CardTitle>
          <CardDescription className="text-base">
            {isSignUp
              ? 'Start buying and reselling data bundles today'
              : 'Access your data bundles and result checkers'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      disabled={isLoading}
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="username" className="block text-sm font-semibold mb-2">
                      Username
                    </label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="johndoe123"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={isLoading}
                      className="border-primary/30 focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="border-primary/30 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+233 5XX XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={isLoading}
                    className="border-primary/30 focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold mb-2">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className="border-primary/30 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
                      Confirm Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      className="border-primary/30 focus:border-primary"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="border-primary/30 focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold mb-2">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="border-primary/30 focus:border-primary"
                    required
                  />
                </div>
              </>
            )}

            {error && (
              <div
                className={`text-sm p-3 rounded-lg font-medium ${
                  error.includes('Check your email')
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full font-semibold py-6 text-base bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-all" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  Loading...
                </span>
              ) : isSignUp ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </Button>

            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError(null)
              }}
              className="w-full text-sm font-medium text-primary hover:text-purple-600 transition-colors py-2 rounded-lg hover:bg-primary/5"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don&apos;t have an account? Sign Up"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
