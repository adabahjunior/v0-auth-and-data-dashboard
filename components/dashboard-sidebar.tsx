'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Wallet,
  History,
  ShoppingCart,
  Store,
  Code,
  AlertCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isBuyDataOpen, setIsBuyDataOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  const networks = [
    { id: 'mtn', name: 'MTN' },
    { id: 'mtn-express', name: 'MTN EXPRESS' },
    { id: 'telecel', name: 'TELECEL' },
    { id: 'airteltigo-bigtime', name: 'AIRTELTIGO BIGTIME' },
    { id: 'airteltigo-ishare', name: 'AIRTELTIGO iSHARE' },
  ]

  const isActive = (href: string) => pathname === href

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const sidebarItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Wallet', href: '/dashboard/wallet', icon: Wallet },
    { label: 'Transactions', href: '/dashboard/transactions', icon: History },
    { label: 'My Shop', href: '/dashboard/shop', icon: Store },
    { label: 'Developer API', href: '/dashboard/api', icon: Code },
    { label: 'Report An Issue', href: '/dashboard/report', icon: AlertCircle },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
            BD
          </div>
          <span className="font-bold text-lg text-sidebar-foreground hidden lg:inline">BossuData</span>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {sidebarItems.slice(0, 3).map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive(item.href)
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <Icon size={20} />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          )
        })}

        {/* Buy Data Dropdown */}
        <button
          onClick={() => setIsBuyDataOpen(!isBuyDataOpen)}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all"
        >
          <ShoppingCart size={20} />
          <span className="hidden lg:inline">Buy Data</span>
          <ChevronDown size={16} className={`ml-auto transition-transform ${isBuyDataOpen ? 'rotate-180' : ''}`} />
        </button>

        {isBuyDataOpen && (
          <div className="ml-4 space-y-2 border-l-2 border-sidebar-primary pl-4">
            {networks.map((network) => (
              <Link
                key={network.id}
                href={`/dashboard/buy-data/${network.id}`}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === `/dashboard/buy-data/${network.id}`
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                {network.name}
              </Link>
            ))}
          </div>
        )}

        {/* Other Pages */}
        <div className="mt-6 pt-6 border-t border-sidebar-border">
          {sidebarItems.slice(3).map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive(item.href)
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon size={20} />
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center gap-2 justify-center lg:justify-start"
        >
          <LogOut size={20} />
          <span className="hidden lg:inline">Logout</span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:w-64 lg:h-screen lg:flex lg:bg-sidebar lg:flex-col lg:border-r lg:border-sidebar-border lg:z-40">
        <SidebarContent />
      </div>

      {/* Mobile Header with Hamburger */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-sidebar border-b border-sidebar-border flex items-center px-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)} className="text-sidebar-foreground">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex-1 flex justify-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
              BD
            </div>
            <span className="font-bold text-sidebar-foreground">BossuData</span>
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-black/50 z-40" onClick={() => setIsOpen(false)}>
          <div className="bg-sidebar h-screen w-64 border-r border-sidebar-border" onClick={(e) => e.stopPropagation()}>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Mobile Padding */}
      <div className="lg:hidden h-16" />
    </>
  )
}
