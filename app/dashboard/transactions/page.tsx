'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Filter } from 'lucide-react'

interface User {
  id: string
  email: string
}

interface Purchase {
  id: string
  product_id: string
  amount: number
  purchase_date: string
  product_name?: string
}

export default function TransactionsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const initializeTransactions = async () => {
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

        // Fetch user's purchases
        const { data: purchasesData, error } = await supabase
          .from('purchases')
          .select('*')
          .eq('user_id', authUser.id)
          .order('purchase_date', { ascending: false })

        if (error) throw error
        setPurchases(purchasesData || [])
      } catch (error) {
        console.error('Error loading transactions:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeTransactions()
  }, [supabase, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardSidebar />
        <div className="lg:ml-64">
          <DashboardHeader user={null} />
          <div className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">Loading transactions...</p>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Transactions</h2>
              <p className="text-muted-foreground">View all your purchases and earnings</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors">
              <Filter size={18} />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>

          {/* Transactions Table */}
          {purchases.length === 0 ? (
            <Card className="p-12 text-center">
              <ArrowDownLeft size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground mb-2">No transactions yet</p>
              <p className="text-sm text-muted-foreground">Start purchasing data bundles to see your transaction history</p>
            </Card>
          ) : (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purchases.map((purchase) => (
                      <tr key={purchase.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-foreground">Data Bundle Purchase</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <ArrowUpRight size={16} className="text-destructive" />
                            <span className="text-muted-foreground">Purchase</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-foreground">-GHC {purchase.amount.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {new Date(purchase.purchase_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">Completed</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
