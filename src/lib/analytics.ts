// Google Analytics 4 Event Tracking Utilities

export interface GAProduct {
  item_id: string;
  item_name: string;
  category: string;
  price: number;
  quantity: number;
  item_variant?: string;
}

export interface GAEcommerceEvent {
  currency: string;
  value: number;
  items: GAProduct[];
}

// Track when user views a product
export function trackProductView(product: GAProduct) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      currency: "USD",
      value: product.price,
      items: [product],
    });
  }
}

// Track when user adds product to cart
export function trackAddToCart(product: GAProduct) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "USD",
      value: product.price * product.quantity,
      items: [product],
    });
  }
}

// Track when user removes product from cart
export function trackRemoveFromCart(product: GAProduct) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "remove_from_cart", {
      currency: "USD",
      value: product.price * product.quantity,
      items: [product],
    });
  }
}

// Track when user views cart
export function trackViewCart(ecommerce: GAEcommerceEvent) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_cart", {
      currency: ecommerce.currency,
      value: ecommerce.value,
      items: ecommerce.items,
    });
  }
}

// Track when user begins checkout
export function trackBeginCheckout(ecommerce: GAEcommerceEvent) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "begin_checkout", {
      currency: ecommerce.currency,
      value: ecommerce.value,
      items: ecommerce.items,
    });
  }
}

// Track when user completes purchase
export function trackPurchase(
  transactionId: string,
  ecommerce: GAEcommerceEvent
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      currency: ecommerce.currency,
      value: ecommerce.value,
      items: ecommerce.items,
    });
  }
}

// Track custom events
export function trackEvent(
  eventName: string,
  parameters: Record<string, any> = {}
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
}

// Track page views (for single page applications)
export function trackPageView(url: string, title?: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID!, {
      page_location: url,
      page_title: title,
    });
  }
}
