'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  data_size_gb?: number
}

interface ProductGridProps {
  products: Product[]
  onSelectProduct: (product: Product) => void
}

export function ProductGrid({ products, onSelectProduct }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.category}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-between">
            <p className="text-muted-foreground text-sm mb-3">
              {product.description}
            </p>
            {product.data_size_gb && (
              <div className="mb-3 p-2 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium text-primary">
                  {product.data_size_gb} GB Bundle
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-foreground">
                GHC {product.price.toFixed(2)}
              </div>
              <Button onClick={() => onSelectProduct(product)}>
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
