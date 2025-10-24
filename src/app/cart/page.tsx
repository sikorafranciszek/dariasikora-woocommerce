'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cart-store';
import { toast } from 'sonner';
import { getCdnUrl } from '@/lib/cdn';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotal, getSubtotal } = useCartStore();

  const formatPrice = (price: string | number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(typeof price === 'string' ? parseFloat(price) : price);
  };

  const handleClearCart = () => {
    if (confirm('Are you sure you want to empty the cart?')) {
      clearCart();
      toast.success('Cart has been emptied');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-12 pb-8">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Add products to cart to continue shopping
            </p>
            <Button asChild size="lg">
              <Link href="/products">
                Browse products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const subtotal = getSubtotal();
  const total = getTotal();
  const savings = subtotal - total;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Cart</h1>
        <Button variant="outline" onClick={handleClearCart}>
          Empty cart
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const price = item.selectedVariation?.price || item.product.price;
            const regularPrice = item.selectedVariation?.regular_price || item.product.regular_price;
            const image = item.selectedVariation?.image || item.product.images[0];

            return (
              <Card key={`${item.product.id}-${item.selectedVariation?.id || ''}`}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100"
                    >
                      {image ? (
                        <Image
                          src={getCdnUrl(image.src)}
                          alt={image.alt || item.product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-400">
                          No image
                        </div>
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="font-semibold text-lg hover:text-primary"
                        >
                          {item.product.name}
                        </Link>
                        {item.selectedVariation && (
                          <p className="text-gray-600 text-sm">
                            {item.selectedVariation.attributes
                              .map((attr) => `${attr.name}: ${attr.option}`)
                              .join(', ')}
                          </p>
                        )}
                      </div>

                      <div className="flex items-end justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                              if (item.quantity > 1) {
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                  item.selectedVariation?.id
                                );
                              }
                            }}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1,
                                item.selectedVariation?.id
                              )
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price and Remove */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            {item.product.on_sale && (
                              <p className="text-gray-500 text-sm line-through">
                                {formatPrice(parseFloat(regularPrice) * item.quantity)}
                              </p>
                            )}
                            <p className="font-bold text-lg">
                              {formatPrice(parseFloat(price) * item.quantity)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              removeItem(item.product.id, item.selectedVariation?.id);
                              toast.success('Product removed from cart');
                            }}
                          >
                            <Trash2 className="h-5 w-5 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>

              {savings > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>You save:</span>
                  <span className="font-semibold">-{formatPrice(savings)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold">
                  {total >= 200 ? 'Free' : formatPrice(15)}
                </span>
              </div>

              {total < 200 && (
                <p className="text-sm text-gray-600">
                  Add {formatPrice(200 - total)} more to get free shipping
                </p>
              )}

              <Separator />

              <div className="flex justify-between text-lg">
                <span className="font-bold">Total:</span>
                <span className="font-bold">
                  {formatPrice(total >= 200 ? total : total + 15)}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">
                  Proceed to checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/products">Continue shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
