'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Store, Plus, Edit2, BarChart3, Lock, AlertCircle } from 'lucide-react'

interface User {
  id: string
  email: string
}

interface UserProfile {
  shop_activated: boolean
  shop_activation_date?: string
}

export default function MyShopPage() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activationFee, setActivationFee] = useState(2000)
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

        // Get user profile
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('shop_activated, shop_activation_date')
          .eq('id', authUser.id)
          .single()

        setProfile(userProfile)

        // Get activation fee from settings
        const { data: settings } = await supabase
          .from('settings')
          .select('setting_value')
          .eq('setting_key', 'shop_activation_fee')
          .single()

        if (settings) {
          setActivationFee(parseFloat(settings.setting_value))
        }
      } catch (error) {
        console.error('Error loading shop:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeShop()
  }, [supabase, router])

  const handleActivateShop = async () => {
    // In a real app, this would redirect to payment gateway
    console.log('Redirecting to payment for GHC', activationFee)
    // For now, just show a message
    alert(`You will be redirected to payment to activate your shop for GHC ${activationFee}`)
  }

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

  const isShopActive = profile?.shop_activated

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

          {/* Shop Status Alert */}
          {!isShopActive && (
            <Card className="mb-8 p-6 bg-orange-50 border-orange-200 border-l-4 border-l-orange-500">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-900 mb-1">Shop Not Activated</h3>
                  <p className="text-sm text-orange-800 mb-4">
                    Your shop is currently locked. To unlock your shop and start selling data bundles, please pay the activation fee.
                  </p>
                  <Button 
                    onClick={handleActivateShop}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Lock size={18} className="mr-2" />
                    Activate Shop for GHC {activationFee.toFixed(2)}
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {isShopActive && (
            <Card className="mb-8 p-4 bg-green-50 border-green-200">
              <p className="text-sm text-green-800">
                ✓ Your shop is active! Activated on {profile?.shop_activation_date ? new Date(profile.shop_activation_date).toLocaleDateString() : 'N/A'}
              </p>
            </Card>
          )}

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
            <Button 
              className="h-14 text-base flex items-center gap-2 bg-primary hover:bg-primary/90"
              disabled={!isShopActive}
            >
              <Plus size={20} />
              Create New Product
            </Button>
            <Button 
              className="h-14 text-base flex items-center gap-2" 
              variant="outline"
              disabled={!isShopActive}
            >
              <BarChart3 size={20} />
              View Analytics
            </Button>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-4">Your Products</h3>
            {isShopActive ? (
              <Card className="p-12 text-center border-dashed">
                <Store size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground mb-2">No products listed yet</p>
                <p className="text-sm text-muted-foreground mb-6">Start by creating your first product to begin selling</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus size={18} className="mr-2" />
                  Create Your First Product
                </Button>
              </Card>
            ) : (
              <Card className="p-12 text-center border-dashed bg-gray-50">
                <Lock size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 font-medium mb-2">Shop Locked</p>
                <p className="text-sm text-gray-500">Activate your shop to start creating products and selling data bundles</p>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
