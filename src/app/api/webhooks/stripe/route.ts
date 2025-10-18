import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripeClient } from '@/lib/stripe';
import {
  createOrder as createWooCommerceOrder,
  createCustomer,
  getCustomerByEmail,
} from '@/lib/woocommerce';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature provided' }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json(
      { error: `Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}` },
      { status: 400 }
    );
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('[Stripe Webhook] checkout.session.completed, payment_status:', session.payment_status);

        // Only process if payment was successful
        if (session.payment_status === 'paid') {
          console.log('[Stripe Webhook] Processing payment...');
          await handleSuccessfulPayment(session);
        } else {
          console.log('[Stripe Webhook] Skipping - payment not paid yet');
        }
        break;
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleSuccessfulPayment(session);
        break;
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object as Stripe.Checkout.Session;
        console.error('Async payment failed for session:', session.id);
        // You could send an email notification here
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  try {
    console.log('[handleSuccessfulPayment] Starting for session:', session.id);
    const metadata = session.metadata;

    if (!metadata) {
      console.error('[handleSuccessfulPayment] No metadata found in session:', session.id);
      return;
    }

    // Parse cart items from metadata
    const cartItems = JSON.parse(metadata.cart_items || '[]');
    console.log('[handleSuccessfulPayment] Cart items:', cartItems.length);

    if (!cartItems || cartItems.length === 0) {
      console.error('[handleSuccessfulPayment] No cart items found in metadata:', session.id);
      return;
    }

    // Prepare billing address
    const billing = {
      first_name: metadata.billing_first_name || '',
      last_name: metadata.billing_last_name || '',
      company: metadata.billing_company || '',
      address_1: metadata.billing_address_1 || '',
      address_2: metadata.billing_address_2 || '',
      city: metadata.billing_city || '',
      state: metadata.billing_state || '',
      postcode: metadata.billing_postcode || '',
      country: metadata.billing_country || 'PL',
      email: metadata.billing_email || session.customer_details?.email || '',
      phone: metadata.billing_phone || session.customer_details?.phone || '',
    };

    // Prepare shipping address
    const shipping = {
      first_name: metadata.shipping_first_name || metadata.billing_first_name || '',
      last_name: metadata.shipping_last_name || metadata.billing_last_name || '',
      company: metadata.shipping_company || metadata.billing_company || '',
      address_1: metadata.shipping_address_1 || metadata.billing_address_1 || '',
      address_2: metadata.shipping_address_2 || metadata.billing_address_2 || '',
      city: metadata.shipping_city || metadata.billing_city || '',
      state: metadata.shipping_state || metadata.billing_state || '',
      postcode: metadata.shipping_postcode || metadata.billing_postcode || '',
      country: metadata.shipping_country || metadata.billing_country || 'PL',
    };

    // Try to find/create WooCommerce customer if user is registered
    let customerId = 0;
    const customerEmail = billing.email;
    console.log('[handleSuccessfulPayment] Customer email:', customerEmail);

    if (customerEmail) {
      // Check if user exists in our database
      const user = await prisma.user.findUnique({
        where: { email: customerEmail },
      });

      console.log('[handleSuccessfulPayment] User in database:', user ? `ID: ${user.id}` : 'Not found');

      if (user) {
        // User is registered in our system
        if (user.woocommerceCustomerId) {
          // Already has WooCommerce customer ID
          customerId = user.woocommerceCustomerId;
          console.log('[handleSuccessfulPayment] Using existing WC customer ID:', customerId);
        } else {
          console.log('[handleSuccessfulPayment] No WC customer ID, searching...');
          // Try to find existing WooCommerce customer
          const existingCustomer = await getCustomerByEmail(customerEmail);

          if (existingCustomer) {
            customerId = existingCustomer.id;
            console.log('[handleSuccessfulPayment] Found existing WC customer:', customerId);
            // Link to our user
            await prisma.user.update({
              where: { id: user.id },
              data: { woocommerceCustomerId: existingCustomer.id },
            });
          } else {
            console.log('[handleSuccessfulPayment] Creating new WC customer...');
            // Create new WooCommerce customer
            const newCustomer = await createCustomer({
              email: customerEmail,
              first_name: billing.first_name,
              last_name: billing.last_name,
              username: customerEmail.split('@')[0],
              billing,
              shipping,
            });

            if (newCustomer) {
              customerId = newCustomer.id;
              console.log('[handleSuccessfulPayment] Created WC customer:', customerId);
              // Save to our user
              await prisma.user.update({
                where: { id: user.id },
                data: { woocommerceCustomerId: newCustomer.id },
              });
            } else {
              console.error('[handleSuccessfulPayment] Failed to create WC customer');
            }
          }
        }
      } else {
        console.log('[handleSuccessfulPayment] User not registered, will create guest order');
      }
    }

    // Create WooCommerce order
    console.log('[handleSuccessfulPayment] Creating WC order with customer_id:', customerId);
    const orderData = {
      payment_method: 'stripe',
      payment_method_title: 'Stripe',
      set_paid: true, // Mark as paid since Stripe payment succeeded
      transaction_id: session.payment_intent as string,
      customer_id: customerId,
      billing,
      shipping,
      line_items: cartItems,
      meta_data: [
        {
          key: '_stripe_session_id',
          value: session.id,
        },
        {
          key: '_stripe_payment_intent',
          value: session.payment_intent,
        },
        {
          key: '_stripe_customer_id',
          value: session.customer,
        },
      ],
    };

    const order = await createWooCommerceOrder(orderData);

    if (order) {
      console.log('[handleSuccessfulPayment] WooCommerce order created successfully:', order.id);
      console.log('[handleSuccessfulPayment] Stripe session:', session.id);
      if (order.customer_id) {
        console.log('[handleSuccessfulPayment] WooCommerce customer ID:', order.customer_id);
      }
    } else {
      console.error('[handleSuccessfulPayment] Failed to create WooCommerce order');
      // You might want to send an alert/email here
    }
  } catch (error) {
    console.error('Error in handleSuccessfulPayment:', error);
    throw error;
  }
}
