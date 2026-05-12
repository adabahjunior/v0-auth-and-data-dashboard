'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Store, Plus, Edit2, BarChart3 } from 'lucide-react'

interface User {
  id: string
  email: string
}

export default function MyShopPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const initializeShop = async () => {
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
        console.error('Error loading shop:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeShop()
  }, [supabase, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="lg:ml-64">
          <DashboardHeader user={null} />
          <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Loading your shop...</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-2">My Shop</h2>
            <p className="text-muted-foreground">Manage and track your data bundles reselling business</p>
          </div>

          {/* Shop Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 border-l-4 border-l-primary">
              <div className="text-sm text-muted-foreground mb-1">Total Sales</div>
              <div className="text-3xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground mt-2">Bundles sold</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-accent">
              <div className="text-sm text-muted-foreground mb-1">Revenue</div>
              <div className="text-3xl font-bold text-foreground">GHC 0.00</div>
              <p className="text-xs text-muted-foreground mt-2">Total earnings</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-secondary">
              <div className="text-sm text-muted-foreground mb-1">Shop Rating</div>
              <div className="text-3xl font-bold text-foreground">-</div>
              <p className="text-xs text-muted-foreground mt-2">Not rated yet</p>
            </Card>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Button className="h-14 text-base flex items-center gap-2 bg-primary hover:bg-primary/90">
              <Plus size={20} />
              Create New Product
            </Button>
            <Button className="h-14 text-base flex items-center gap-2" variant="outline">
              <BarChart3 size={20} />
              View Analytics
            </Button>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Your Products</h3>
            <Card className="p-12 text-center border-dashed">
              <Store size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-2">No products listed yet</p>
              <p className="text-sm text-muted-foreground mb-6">Start by creating your first product to begin selling</p>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus size={18} className="mr-2" />
                Create Your First Product
              </Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
