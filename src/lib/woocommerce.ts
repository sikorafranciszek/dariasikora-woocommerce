'use server';

import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';
import type {
  WooCommerceProduct,
  WooCommerceCategory,
  WooCommerceOrder,
  WooCommerceCustomer,
  WooCommerceVariation,
} from '@/types/woocommerce';

// Initialize WooCommerce API Client - tylko po stronie serwera
function getApiClient() {
  if (!process.env.NEXT_PUBLIC_WOOCOMMERCE_URL) {
    throw new Error('NEXT_PUBLIC_WOOCOMMERCE_URL is not defined');
  }
  if (!process.env.WOOCOMMERCE_CONSUMER_KEY) {
    throw new Error('WOOCOMMERCE_CONSUMER_KEY is not defined');
  }
  if (!process.env.WOOCOMMERCE_CONSUMER_SECRET) {
    throw new Error('WOOCOMMERCE_CONSUMER_SECRET is not defined');
  }

  return new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WOOCOMMERCE_URL,
    consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
    consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    version: 'wc/v3',
    queryStringAuth: true,
  });
}

// Products API
export const getProducts = async (params?: {
  page?: number;
  per_page?: number;
  search?: string;
  category?: number;
  featured?: boolean;
  on_sale?: boolean;
  orderby?: 'date' | 'id' | 'title' | 'popularity' | 'rating' | 'price';
  order?: 'asc' | 'desc';
}): Promise<WooCommerceProduct[]> => {
  try {
    const api = getApiClient();
    const response = await api.get('products', {
      per_page: params?.per_page || 10,
      page: params?.page || 1,
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (id: number): Promise<WooCommerceProduct | null> => {
  try {
    const api = getApiClient();
    const response = await api.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

export const getProductBySlug = async (slug: string): Promise<WooCommerceProduct | null> => {
  try {
    const api = getApiClient();
    const response = await api.get('products', { slug });
    return response.data[0] || null;
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
    return null;
  }
};

export const getProductVariations = async (productId: number): Promise<WooCommerceVariation[]> => {
  try {
    const api = getApiClient();
    const response = await api.get(`products/${productId}/variations`, {
      per_page: 100,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching variations for product ${productId}:`, error);
    return [];
  }
};

// Categories API
export const getCategories = async (params?: {
  page?: number;
  per_page?: number;
  parent?: number;
}): Promise<WooCommerceCategory[]> => {
  try {
    const api = getApiClient();
    const response = await api.get('products/categories', {
      per_page: params?.per_page || 100,
      page: params?.page || 1,
      ...params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

export const getCategory = async (id: number): Promise<WooCommerceCategory | null> => {
  try {
    const api = getApiClient();
    const response = await api.get(`products/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category ${id}:`, error);
    return null;
  }
};

// Orders API
export const createOrder = async (orderData: {
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
  customer_id?: number;
}): Promise<WooCommerceOrder | null> => {
  try {
    const api = getApiClient();
    const response = await api.post('orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

export const getOrder = async (id: number): Promise<WooCommerceOrder | null> => {
  try {
    const api = getApiClient();
    const response = await api.get(`orders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    return null;
  }
};

export const getCustomerOrders = async (customerId: number): Promise<WooCommerceOrder[]> => {
  try {
    const api = getApiClient();
    const response = await api.get('orders', {
      customer: customerId,
      per_page: 100,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching orders for customer ${customerId}:`, error);
    return [];
  }
};

export const getOrdersByEmail = async (email: string): Promise<WooCommerceOrder[]> => {
  try {
    const api = getApiClient();
    const response = await api.get('orders', {
      search: email,
      per_page: 100,
    });
    // Filter to only orders with matching billing email
    const orders = response.data as WooCommerceOrder[];
    return orders.filter(order => order.billing.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
    console.error(`Error fetching orders for email ${email}:`, error);
    return [];
  }
};

// Customers API
export const createCustomer = async (customerData: {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password?: string;
  billing?: any;
  shipping?: any;
}): Promise<WooCommerceCustomer | null> => {
  try {
    const api = getApiClient();
    // Generate random password if not provided (customer already has account in our system)
    const data = {
      ...customerData,
      password: customerData.password || Math.random().toString(36).slice(-12) + 'Aa1!',
    };
    const response = await api.post('customers', data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating customer:', error);

    // Check if it's a duplicate email/username error
    if (error.response?.data) {
      console.error('WooCommerce error details:', JSON.stringify(error.response.data, null, 2));

      // If customer already exists, try to find them
      if (error.response.data.code === 'registration-error-email-exists' ||
          error.response.data.code === 'registration-error-username-exists') {
        console.log('Customer already exists, trying to find by email...');
        return await getCustomerByEmail(customerData.email);
      }
    }

    return null;
  }
};

export const getCustomer = async (id: number): Promise<WooCommerceCustomer | null> => {
  try {
    const api = getApiClient();
    const response = await api.get(`customers/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching customer ${id}:`, error);
    return null;
  }
};

export const getCustomerByEmail = async (email: string): Promise<WooCommerceCustomer | null> => {
  try {
    const api = getApiClient();
    const response = await api.get('customers', {
      search: email,
      per_page: 100, // Increase to handle multiple results
    });
    const customers = response.data as WooCommerceCustomer[];

    // Filter to find exact email match (search can return partial matches)
    const exactMatch = customers.find(
      (customer) => customer.email.toLowerCase() === email.toLowerCase()
    );

    console.log(`[getCustomerByEmail] Searching for: ${email}, found: ${exactMatch ? exactMatch.id : 'none'}`);

    return exactMatch || null;
  } catch (error) {
    console.error(`Error fetching customer by email ${email}:`, error);
    return null;
  }
};

export const updateCustomer = async (
  id: number,
  customerData: Partial<WooCommerceCustomer>
): Promise<WooCommerceCustomer | null> => {
  try {
    const api = getApiClient();
    const response = await api.put(`customers/${id}`, customerData);
    return response.data;
  } catch (error) {
    console.error(`Error updating customer ${id}:`, error);
    return null;
  }
};

// Search API
export const searchProducts = async (query: string, limit = 10): Promise<WooCommerceProduct[]> => {
  try {
    const api = getApiClient();
    const response = await api.get('products', {
      search: query,
      per_page: limit,
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching products with query "${query}":`, error);
    return [];
  }
};

// Payment Gateways API
export interface PaymentGateway {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  method_title: string;
  method_description: string;
  settings?: Record<string, any>;
}

export const getPaymentGateways = async (): Promise<PaymentGateway[]> => {
  try {
    const api = getApiClient();
    const response = await api.get('payment_gateways');
    // Zwróć tylko włączone bramy płatności
    return response.data.filter((gateway: PaymentGateway) => gateway.enabled);
  } catch (error) {
    console.error('Error fetching payment gateways:', error);
    return [];
  }
};
