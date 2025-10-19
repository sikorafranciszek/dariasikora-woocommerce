import Link from "next/link";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/products/product-card";
import { getProducts, getCategories } from "@/lib/woocommerce";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { WebsiteSchema } from "@/components/seo/website-schema";

async function NewestProducts() {
  try {
    const products = await getProducts({ per_page: 5, orderby: 'date', order: 'desc' });

    if (!products || products.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-600">No products available</p>
        </div>
      );
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading newest products:", error);
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading products</p>
        <p className="text-sm text-gray-600 mt-2">
          Make sure you have correctly configured your WooCommerce connection in
          the .env.local file
        </p>
      </div>
    );
  }
}

async function Categories() {
  try {
    const categories = await getCategories({ per_page: 6, parent: 0 });

    if (!categories || categories.length === 0) {
      return null;
    }

    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className="group"
          >
            <Card className="h-full transition-all hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 bg-card/50 backdrop-blur">
              <CardContent className="p-6 lg:p-8">
                <h3 className="font-semibold text-lg lg:text-xl group-hover:text-primary transition-colors tracking-tight text-foreground">
                  {category.name}
                </h3>
                {category.description && (
                  <p className="mt-3 text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                )}
                <p className="mt-4 text-muted-foreground/70 text-sm font-medium">
                  {category.count}{" "}
                  {category.count === 1 ? "product" : "products"}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading categories:", error);
    return null;
  }
}

function ProductSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
      {[...Array(5)].map((_, i) => (
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

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <WebsiteSchema />
      <div className="flex flex-col">
        {/* Hero Section */}
      <section className="relative bg-primary/5 border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24 lg:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="mb-4 sm:mb-6 font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl tracking-tight text-foreground leading-tight">
              Welcome to My Primitive Dolls!
            </h1>
            <p className="mb-8 sm:mb-10 text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
              Discover unique handmade primitive dolls crafted with love
            </p>
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto">
              <Link href="/products">
                Browse Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border/40 py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center group">
              <div className="mb-3 sm:mb-5 rounded-xl bg-primary/10 p-4 sm:p-5 transition-all group-hover:bg-primary/20 group-hover:scale-110">
                <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="mb-1 sm:mb-2 font-semibold text-foreground text-sm sm:text-base">Handmade</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed hidden sm:block">
                Each doll is unique and handcrafted
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="mb-3 sm:mb-5 rounded-xl bg-chart-2/20 p-4 sm:p-5 transition-all group-hover:bg-chart-2/30 group-hover:scale-110">
                <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-chart-2" />
              </div>
              <h3 className="mb-1 sm:mb-2 font-semibold text-foreground text-sm sm:text-base">Fast Shipping</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed hidden sm:block">
                Worldwide delivery available
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="mb-3 sm:mb-5 rounded-xl bg-chart-3/20 p-4 sm:p-5 transition-all group-hover:bg-chart-3/30 group-hover:scale-110">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-chart-3" />
              </div>
              <h3 className="mb-1 sm:mb-2 font-semibold text-foreground text-sm sm:text-base">Secure Payments</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed hidden sm:block">
                All transactions are encrypted
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="mb-3 sm:mb-5 rounded-xl bg-chart-4/20 p-4 sm:p-5 transition-all group-hover:bg-chart-4/30 group-hover:scale-110">
                <Headphones className="h-6 w-6 sm:h-8 sm:w-8 text-chart-4" />
              </div>
              <h3 className="mb-1 sm:mb-2 font-semibold text-foreground text-sm sm:text-base">Customer Support</h3>
              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed hidden sm:block">
                We're here to help you
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground tracking-tight mb-1 sm:mb-2">Popular Categories</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Find what you're looking for</p>
          </div>
          <Suspense fallback={<div className="text-muted-foreground text-sm">Loading categories...</div>}>
            <Categories />
          </Suspense>
        </div>
      </section>

      {/* Newest Products */}
      <section className="bg-muted/30 py-12 sm:py-16 lg:py-24 border-y border-border/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-foreground tracking-tight mb-1 sm:mb-2">Newest Products</h2>
              <p className="text-muted-foreground text-sm sm:text-base">Discover our latest handmade dolls</p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link href="/products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Suspense fallback={<ProductSkeleton />}>
            <NewestProducts />
          </Suspense>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary text-primary-foreground shadow-2xl border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
            <CardContent className="relative p-6 sm:p-8 lg:p-16 text-center">
              <h2 className="mb-3 sm:mb-4 font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                Subscribe to Newsletter
              </h2>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl opacity-90 max-w-2xl mx-auto">
                Get updates on new dolls and special offers
              </p>
              <div className="mx-auto flex max-w-md gap-2 sm:gap-3 flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-lg px-4 sm:px-5 py-2.5 sm:py-3 text-foreground bg-background border-0 shadow-sm focus:ring-2 focus:ring-primary-foreground/20 outline-none transition text-sm sm:text-base"
                />
                <Button size="lg" variant="secondary" className="shadow-md hover:shadow-lg w-full sm:w-auto">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
    </>
  );
}
