'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, Package, Settings, BarChart3, Shield, LogOut } from 'lucide-react'

interface User {
  id: string
  email?: string
}

interface AdminStats {
  totalUsers: number
  totalProducts: number
  totalRevenue: number
  pendingActivations: number
}

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalRevenue: 0,
    pendingActivations: 0,
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push('/')
          return
        }

        setUser(user)

        // Check if user is admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single()

        if (!profile?.is_admin) {
          router.push('/dashboard')
          return
        }

        setIsAdmin(true)

        // Fetch admin stats
        const { count: userCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' })

        const { count: productCount } = await supabase
          .from('products')
          .select('*', { count: 'exact' })

        const { count: pendingCount } = await supabase
          .from('profiles')
          .select('*', { count: 'exact' })
          .eq('shop_activated', false)

        setStats({
          totalUsers: userCount || 0,
          totalProducts: productCount || 0,
          totalRevenue: 0,
          pendingActivations: pendingCount || 0,
        })
      } catch (error) {
        console.error('Error checking admin status:', error)
        router.push('/')
      } finally {
        setLoading(false)
      }
    }

    checkAdmin()
  }, [supabase, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="gap-2">
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 border-l-4 border-l-primary">
            <div className="text-sm text-muted-foreground mb-1">Total Users</div>
            <div className="text-4xl font-bold text-foreground">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground mt-2">Active platform users</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-accent">
            <div className="text-sm text-muted-foreground mb-1">Total Products</div>
            <div className="text-4xl font-bold text-foreground">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-2">Data bundles & checkers</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-secondary">
            <div className="text-sm text-muted-foreground mb-1">Pending Activations</div>
            <div className="text-4xl font-bold text-foreground text-orange-600">
              {stats.pendingActivations}
            </div>
            <p className="text-xs text-muted-foreground mt-2">Sellers awaiting activation</p>
          </Card>

          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="text-sm text-muted-foreground mb-1">Platform Revenue</div>
            <div className="text-4xl font-bold text-foreground">GHC {stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-2">From activation fees</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users" className="gap-2">
              <Users size={18} />
              Users
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-2">
              <Package size={18} />
              Products
            </TabsTrigger>
            <TabsTrigger value="activations" className="gap-2">
              <BarChart3 size={18} />
              Shop Activations
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings size={18} />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">User Management</h3>
              <div className="space-y-3">
                <p className="text-muted-foreground">User management interface coming soon...</p>
                <Button className="w-full md:w-auto">Manage Users</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Product Management</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button className="w-full">Create New Product</Button>
                  <Button variant="outline" className="w-full">View All Products</Button>
                </div>
                <p className="text-sm text-muted-foreground">Manage all data bundles and result checkers on the platform</p>
              </div>
            </Card>
          </TabsContent>

          {/* Shop Activations Tab */}
          <TabsContent value="activations">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Shop Activations</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Current Activation Fee: <span className="text-lg font-bold text-primary">GHC 2,000</span>
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Users must pay this fee to unlock their shop and start selling data
                  </p>
                </div>
                <Button className="w-full">Approve Pending Activations ({stats.pendingActivations})</Button>
                <Button variant="outline" className="w-full">View Activation Requests</Button>
              </div>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Platform Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Shop Activation Fee (GHC)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      defaultValue="2000"
                      className="flex-1 px-4 py-2 border border-border rounded-lg"
                    />
                    <Button>Update</Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Platform Commission (%)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      defaultValue="10"
                      className="flex-1 px-4 py-2 border border-border rounded-lg"
                    />
                    <Button>Update</Button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Minimum Payout (GHC)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      defaultValue="50"
                      className="flex-1 px-4 py-2 border border-border rounded-lg"
                    />
                    <Button>Update</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
