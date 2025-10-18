import { Suspense } from "react";
import Link from "next/link";
import { getProducts } from "@/lib/woocommerce";
import { ProductCard } from "@/components/products/product-card";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  createSearchParamsCache,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
} from "nuqs/server";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const searchParamsCache = createSearchParamsCache({
  search: parseAsString,
  category: parseAsInteger,
  featured: parseAsBoolean,
  on_sale: parseAsBoolean,
  page: parseAsInteger.withDefault(1),
});

type SearchParams = Awaited<ReturnType<typeof searchParamsCache.parse>>;

/**
 * Render a product listing based on parsed search parameters.
 *
 * Fetches products using the provided filters and renders a responsive grid of ProductCard components when products are found; otherwise renders a "no products found" message or an error card if fetching fails.
 *
 * @param searchParams - Parsed query parameters used to filter products. May include:
 *   - `page`: page number to request
 *   - `search`: full-text search string
 *   - `category`: category id to filter by
 *   - `featured`: whether to only include featured products
 *   - `on_sale`: whether to only include products on sale
 * @returns A React element containing the product grid, a no-results message, or an error notice.
 */
async function ProductsList({ searchParams }: { searchParams: SearchParams }) {
  try {
    const params: any = {
      page: searchParams.page,
      per_page: 12,
    };

    if (searchParams.search) {
      params.search = searchParams.search;
    }

    if (searchParams.category) {
      params.category = searchParams.category;
    }

    if (searchParams.featured) {
      params.featured = searchParams.featured;
    }

    if (searchParams.on_sale) {
      params.on_sale = searchParams.on_sale;
    }

    const products = await getProducts(params);

    if (!products || products.length === 0) {
      return (
        <Card className="p-12 text-center bg-muted/30">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-3 text-foreground">
              No products found
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Try changing your search criteria or browse all products
            </p>
          </div>
        </Card>
      );
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading products:", error);
    return (
      <Card className="p-12 text-center bg-destructive/10 border-destructive/20">
        <div className="max-w-md mx-auto">
          <p className="text-destructive font-semibold text-lg mb-2">
            Error loading products
          </p>
          <p className="text-sm text-muted-foreground">
            Make sure you have correctly configured your WooCommerce connection
            in the .env.local file
          </p>
        </div>
      </Card>
    );
  }
}

function ProductsSkeletonGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(12)].map((_, i) => (
        <Card key={i}>
          <Skeleton className="aspect-square rounded-t-lg" />
          <CardContent className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

/**
 * Render the Products page with header, breadcrumbs, and product listings driven by incoming query parameters.
 *
 * @param searchParams - A Promise resolving to the raw Next.js query parameters (string or string[] values) provided to the page; used to determine filters such as search, category, featured, on_sale, and page.
 * @returns The page UI containing breadcrumbs, a dynamic title and subtitle, and a products grid (or skeleton fallback) reflecting the provided search filters.
 */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParamsCache.parse(await searchParams);

  let title = "All Products";
  let subtitle = "Browse our wide selection of handmade primitive dolls";

  if (params.search) {
    title = `Search results: "${params.search}"`;
    subtitle = "Products matching your query";
  } else if (params.featured) {
    title = "Featured Products";
    subtitle = "Handpicked dolls just for you";
  } else if (params.on_sale) {
    title = "On Sale";
    subtitle = "Great deals and special offers";
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumbs */}
      <div className="border-b border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Products</BreadcrumbPage>
              </BreadcrumbItem>
              {params.search && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Search: "{params.search}"</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
              {params.featured && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Featured</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
              {params.on_sale && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>On Sale</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-foreground tracking-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
            {subtitle}
          </p>
        </div>

        <Suspense fallback={<ProductsSkeletonGrid />}>
          <ProductsList searchParams={params} />
        </Suspense>
      </div>
    </div>
  );
}