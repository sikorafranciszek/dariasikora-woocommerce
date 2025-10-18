import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-10 md:gap-12 grid-cols-2 md:grid-cols-4">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="mb-4 sm:mb-5 font-bold text-base sm:text-lg text-foreground tracking-tight">My Primitive Dolls</h3>
            <p className="mb-4 sm:mb-6 text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Unique handmade primitive dolls crafted with passion and traditional techniques.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110 p-1.5 sm:p-2 rounded-lg hover:bg-primary/10"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110 p-1.5 sm:p-2 rounded-lg hover:bg-primary/10"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110 p-1.5 sm:p-2 rounded-lg hover:bg-primary/10"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary transition-all hover:scale-110 p-1.5 sm:p-2 rounded-lg hover:bg-primary/10"
              >
                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 sm:mb-5 font-semibold text-foreground text-sm sm:text-base">Shop</h3>
            <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
              <li>
                <Link href="/products" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/products?featured=true" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  Featured
                </Link>
              </li>
              <li>
                <Link href="/products?on_sale=true" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  On Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="mb-4 sm:mb-5 font-semibold text-foreground text-sm sm:text-base">Customer Service</h3>
            <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
              <li>
                <Link href="/account" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 sm:mb-5 font-semibold text-foreground text-sm sm:text-base">Legal</h3>
            <ul className="space-y-2 sm:space-y-3 text-muted-foreground text-xs sm:text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary transition-colors hover:pl-1 inline-block">
                  Shipping
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 sm:my-10 bg-border/50" />

        <div className="flex flex-col items-center justify-between gap-3 sm:gap-4 md:flex-row">
          <p className="text-center text-muted-foreground text-xs sm:text-sm">
            © {new Date().getFullYear()} My Primitive Dolls. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-muted-foreground text-xs sm:text-sm">
            <Link href="/cookies" className="hover:text-primary transition-colors">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="hover:text-primary transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
