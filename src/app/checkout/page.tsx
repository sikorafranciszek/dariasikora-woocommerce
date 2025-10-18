import { getPaymentGateways } from '@/lib/woocommerce';
import { CheckoutFormClient } from '@/components/checkout/checkout-form-client';

export default async function CheckoutPage() {
  const paymentGateways = await getPaymentGateways();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Checkout</h1>

      {paymentGateways.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No payment methods available. Check WooCommerce configuration.
          </p>
        </div>
      ) : (
        <CheckoutFormClient paymentGateways={paymentGateways} />
      )}
    </div>
  );
}
