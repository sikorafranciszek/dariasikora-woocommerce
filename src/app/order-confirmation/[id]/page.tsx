import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getOrder } from './actions';
import { OrderConfirmationClient } from '@/components/order/order-confirmation-client';

interface OrderConfirmationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { id } = await params;
  const order = await getOrder(Number(id));

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto text-center">
          <CardContent className="pt-12 pb-8">
            <h2 className="text-2xl font-bold mb-2">Order not found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find an order with the given number.
            </p>
            <Button asChild>
              <Link href="/products">Return to store</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <OrderConfirmationClient order={order} />
    </div>
  );
}
