'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { ProductGrid } from '@/components/product-grid'
import { CheckoutModal } from '@/components/checkout-modal'
import { Card } from '@/components/ui/card'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
}

interface User {
  id: string
  email: string
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // Get current user
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          router.push('/')
          return
        }

        setUser({
          id: authUser.id,
          email: authUser.email || '',
        })

        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })

        if (productsError) throw productsError

        setProducts(productsData || [])
      } catch (error) {
        console.error('Error loading dashboard:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeDashboard()
  }, [supabase, router])

  const handlePurchase = async (product: Product) => {
    if (!user) return

    try {
      const { error } = await supabase.from('purchases').insert([
        {
          user_id: user.id,
          product_id: product.id,
          amount: product.price,
        },
      ])

      if (error) throw error

      // Refresh products or show success message
      setShowCheckout(false)
      setSelectedProduct(null)

      // Optionally show a success toast
      alert(`Successfully purchased ${product.name}!`)
    } catch (error) {
      console.error('Error processing purchase:', error)
      alert('Failed to process purchase. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="lg:ml-64">
        <DashboardHeader user={user} />

        <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Overview</h2>
            <p className="text-muted-foreground">
              Welcome back! Browse and purchase premium data bundles and exam result checkers to resell
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6 border-l-4 border-l-primary">
              <div className="text-sm text-muted-foreground mb-1">Total Purchases</div>
              <div className="text-3xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground mt-2">This month</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-accent">
              <div className="text-sm text-muted-foreground mb-1">Wallet Balance</div>
              <div className="text-3xl font-bold text-foreground">GHC 0.00</div>
              <p className="text-xs text-muted-foreground mt-2">Available</p>
            </Card>
            <Card className="p-6 border-l-4 border-l-secondary">
              <div className="text-sm text-muted-foreground mb-1">Active Bundles</div>
              <div className="text-3xl font-bold text-foreground">{products.length}</div>
              <p className="text-xs text-muted-foreground mt-2">Available to purchase</p>
            </Card>
          </div>

          {/* Products Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">Available Bundles</h3>
            {products.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No bundles available yet.</p>
              </Card>
            ) : (
              <ProductGrid
                products={products}
                onSelectProduct={(product) => {
                  setSelectedProduct(product)
                  setShowCheckout(true)
                }}
              />
            )}
          </div>
        </main>
      </div>

      {selectedProduct && showCheckout && (
        <CheckoutModal
          product={selectedProduct}
          user={user}
          onClose={() => {
            setShowCheckout(false)
            setSelectedProduct(null)
          }}
          onPurchase={() => handlePurchase(selectedProduct)}
        />
      )}
    </div>
  )
}
