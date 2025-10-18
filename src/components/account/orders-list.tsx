'use client';

import Link from 'next/link';
import { Package, Eye } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { WooCommerceOrder } from '@/types/woocommerce';
import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';

interface OrdersListProps {
  orders: WooCommerceOrder[];
}

export function OrdersList({ orders }: OrdersListProps) {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">No orders</h3>
            <p className="text-gray-600 mb-6">You don't have any orders yet</p>
            <Button asChild>
              <Link href="/products">Start shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      pending: { label: 'Pending', variant: 'secondary' },
      processing: { label: 'Processing', variant: 'default' },
      'on-hold': { label: 'On hold', variant: 'outline' },
      completed: { label: 'Completed', variant: 'default' },
      cancelled: { label: 'Cancelled', variant: 'destructive' },
      refunded: { label: 'Refunded', variant: 'destructive' },
      failed: { label: 'Failed', variant: 'destructive' },
    };

    const statusInfo = statusMap[status] || { label: status, variant: 'outline' as const };
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(price));
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                <CardDescription>
                  {formatDistanceToNow(new Date(order.date_created), {
                    addSuffix: true,
                    locale: enUS,
                  })}
                </CardDescription>
              </div>
              {getStatusBadge(order.status)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Order Items */}
              <div className="space-y-2">
                {order.line_items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">{formatPrice(item.total)}</span>
                  </div>
                ))}
                {order.line_items.length > 3 && (
                  <p className="text-sm text-gray-500">
                    +{order.line_items.length - 3} more products
                  </p>
                )}
              </div>

              {/* Order Total */}
              <div className="flex justify-between pt-4 border-t font-bold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>

              {/* Payment Method */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Payment method: {order.payment_method_title}</span>
                {order.transaction_id && (
                  <span className="text-xs">ID: {order.transaction_id}</span>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link href={`/order-confirmation/${order.id}`}>
                    <Eye className="mr-2 h-4 w-4" />
                    View details
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
