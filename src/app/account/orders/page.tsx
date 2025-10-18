import { auth } from '@/lib/auth';
import { getOrdersByEmail, getCustomerOrders } from '@/lib/woocommerce';
import { OrdersList } from '@/components/account/orders-list';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import type { WooCommerceOrder } from '@/types/woocommerce';

export default async function OrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/login');
  }

  const user = session.user;

  // Try to fetch orders by WooCommerce customer ID first, then by email
  let orders: WooCommerceOrder[] = [];

  if (user.woocommerceCustomerId) {
    orders = await getCustomerOrders(user.woocommerceCustomerId);
  }

  // If no orders found by customer ID, try by email
  if (orders.length === 0 && user.email) {
    orders = await getOrdersByEmail(user.email);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Moje zamówienia</h1>
        <p className="text-gray-600">
          {orders.length > 0
            ? `Znaleziono ${orders.length} ${orders.length === 1 ? 'zamówienie' : 'zamówień'}`
            : 'Nie masz jeszcze żadnych zamówień'}
        </p>
      </div>

      <OrdersList orders={orders} />
    </div>
  );
}
