'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Minus, Plus, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCartStore } from '@/store/cart-store';
import { toast } from 'sonner';
import type { WooCommerceProduct, WooCommerceVariation } from '@/types/woocommerce';

interface ProductDetailClientProps {
  product: WooCommerceProduct;
  variations: WooCommerceVariation[];
}

export function ProductDetailClient({ product, variations }: ProductDetailClientProps) {
  const [selectedVariation, setSelectedVariation] = useState<WooCommerceVariation | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (product.type === 'variable' && !selectedVariation) {
      toast.error('Please select a product variant');
      return;
    }

    addItem(product, quantity, selectedVariation);
    toast.success(`${product.name} added to cart`);
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  };

  const currentPrice = selectedVariation?.price || product.price;
  const regularPrice = selectedVariation?.regular_price || product.regular_price;
  const isOnSale = selectedVariation?.on_sale || product.on_sale;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
          {product.images[selectedImage] ? (
            <Image
              src={product.images[selectedImage].src}
              alt={product.images[selectedImage].alt || product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              No image
            </div>
          )}
          {isOnSale && (
            <Badge className="absolute right-4 top-4 bg-red-500">Sale</Badge>
          )}
        </div>

        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-square overflow-hidden rounded-md border-2 transition-all ${
                  selectedImage === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || product.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
          {product.categories.length > 0 && (
            <div className="flex gap-2">
              {product.categories.map((category) => (
                <Badge key={category.id} variant="secondary">
                  {category.name}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          {isOnSale && (
            <span className="text-2xl text-gray-500 line-through">
              {formatPrice(regularPrice)}
            </span>
          )}
          <span className="text-4xl font-bold">{formatPrice(currentPrice)}</span>
        </div>

        {product.short_description && (
          <div
            className="text-gray-600"
            dangerouslySetInnerHTML={{ __html: product.short_description }}
          />
        )}

        {/* Variations */}
        {product.type === 'variable' && variations.length > 0 && (
          <div className="space-y-4">
            <Select
              onValueChange={(value) => {
                const variation = variations.find((v) => v.id === Number(value));
                setSelectedVariation(variation);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                {variations.map((variation) => (
                  <SelectItem key={variation.id} value={variation.id.toString()}>
                    {variation.attributes.map((attr) => `${attr.name}: ${attr.option}`).join(', ')} - {formatPrice(variation.price)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Quantity and Add to Cart */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-semibold">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1"
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock_status === 'outofstock'}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {product.stock_status === 'outofstock' && (
            <p className="text-red-600 font-semibold">Product unavailable</p>
          )}
        </div>

        {/* Product Meta */}
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">SKU:</span>
              <span className="font-semibold">{product.sku || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Availability:</span>
              <span className="font-semibold">
                {product.stock_status === 'instock' ? 'In stock' : 'Out of stock'}
              </span>
            </div>
            {product.stock_quantity && (
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span className="font-semibold">{product.stock_quantity} pcs.</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Product Details Tabs - Full Width */}
      <div className="lg:col-span-2 mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="additional">Additional Information</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            {product.description ? (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <p className="text-gray-600">No product description</p>
            )}
          </TabsContent>
          <TabsContent value="additional" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {product.attributes.length > 0 ? (
                  <div className="space-y-2">
                    {product.attributes.map((attr) => (
                      <div key={attr.id} className="flex justify-between border-b pb-2">
                        <span className="font-semibold">{attr.name}:</span>
                        <span>{attr.options.join(', ')}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No additional information</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
