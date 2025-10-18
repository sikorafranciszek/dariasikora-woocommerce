'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import type { WooCommerceProduct } from '@/types/woocommerce';
import { useCartStore } from '@/store/cart-store';
import { toast } from 'sonner';

interface ProductCardProps {
  product: WooCommerceProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const mainImage = product.images[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.type === 'variable') {
      // Redirect to product page for variable products
      return;
    }

    addItem(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: 'PLN',
    }).format(parseFloat(price));
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group h-full transition-all hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 flex flex-col bg-card/50 backdrop-blur overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted/50">
            {mainImage ? (
              <Image
                src={mainImage.src}
                alt={mainImage.alt || product.name}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No image
              </div>
            )}
            {product.on_sale && (
              <Badge className="absolute right-3 top-3 bg-destructive shadow-lg">Sale</Badge>
            )}
            {product.featured && (
              <Badge className="absolute left-3 top-3 bg-primary shadow-lg">Featured</Badge>
            )}
            {product.stock_status === 'outofstock' && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <Badge variant="secondary" className="shadow-lg">Out of Stock</Badge>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 bottom-3 opacity-0 transition-all group-hover:opacity-100 bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toast.success('Added to favorites');
              }}
            >
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
          <h3 className="mb-1.5 sm:mb-2 line-clamp-2 font-semibold text-base sm:text-lg text-foreground tracking-tight leading-tight">{product.name}</h3>
          {product.short_description && (
            <div
              className="mb-2 sm:mb-3 line-clamp-2 text-muted-foreground text-xs sm:text-sm leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.short_description }}
            />
          )}
          <div className="mt-auto pt-2 sm:pt-3 border-t border-border/50">
            {product.on_sale && product.regular_price && (
              <span className="mr-1.5 sm:mr-2 text-muted-foreground text-xs sm:text-sm line-through">
                {formatPrice(product.regular_price)}
              </span>
            )}
            <span className="font-bold text-lg sm:text-xl text-primary">
              {formatPrice(product.price)}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-3 sm:p-4 md:p-5 pt-0">
          <Button
            className="w-full shadow-md hover:shadow-lg transition-shadow text-xs sm:text-sm h-9 sm:h-10"
            onClick={handleAddToCart}
            disabled={product.stock_status === 'outofstock'}
          >
            <ShoppingCart className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{product.type === 'variable' ? 'View Options' : 'Add to Cart'}</span>
            <span className="sm:hidden">{product.type === 'variable' ? 'Options' : 'Add'}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
