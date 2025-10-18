// WooCommerce Product Types
export interface WooCommerceImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface WooCommerceCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  description: string;
  image?: WooCommerceImage;
  count: number;
}

export interface WooCommerceAttribute {
  id: number;
  name: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WooCommerceVariation {
  id: number;
  attributes: Array<{
    name: string;
    option: string;
  }>;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  image?: WooCommerceImage;
}

export interface WooCommerceProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  type: 'simple' | 'grouped' | 'external' | 'variable';
  status: 'draft' | 'pending' | 'private' | 'publish';
  featured: boolean;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  purchasable: boolean;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  manage_stock: boolean;
  categories: WooCommerceCategory[];
  tags: Array<{ id: number; name: string; slug: string }>;
  images: WooCommerceImage[];
  attributes: WooCommerceAttribute[];
  variations: number[];
  average_rating: string;
  rating_count: number;
  related_ids: number[];
  date_created: string;
  date_modified: string;
}

// Cart Types
export interface CartItem {
  product: WooCommerceProduct;
  quantity: number;
  selectedVariation?: WooCommerceVariation;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
}

// Customer Types
export interface WooCommerceCustomer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  billing: BillingAddress;
  shipping: ShippingAddress;
}

export interface BillingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone: string;
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

// Order Types
export interface WooCommerceOrder {
  id: number;
  parent_id: number;
  number: string;
  order_key: string;
  status: 'pending' | 'processing' | 'on-hold' | 'completed' | 'cancelled' | 'refunded' | 'failed';
  currency: string;
  date_created: string;
  date_modified: string;
  total: string;
  total_tax: string;
  shipping_total: string;
  customer_id: number;
  billing: BillingAddress;
  shipping: ShippingAddress;
  payment_method: string;
  payment_method_title: string;
  transaction_id: string;
  line_items: OrderLineItem[];
  meta_data?: Array<{
    id: number;
    key: string;
    value: any;
  }>;
  payment_url?: string;
}

export interface OrderLineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  subtotal: string;
  total: string;
  sku: string;
  price: number;
  image?: WooCommerceImage;
}

// API Response Types
export interface WooCommerceAPIResponse<T> {
  data: T;
  headers?: Record<string, string>;
}

export interface WooCommerceError {
  code: string;
  message: string;
  data?: {
    status: number;
  };
}
