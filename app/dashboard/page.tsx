'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
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
      <DashboardHeader user={user} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Available Datasets</h2>
          <p className="text-muted-foreground">
            Browse and purchase high-quality datasets for your business
          </p>
        </div>

        {products.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No datasets available yet.</p>
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
      </main>

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
