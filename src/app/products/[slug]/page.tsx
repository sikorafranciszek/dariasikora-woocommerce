import { getProductBySlug, getProductVariations } from '@/lib/woocommerce';
import { ProductDetailClient } from '@/components/products/product-detail-client';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  let variations: Awaited<ReturnType<typeof getProductVariations>> = [];
  if (product.type === 'variable' && product.variations.length > 0) {
    variations = await getProductVariations(product.id);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailClient product={product} variations={variations} />
    </div>
  );
}
