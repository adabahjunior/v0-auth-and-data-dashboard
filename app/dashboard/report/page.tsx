'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { DashboardSidebar } from '@/components/dashboard-sidebar'
import { DashboardHeader } from '@/components/dashboard-header'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { AlertCircle, CheckCircle, Send } from 'lucide-react'

interface User {
  id: string
  email: string
}

export default function ReportIssuePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('bug')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const initializeReport = async () => {
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
        console.error('Error loading report page:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeReport()
  }, [supabase, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would normally send the report to your backend
      console.log({ subject, description, category, userEmail: user?.email })
      setFormSubmitted(true)
      setSubject('')
      setDescription('')
      setCategory('bug')

      // Reset success message after 5 seconds
      setTimeout(() => setFormSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting report:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            <h2 className="text-3xl font-bold text-foreground mb-2">Report An Issue</h2>
            <p className="text-muted-foreground">Help us improve by reporting bugs or issues you&apos;ve encountered</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="p-6 md:p-8">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle size={64} className="text-green-500 mb-4" />
                    <h3 className="text-2xl font-bold text-foreground mb-2">Report Submitted</h3>
                    <p className="text-muted-foreground mb-6">
                      Thank you for reporting this issue. Our team will review it shortly and get back to you.
                    </p>
                    <Button
                      onClick={() => setFormSubmitted(false)}
                      variant="outline"
                    >
                      Submit Another Report
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                        <option value="payment">Payment Issue</option>
                        <option value="account">Account Issue</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Subject
                      </label>
                      <Input
                        type="text"
                        placeholder="Brief description of the issue"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="border-border focus:border-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-foreground">
                        Detailed Description
                      </label>
                      <textarea
                        placeholder="Please describe the issue in detail, including steps to reproduce if possible"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center gap-2 justify-center bg-primary hover:bg-primary/90 text-base py-6"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⚙️</span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          Submit Report
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* FAQ */}
              <Card className="p-6">
                <h4 className="font-bold text-foreground mb-4">Frequently Asked</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">How long does it take to respond?</p>
                    <p className="text-xs text-muted-foreground">Usually within 24-48 hours</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Can I track my report?</p>
                    <p className="text-xs text-muted-foreground">Yes, check your email for updates</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">Can I include attachments?</p>
                    <p className="text-xs text-muted-foreground">Email support@bossudatagh.com to attach files</p>
                  </div>
                </div>
              </Card>

              {/* Support Info */}
              <Card className="p-6 bg-primary/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground mb-2">Need Urgent Help?</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Contact our support team directly for immediate assistance
                    </p>
                    <a
                      href="mailto:support@bossudatagh.com"
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      support@bossudatagh.com
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
