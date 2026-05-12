'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Code, Copy, RefreshCw } from 'lucide-react'

interface User {
  id: string
  email: string
}

export default function DeveloperAPIPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const demoApiKey = 'sk_live_' + Math.random().toString(36).substr(2, 32)

  useEffect(() => {
    const initializeAPI = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser()
        if (!authUser) {
          router.push('/')
          return
        }
        setUser({
          id: authUser.id,
          email: authUser.email || '',
        })
      } catch (error) {
        console.error('Error loading API:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAPI()
  }, [supabase, router])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(demoApiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="lg:ml-64">
          <DashboardHeader user={null} />
          <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Loading API...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <div className="lg:ml-64">
        <DashboardHeader user={user} />

        <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Developer API</h2>
            <p className="text-muted-foreground">Integrate BossuData Gh into your applications with our REST API</p>
          </div>

          {/* API Keys Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">API Keys</h3>
            <Card className="p-6 mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Production Key</p>
                  <div className="flex items-center gap-3">
                    <code className="px-4 py-2 rounded-lg bg-muted text-sm font-mono text-foreground select-all">
                      {demoApiKey}
                    </code>
                    <button
                      onClick={copyToClipboard}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="Copy API key"
                    >
                      <Copy size={20} className={copied ? 'text-green-600' : 'text-muted-foreground'} />
                    </button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  Regenerate
                </Button>
              </div>
            </Card>
          </div>

          {/* API Documentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 border-l-4 border-l-primary">
              <h4 className="font-bold text-foreground mb-3">Authentication</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Include your API key in the Authorization header of every request
              </p>
              <code className="block p-3 bg-muted rounded text-xs font-mono text-foreground overflow-x-auto">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <h4 className="font-bold text-foreground mb-3">Base URL</h4>
              <p className="text-sm text-muted-foreground mb-4">
                All API requests should be made to the base URL
              </p>
              <code className="block p-3 bg-muted rounded text-xs font-mono text-foreground overflow-x-auto">
                https://api.bossudatagh.com/v1
              </code>
            </Card>
          </div>

          {/* Endpoints Section */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Available Endpoints</h3>
            <div className="space-y-4">
              <Card className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-primary">GET</p>
                    <p className="font-mono text-sm text-foreground">/products</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Active</span>
                </div>
                <p className="text-sm text-muted-foreground">Retrieve all available data bundles</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-accent">POST</p>
                    <p className="font-mono text-sm text-foreground">/purchases</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Active</span>
                </div>
                <p className="text-sm text-muted-foreground">Create a new purchase for your users</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-semibold text-secondary">GET</p>
                    <p className="font-mono text-sm text-foreground">/transactions</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Active</span>
                </div>
                <p className="text-sm text-muted-foreground">Retrieve your transaction history</p>
              </Card>
            </div>
          </div>

          {/* Documentation Link */}
          <div className="mt-8 p-6 rounded-lg border-2 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3 mb-2">
              <Code size={20} className="text-primary" />
              <h4 className="font-bold text-foreground">Full API Documentation</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Check out our comprehensive API documentation for detailed examples and integration guides
            </p>
            <Button variant="outline" className="flex items-center gap-2">
              Read Documentation
              <span className="ml-1">→</span>
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
