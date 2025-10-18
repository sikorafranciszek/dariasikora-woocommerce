'use server';

import { getOrder as getWooCommerceOrder } from '@/lib/woocommerce';
import type { WooCommerceOrder } from '@/types/woocommerce';

export async function getOrder(id: number): Promise<WooCommerceOrder | null> {
  return await getWooCommerceOrder(id);
}
