"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Package, Settings, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import type { ExtendedUser } from "@/types/better-auth";

/**
 * Render the authenticated user's account page with sidebar navigation, an orders overview, and profile details.
 *
 * The component redirects unauthenticated users to "/login" once session loading completes, displays a centered loader while the session is pending, and provides a sign-out action that shows success or error toasts and navigates to the home page on successful sign-out.
 *
 * @returns A JSX element representing the account page.
 */
export default function AccountPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      toast.error("Logout error");
    }
  };

  if (isPending) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user as ExtendedUser;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Account</h1>
        <p className="text-gray-600">Manage your account and orders</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="h-16 w-16 rounded-full"
                    />
                  ) : (
                    <User className="h-8 w-8" />
                  )}
                </div>
                <div>
                  <CardTitle>{user.name || "User"}</CardTitle>
                  <CardDescription className="break-all">
                    {user.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <nav className="space-y-2">
                <Link href="/account/orders">
                  <Button variant="ghost" className="w-full justify-start">
                    <Package className="mr-2 h-5 w-5" />
                    Orders
                  </Button>
                </Link>
                <Link href="/account/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-5 w-5" />
                    Settings
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-600"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Log out
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    Your recent orders from WooCommerce
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-600">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>View your orders in the Orders tab</p>
                    <Button asChild className="mt-4">
                      <Link href="/account/orders">Go to orders</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="profile" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">
                        {user.name || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium break-all">{user.email}</p>
                    </div>
                    {user.phone && (
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    )}
                    {user.company && (
                      <div>
                        <p className="text-sm text-gray-500">Company</p>
                        <p className="font-medium">{user.company}</p>
                      </div>
                    )}
                  </div>

                  {(user.address1 || user.city || user.postcode) && (
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-500 mb-2">Address</p>
                      <div className="space-y-1">
                        {user.address1 && <p>{user.address1}</p>}
                        {user.address2 && <p>{user.address2}</p>}
                        {(user.postcode || user.city) && (
                          <p>
                            {user.postcode} {user.city}
                          </p>
                        )}
                        {user.country && <p>{user.country}</p>}
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <Button asChild>
                      <Link href="/account/settings">Edit profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}