'use server';

import {
  createOrder as createWooCommerceOrder,
  createCustomer,
  getCustomerByEmail,
} from '@/lib/woocommerce';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import type { WooCommerceOrder } from '@/types/woocommerce';

export async function createOrder(orderData: {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: any;
  shipping: any;
  line_items: Array<{
    product_id: number;
    quantity: number;
    variation_id?: number;
  }>;
  coupon_lines?: Array<{
    code: string;
  }>;
  customer_id?: number;
  transaction_id?: string;
  meta_data?: Array<{ key: string; value: any }>;
}): Promise<{ success: boolean; order?: WooCommerceOrder; error?: string }> {
  try {
    console.log('[createOrder] Starting order creation...');

    // Check if user is logged in
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    console.log('[createOrder] Session:', session ? `User: ${session.user.email}` : 'No session');

    let customerId = orderData.customer_id;

    // If user is logged in, ensure they have a WooCommerce customer account
    if (session?.user) {
      const user = session.user;
      console.log('[createOrder] User logged in, checking WooCommerce customer...');

      // Check if user already has a WooCommerce customer ID
      if (user.woocommerceCustomerId) {
        customerId = user.woocommerceCustomerId;
        console.log('[createOrder] Using existing WC customer ID:', customerId);
      } else {
        console.log('[createOrder] No WC customer ID, searching by email...');
        // Try to find existing customer by email
        const existingCustomer = await getCustomerByEmail(user.email);

        if (existingCustomer) {
          console.log('[createOrder] Found existing WC customer:', existingCustomer.id);
          // Link existing WooCommerce customer to our user
          customerId = existingCustomer.id;
          await prisma.user.update({
            where: { id: user.id },
            data: { woocommerceCustomerId: existingCustomer.id },
          });
        } else {
          console.log('[createOrder] Creating new WC customer...');
          // Create new WooCommerce customer
          const nameParts = user.name?.split(' ') || [];
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';

          const newCustomer = await createCustomer({
            email: user.email,
            first_name: firstName || orderData.billing.first_name,
            last_name: lastName || orderData.billing.last_name,
            username: user.email.split('@')[0],
            billing: orderData.billing,
            shipping: orderData.shipping,
          });

          if (newCustomer) {
            customerId = newCustomer.id;
            console.log('[createOrder] Created new WC customer:', customerId);
            // Save WooCommerce customer ID to our database
            await prisma.user.update({
              where: { id: user.id },
              data: { woocommerceCustomerId: newCustomer.id },
            });
          } else {
            console.error('[createOrder] Failed to create WC customer');
          }
        }
      }
    }

    console.log('[createOrder] Creating WC order with customer_id:', customerId || 0);

    // Create order with customer_id
    const order = await createWooCommerceOrder({
      ...orderData,
      customer_id: customerId || 0,
    });

    if (!order) {
      console.error('[createOrder] createWooCommerceOrder returned null');
      return {
        success: false,
        error: 'Nie udało się utworzyć zamówienia. Sprawdź konfigurację WooCommerce.',
      };
    }

    console.log('[createOrder] Order created successfully:', order.id);

    return {
      success: true,
      order,
    };
  } catch (error) {
    console.error('[createOrder] Error:', error);
    return {
      success: false,
      error: 'Wystąpił błąd podczas tworzenia zamówienia. Spróbuj ponownie.',
    };
  }
}
