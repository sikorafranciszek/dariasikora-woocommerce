'use server';

import { getStripeClient } from '@/lib/stripe';
import Stripe from 'stripe';
import type { CartItem } from '@/store/cart-store';

interface BillingDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  address_2?: string;
  city: string;
  postcode: string;
  country: string;
  company?: string;
  state?: string;
}

interface CreateCheckoutSessionData {
  items: CartItem[];
  customerEmail: string;
  billingDetails: BillingDetails;
  shippingDetails?: BillingDetails;
  paymentMethodType?: string; // e.g., "stripe", "stripe_blik", "stripe_p24", "stripe_link"
  couponCode?: string; // WooCommerce coupon code
  discountAmount?: number; // Calculated discount amount
}

export async function createStripeCheckoutSession(data: CreateCheckoutSessionData) {
  try {
    const stripe = getStripeClient();

    // Calculate shipping cost
    const subtotal = data.items.reduce((sum, item) => {
      const price = parseFloat(item.selectedVariation?.price || item.product.price);
      return sum + price * item.quantity;
    }, 0);

    // Apply discount if provided
    const subtotalAfterDiscount = data.discountAmount
      ? subtotal - data.discountAmount
      : subtotal;

    const shippingCost = subtotalAfterDiscount >= 200 ? 0 : 15;

    // Create line items for products
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = data.items.map((item) => {
      const price = parseFloat(item.selectedVariation?.price || item.product.price);
      return {
        price_data: {
          currency: 'pln',
          product_data: {
            name: item.product.name,
            description: item.selectedVariation
              ? `Wariant: ${Object.values(item.selectedVariation.attributes || {}).join(', ')}`
              : undefined,
            images: item.product.images?.[0]?.src ? [item.product.images[0].src] : [],
          },
          unit_amount: Math.round(price * 100), // Stripe expects amount in cents
        },
        quantity: item.quantity,
      };
    });

    // Add discount as a negative line item if applicable
    if (data.discountAmount && data.discountAmount > 0) {
      line_items.push({
        price_data: {
          currency: 'pln',
          product_data: {
            name: data.couponCode ? `Rabat - ${data.couponCode}` : 'Rabat',
            description: 'Kupon rabatowy',
          },
          unit_amount: -Math.round(data.discountAmount * 100), // Negative amount for discount
        },
        quantity: 1,
      });
    }

    // Add shipping as a line item if applicable
    if (shippingCost > 0) {
      line_items.push({
        price_data: {
          currency: 'pln',
          product_data: {
            name: 'Dostawa',
            description: 'Koszt wysyłki',
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Prepare metadata for webhook (simplified cart data for WooCommerce order creation)
    const orderMetadata: Record<string, string> = {
      billing_first_name: data.billingDetails.first_name,
      billing_last_name: data.billingDetails.last_name,
      billing_email: data.billingDetails.email,
      billing_phone: data.billingDetails.phone,
      billing_address_1: data.billingDetails.address_1,
      billing_address_2: data.billingDetails.address_2 || '',
      billing_city: data.billingDetails.city,
      billing_postcode: data.billingDetails.postcode,
      billing_country: data.billingDetails.country,
      billing_company: data.billingDetails.company || '',
      billing_state: data.billingDetails.state || '',
      shipping_first_name: data.shippingDetails?.first_name || data.billingDetails.first_name,
      shipping_last_name: data.shippingDetails?.last_name || data.billingDetails.last_name,
      shipping_address_1: data.shippingDetails?.address_1 || data.billingDetails.address_1,
      shipping_address_2: data.shippingDetails?.address_2 || data.billingDetails.address_2 || '',
      shipping_city: data.shippingDetails?.city || data.billingDetails.city,
      shipping_postcode: data.shippingDetails?.postcode || data.billingDetails.postcode,
      shipping_country: data.shippingDetails?.country || data.billingDetails.country,
      shipping_company: data.shippingDetails?.company || data.billingDetails.company || '',
      shipping_state: data.shippingDetails?.state || data.billingDetails.state || '',
      cart_items: JSON.stringify(
        data.items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          variation_id: item.selectedVariation?.id || 0,
        }))
      ),
    };

    // Add coupon code to metadata if provided
    if (data.couponCode) {
      orderMetadata.coupon_code = data.couponCode;
    }

    // Map payment method types
    const getStripePaymentMethods = (methodType?: string): string[] => {
      switch (methodType) {
        case 'stripe_blik':
          return ['blik'];
        case 'stripe_p24':
          return ['p24'];
        case 'stripe_link':
          return ['card', 'link']; // Link works with cards
        case 'stripe':
        default:
          return ['card']; // Default to card payments
      }
    };

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: getStripePaymentMethods(data.paymentMethodType),
      line_items,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      customer_email: data.customerEmail,
      metadata: orderMetadata,
      locale: 'pl',
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['PL', 'US', 'GB', 'CA', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'SE', 'DK', 'FI', 'NO', 'IE', 'PT', 'CZ', 'GR', 'HU', 'RO'],
      },
      phone_number_collection: {
        enabled: true,
      },
    });

    if (!session.url) {
      throw new Error('Failed to create Stripe Checkout Session URL');
    }

    return {
      success: true,
      url: session.url,
      sessionId: session.id,
    };
  } catch (error) {
    console.error('Error creating Stripe Checkout Session:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create checkout session',
    };
  }
}

export async function verifyStripeSession(sessionId: string) {
  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return {
      success: true,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
      },
    };
  } catch (error) {
    console.error('Error verifying Stripe session:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to verify session',
    };
  }
}
