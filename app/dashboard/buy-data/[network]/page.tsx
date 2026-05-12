'use client'

import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Package, ArrowRight } from 'lucide-react'

interface User {
  id: string
  email: string
}

const networkDetails = {
  mtn: {
    name: 'MTN',
    description: 'MTN Data Bundles - High-speed internet for mobile devices',
    plans: [
      { id: 1, name: 'MTN 500MB', price: 2.99, duration: '7 days', speed: 'High' },
      { id: 2, name: 'MTN 1GB', price: 4.99, duration: '14 days', speed: 'High' },
      { id: 3, name: 'MTN 5GB', price: 19.99, duration: '30 days', speed: 'High' },
    ],
  },
  'mtn-express': {
    name: 'MTN EXPRESS',
    description: 'MTN Express Bundles - Ultra-fast data with express speeds',
    plans: [
      { id: 1, name: 'MTN Express 1GB', price: 5.99, duration: '7 days', speed: 'Ultra' },
      { id: 2, name: 'MTN Express 3GB', price: 14.99, duration: '14 days', speed: 'Ultra' },
      { id: 3, name: 'MTN Express 10GB', price: 39.99, duration: '30 days', speed: 'Ultra' },
    ],
  },
  telecel: {
    name: 'TELECEL',
    description: 'Telecel Data Bundles - Reliable data services across Ghana',
    plans: [
      { id: 1, name: 'Telecel 400MB', price: 1.99, duration: '7 days', speed: 'Standard' },
      { id: 2, name: 'Telecel 1GB', price: 3.99, duration: '14 days', speed: 'Standard' },
      { id: 3, name: 'Telecel 5GB', price: 17.99, duration: '30 days', speed: 'Standard' },
    ],
  },
  'airteltigo-bigtime': {
    name: 'AIRTELTIGO BIGTIME',
    description: 'Airteltigo BigTime Plans - Large data bundles for heavy users',
    plans: [
      { id: 1, name: 'BigTime 2GB', price: 7.99, duration: '7 days', speed: 'High' },
      { id: 2, name: 'BigTime 5GB', price: 16.99, duration: '14 days', speed: 'High' },
      { id: 3, name: 'BigTime 20GB', price: 54.99, duration: '30 days', speed: 'High' },
    ],
  },
  'airteltigo-ishare': {
    name: 'AIRTELTIGO iSHARE',
    description: 'Airteltigo iShare - Shareable data bundles for families and groups',
    plans: [
      { id: 1, name: 'iShare 3GB', price: 8.99, duration: '7 days', speed: 'Standard' },
      { id: 2, name: 'iShare 8GB', price: 19.99, duration: '14 days', speed: 'Standard' },
      { id: 3, name: 'iShare 25GB', price: 59.99, duration: '30 days', speed: 'Standard' },
    ],
  },
}

export default function BuyDataPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  const network = params.network as string

  const networkInfo = networkDetails[network as keyof typeof networkDetails] || networkDetails.mtn

  useEffect(() => {
    const initializeUser = async () => {
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
        console.error('Error loading user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeUser()
  }, [supabase, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="lg:ml-64">
          <DashboardHeader user={null} />
          <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Loading...</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-2">{networkInfo.name}</h2>
            <p className="text-muted-foreground">{networkInfo.description}</p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {networkInfo.plans.map((plan) => (
              <Card key={plan.id} className="p-6 hover:border-primary/50 transition-all hover:shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{plan.duration}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Package size={20} className="text-primary" />
                  </div>
                </div>

                <div className="mb-4 py-4 border-y border-border">
                  <div className="text-3xl font-bold text-primary mb-2">GHC {plan.price.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      {plan.speed} Speed
                    </div>
                  </div>
                </div>

                <Button className="w-full flex items-center gap-2 justify-center">
                  Purchase Plan
                  <ArrowRight size={18} />
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Instant activation after purchase
                </p>
              </Card>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="mt-8 p-6 bg-muted/50">
            <h3 className="font-semibold text-foreground mb-3">About {networkInfo.name}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Instant delivery upon purchase</li>
              <li>✓ No hidden charges or expiration</li>
              <li>✓ Compatible with all devices</li>
              <li>✓ 24/7 customer support available</li>
            </ul>
          </Card>
        </main>
      </div>
    </div>
  )
}
