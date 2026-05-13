'use client'

import { useEffect, useState } from 'react'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import { CheckCircle, Download } from 'lucide-react'

interface User {
  id: string
  email?: string
}

export default function BuyCheckerPage() {
  const [user, setUser] = useState<User | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const checkers = [
    {
      id: 'waec',
      name: 'WAEC Result Checker',
      description: 'Verify and download your WAEC examination results',
      price: 15.00,
      features: ['Real-time verification', 'PDF Download', 'Email Receipt'],
      icon: '📋',
    },
    {
      id: 'jamb',
      name: 'JAMB UTME Checker',
      description: 'Check your JAMB UTME results with detailed score breakdown',
      price: 10.00,
      features: ['Score Breakdown', 'Institution Matching', 'Email Report'],
      icon: '📊',
    },
    {
      id: 'neco',
      name: 'NECO Result Checker',
      description: 'Access your NECO examination results instantly',
      price: 12.00,
      features: ['Instant Access', 'Certificate Download', 'Print Ready'],
      icon: '✓',
    },
    {
      id: 'wassce',
      name: 'WASSCE Result Checker',
      description: 'Retrieve your WASSCE results with full transcript',
      price: 18.00,
      features: ['Full Transcript', 'GPA Calculation', 'Certified Copy'],
      icon: '🎓',
    },
    {
      id: 'bece',
      name: 'BECE Result Checker',
      description: 'Check Basic Education Certificate Examination results',
      price: 8.00,
      features: ['Quick Access', 'Subject Scores', 'Performance Report'],
      icon: '📈',
    },
    {
      id: 'custom',
      name: 'Custom Result Checker',
      description: 'Check results for other examinations and certifications',
      price: 20.00,
      features: ['Multiple Exams', 'Custom Verification', 'Priority Support'],
      icon: '🔧',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <div className="lg:ml-64">
        <DashboardHeader user={user} />

        <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Exam Result Checkers</h2>
            <p className="text-muted-foreground">
              Access and download your exam results from various examination bodies instantly
            </p>
          </div>

          {/* Checkers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checkers.map((checker) => (
              <Card key={checker.id} className="overflow-hidden hover:shadow-lg transition-all border border-border/50">
                <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                  <div className="text-4xl mb-4">{checker.icon}</div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{checker.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{checker.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-muted-foreground">Price:</span>
                      <span className="text-2xl font-bold text-primary">GHC {checker.price.toFixed(2)}</span>
                    </div>

                    <div className="space-y-2">
                      {checker.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                          <span className="text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-4">
                      <Download size={16} className="mr-2" />
                      Buy Checker
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Info Section */}
          <Card className="mt-12 p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-3">How It Works</h3>
            <ol className="space-y-2 text-sm text-blue-800 list-decimal list-inside">
              <li>Select the result checker you need</li>
              <li>Complete the purchase using your preferred payment method</li>
              <li>You&apos;ll receive instant access to check your results</li>
              <li>Download your results as PDF or print directly</li>
              <li>Share your results via email or SMS (optional)</li>
            </ol>
          </Card>
        </main>
      </div>
    </div>
  )
}
