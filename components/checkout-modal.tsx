'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  data_size_gb?: number
}

interface User {
  id: string
  email: string
}

interface CheckoutModalProps {
  product: Product
  user: User | null
  onClose: () => void
  onPurchase: () => void
}

export function CheckoutModal({
  product,
  user,
  onClose,
  onPurchase,
}: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePurchase = async () => {
    setIsProcessing(true)
    try {
      await onPurchase()
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
          <DialogDescription>
            Review your BossuData Gh bundle purchase details below
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="text-foreground">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-foreground text-sm">{product.description}</p>
              </div>
              {product.data_size_gb && (
                <div>
                  <p className="text-sm text-muted-foreground">Bundle Size</p>
                  <p className="text-foreground font-medium">{product.data_size_gb} GB</p>
                </div>
              )}
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground mb-1">Total Price</p>
                <p className="text-3xl font-bold text-foreground">
                  GHC {product.price.toFixed(2)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <p className="text-sm text-blue-900">
                <strong>Note:</strong> This test purchase will be saved to your BossuData Gh account. You&apos;ll be able to download and resell the bundle immediately after confirmation.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Purchasing as</p>
            <p className="text-foreground font-medium">{user?.email}</p>
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handlePurchase}
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? 'Processing...' : 'Confirm Purchase'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
