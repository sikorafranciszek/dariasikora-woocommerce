'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, Search, User, Heart, LogIn, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCartStore } from '@/store/cart-store';
import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const itemCount = useCartStore((state) => state.getItemCount());
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error('Error signing out');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 shadow-sm">
      <div className="container mx-auto flex h-16 md:h-20 items-center px-4 lg:px-8">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] sm:w-[320px]">
            <nav className="flex flex-col gap-6 mt-8">
              <Link href="/" className="font-bold text-xl text-foreground tracking-tight mb-4">
                My Primitive Dolls
              </Link>
              <Link
                href="/products"
                className="text-base font-medium text-foreground hover:text-primary transition-colors flex items-center py-2 border-b border-border/30"
              >
                Products
              </Link>
              <Link
                href="/about"
                className="text-base font-medium text-foreground hover:text-primary transition-colors flex items-center py-2 border-b border-border/30"
              >
                About Me
              </Link>
              <Link
                href="/contact"
                className="text-base font-medium text-foreground hover:text-primary transition-colors flex items-center py-2 border-b border-border/30"
              >
                Contact
              </Link>

              {/* Mobile User Menu */}
              <div className="mt-6 pt-6 border-t border-border/50">
                {session ? (
                  <div className="space-y-4">
                    <div className="px-3 py-2 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium text-foreground">{session.user.name || 'User'}</p>
                      <p className="text-xs text-muted-foreground truncate mt-1">{session.user.email}</p>
                    </div>
                    <Link
                      href="/account"
                      className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                    >
                      <User className="h-5 w-5" />
                      My Account
                    </Link>
                    <Link
                      href="/account/orders"
                      className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      Orders
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 text-base font-medium text-destructive hover:text-destructive/80 transition-colors py-2 w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors py-2"
                  >
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="ml-3 md:ml-4 font-bold text-lg md:text-xl lg:ml-0 lg:text-2xl tracking-tight text-foreground hover:text-primary transition-colors">
          <span className="hidden sm:inline">My Primitive Dolls</span>
          <span className="sm:hidden">MPD</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-10 hidden gap-8 lg:flex items-center">
          <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary relative group">
            Products
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary relative group">
            About Me
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Search */}
        <form onSubmit={handleSearch} className="ml-auto hidden flex-1 max-w-md lg:flex">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 bg-muted/50 border-border/50 focus-visible:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* User Actions */}
        <div className="ml-auto flex items-center gap-1 md:gap-2">
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden lg:flex hover:bg-primary/10">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{session.user.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/account/orders" className="cursor-pointer">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" asChild className="hidden lg:flex hover:bg-primary/10">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" asChild className="relative hover:bg-primary/10">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {mounted && itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-[10px] flex items-center justify-center shadow-md"
                >
                  {itemCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-border/40 px-4 py-3 lg:hidden bg-muted/20">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 h-10 bg-background/50 border-border/50 focus-visible:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </header>
  );
}
