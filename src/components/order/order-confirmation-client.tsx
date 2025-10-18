'use client';

import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { WooCommerceOrder } from '@/types/woocommerce';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface OrderConfirmationClientProps {
  order: WooCommerceOrder;
}

export function OrderConfirmationClient({ order }: OrderConfirmationClientProps) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Awaiting payment',
      processing: 'Processing',
      'on-hold': 'On hold',
      completed: 'Completed',
      cancelled: 'Cancelled',
      refunded: 'Refunded',
      failed: 'Failed',
    };
    return statusMap[status] || status;
  };

  // Calculate subtotal from line items
  const calculateSubtotal = () => {
    return order.line_items.reduce((sum, item) => {
      return sum + parseFloat(item.subtotal);
    }, 0).toString();
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <CardTitle className="text-3xl">Thank you for your order!</CardTitle>
        <p className="text-gray-600 mt-2">
          Your order has been received and is being processed.
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Details */}
        <div className="rounded-lg bg-gray-50 p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-gray-600 text-sm">Order Number</p>
              <p className="font-bold text-lg">#{order.number}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Order Date</p>
              <p className="font-semibold">
                {format(new Date(order.date_created), 'MMMM dd, yyyy, HH:mm', { locale: enUS })}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Status</p>
              <p className="font-semibold">{getStatusLabel(order.status)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Payment Method</p>
              <p className="font-semibold">{order.payment_method_title}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Order Items */}
        <div>
          <h3 className="mb-4 font-bold text-xl flex items-center">
            <Package className="mr-2 h-5 w-5" />
            Ordered Products
          </h3>
          <div className="space-y-2">
            {order.line_items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  {item.sku && <p className="text-gray-600 text-sm">SKU: {item.sku}</p>}
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    {item.quantity} x {formatPrice(item.price.toString())}
                  </p>
                  <p className="text-gray-600 text-sm">{formatPrice(item.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Order Total */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-semibold">{formatPrice(calculateSubtotal())}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-semibold">{formatPrice(order.shipping_total)}</span>
          </div>
          {parseFloat(order.total_tax) > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Tax:</span>
              <span className="font-semibold">{formatPrice(order.total_tax)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between text-lg">
            <span className="font-bold">Total:</span>
            <span className="font-bold">{formatPrice(order.total)}</span>
          </div>
        </div>

        <Separator />

        {/* Addresses */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 font-bold">Billing Address</h3>
            <div className="text-gray-600 text-sm">
              <p>{order.billing.first_name} {order.billing.last_name}</p>
              {order.billing.company && <p>{order.billing.company}</p>}
              <p>{order.billing.address_1}</p>
              {order.billing.address_2 && <p>{order.billing.address_2}</p>}
              <p>{order.billing.postcode} {order.billing.city}</p>
              <p className="mt-2">{order.billing.email}</p>
              <p>{order.billing.phone}</p>
            </div>
          </div>
          <div>
            <h3 className="mb-2 font-bold">Shipping Address</h3>
            <div className="text-gray-600 text-sm">
              <p>{order.shipping.first_name} {order.shipping.last_name}</p>
              {order.shipping.company && <p>{order.shipping.company}</p>}
              <p>{order.shipping.address_1}</p>
              {order.shipping.address_2 && <p>{order.shipping.address_2}</p>}
              <p>{order.shipping.postcode} {order.shipping.city}</p>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        {order.payment_method === 'bacs' && order.status === 'pending' && (
          <div className="rounded-lg bg-blue-50 p-4">
            <h3 className="mb-2 font-bold text-blue-900">Payment Instructions</h3>
            <p className="text-blue-800 text-sm">
              Please make a bank transfer to our account. Details have been sent to your
              email address. The order will be processed after the payment is received.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild className="flex-1">
            <Link href="/products">
              Continue shopping
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/account/orders">View all orders</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
