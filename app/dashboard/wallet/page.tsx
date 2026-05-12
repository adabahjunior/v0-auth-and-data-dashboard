'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { CreditCard, Send, Plus } from 'lucide-react'

interface User {
  id: string
  email: string
}

export default function WalletPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const initializeWallet = async () => {
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
        console.error('Error loading wallet:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeWallet()
  }, [supabase, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="lg:ml-64">
          <DashboardHeader user={null} />
          <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Loading wallet...</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-2">Wallet</h2>
            <p className="text-muted-foreground">Manage your account balance and transactions</p>
          </div>

          {/* Main Balance Card */}
          <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/20">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Current Balance</p>
                <h3 className="text-5xl font-bold text-foreground">GHC 0.00</h3>
              </div>
              <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                <CreditCard size={28} className="text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Your earnings from selling data bundles and providing result checking services</p>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button className="h-14 text-base flex items-center gap-2 bg-primary hover:bg-primary/90">
              <Plus size={20} />
              Add Funds
            </Button>
            <Button className="h-14 text-base flex items-center gap-2" variant="outline">
              <Send size={20} />
              Withdraw Balance
            </Button>
          </div>

          {/* Transaction History Section */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Recent Transactions</h3>
            <Card className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No transactions yet</p>
              <p className="text-sm text-muted-foreground">Start purchasing data bundles to build your transaction history</p>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
