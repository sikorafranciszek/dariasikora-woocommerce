"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CreditCard, Banknote, Wallet, Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/store/cart-store";
import { createOrder } from "@/app/checkout/actions";
import { createStripeCheckoutSession } from "@/app/checkout/stripe-actions";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import { validateCoupon, type PaymentGateway, type WooCommerceCoupon } from "@/lib/woocommerce";
import type { ExtendedUser } from "@/types/better-auth";

const checkoutSchema = z.object({
  // Billing
  billing_first_name: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki"),
  billing_last_name: z
    .string()
    .min(2, "Nazwisko musi mieć co najmniej 2 znaki"),
  billing_email: z.string().email("Nieprawidłowy adres email"),
  billing_phone: z.string().min(9, "Nieprawidłowy numer telefonu"),
  billing_address_1: z.string().min(5, "Adres jest wymagany"),
  billing_address_2: z.string().optional(),
  billing_city: z.string().min(2, "Miasto jest wymagane"),
  billing_postcode: z.string().min(5, "Kod pocztowy jest wymagany"),
  billing_state: z.string().optional(),
  billing_country: z.string(),
  billing_company: z.string().optional(),

  // Shipping
  shipping_first_name: z.string().optional(),
  shipping_last_name: z.string().optional(),
  shipping_address_1: z.string().optional(),
  shipping_address_2: z.string().optional(),
  shipping_city: z.string().optional(),
  shipping_postcode: z.string().optional(),
  shipping_state: z.string().optional(),
  shipping_country: z.string().optional(),
  shipping_company: z.string().optional(),

  // Payment
  payment_method: z.string(),
  payment_method_title: z.string(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface CheckoutFormClientProps {
  paymentGateways: PaymentGateway[];
}

export function CheckoutFormClient({
  paymentGateways,
}: CheckoutFormClientProps) {
  const router = useRouter();
  const { items, clearCart, getTotal } = useCartStore();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingDifferent, setShippingDifferent] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentGateways[0]?.id || "bacs"
  );
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<WooCommerceCoupon | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      billing_country: "US",
      payment_method: paymentGateways[0]?.id || "bacs",
      payment_method_title: paymentGateways[0]?.title || "Bank transfer",
    },
  });

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (session?.user) {
      const user = session.user as ExtendedUser;
      const nameParts = user.name?.split(" ") || [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      if (firstName) setValue("billing_first_name", firstName);
      if (lastName) setValue("billing_last_name", lastName);
      if (user.email) setValue("billing_email", user.email);
      if (user.phone) setValue("billing_phone", user.phone);
      if (user.company) setValue("billing_company", user.company);
      if (user.address1) setValue("billing_address_1", user.address1);
      if (user.address2) setValue("billing_address_2", user.address2);
      if (user.city) setValue("billing_city", user.city);
      if (user.postcode) setValue("billing_postcode", user.postcode);
      if (user.state) setValue("billing_state", user.state);
      if (user.country) setValue("billing_country", user.country);
    }
  }, [session, setValue]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error("Wprowadź kod kuponu");
      return;
    }

    setIsValidatingCoupon(true);
    try {
      const productIds = items.map(item => item.product.id);
      const result = await validateCoupon(couponCode.trim(), getTotal(), productIds);

      if (result.valid && result.coupon) {
        setAppliedCoupon(result.coupon);
        toast.success("Kupon został zastosowany!");
      } else {
        toast.error(result.error || "Nieprawidłowy kupon");
      }
    } catch (error) {
      toast.error("Błąd przy sprawdzaniu kuponu");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    toast.success("Kupon został usunięty");
  };

  const calculateDiscount = (subtotal: number): number => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.discount_type === "percent") {
      return (subtotal * parseFloat(appliedCoupon.amount)) / 100;
    } else if (appliedCoupon.discount_type === "fixed_cart") {
      return parseFloat(appliedCoupon.amount);
    }

    return 0;
  };

  const total = getTotal();
  const discount = calculateDiscount(total);
  const subtotalAfterDiscount = total - discount;
  const shippingCost = appliedCoupon?.free_shipping ? 0 : (subtotalAfterDiscount >= 200 ? 0 : 15);
  const finalTotal = subtotalAfterDiscount + shippingCost;

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setIsSubmitting(true);

      // If any Stripe payment method is selected, use Stripe Checkout Session
      const isStripeMethod = data.payment_method.startsWith("stripe");

      if (isStripeMethod) {
        const billingDetails = {
          first_name: data.billing_first_name,
          last_name: data.billing_last_name,
          email: data.billing_email,
          phone: data.billing_phone,
          address_1: data.billing_address_1,
          address_2: data.billing_address_2,
          city: data.billing_city,
          postcode: data.billing_postcode,
          country: data.billing_country,
          company: data.billing_company,
          state: data.billing_state,
        };

        const shippingDetails = shippingDifferent
          ? {
              first_name: data.shipping_first_name || "",
              last_name: data.shipping_last_name || "",
              email: data.billing_email, // Use billing email for shipping
              phone: data.billing_phone, // Use billing phone for shipping
              address_1: data.shipping_address_1 || "",
              address_2: data.shipping_address_2,
              city: data.shipping_city || "",
              postcode: data.shipping_postcode || "",
              country: data.shipping_country || "US",
              company: data.shipping_company,
              state: data.shipping_state,
            }
          : undefined;

        const result = await createStripeCheckoutSession({
          items,
          customerEmail: data.billing_email,
          billingDetails,
          shippingDetails,
          paymentMethodType: data.payment_method,
          couponCode: appliedCoupon?.code,
          discountAmount: discount > 0 ? discount : undefined,
        });

        if (result.success && result.url) {
          clearCart();
          toast.success("Przekierowanie do płatności...");
          // Redirect to Stripe Checkout (checkout.stripe.com)
          if (typeof window !== 'undefined') {
            window.location.href = result.url;
          }
        } else {
          toast.error(
            result.error || "Błąd tworzenia sesji płatności. Spróbuj ponownie."
          );
        }
        return;
      }

      // For other payment methods (BACS, COD, etc.), use WooCommerce order creation
      const lineItems = items.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        variation_id: item.selectedVariation?.id,
      }));

      const orderData = {
        payment_method: data.payment_method,
        payment_method_title: data.payment_method_title,
        set_paid: false,
        billing: {
          first_name: data.billing_first_name,
          last_name: data.billing_last_name,
          company: data.billing_company || "",
          address_1: data.billing_address_1,
          address_2: data.billing_address_2 || "",
          city: data.billing_city,
          state: data.billing_state || "",
          postcode: data.billing_postcode,
          country: data.billing_country,
          email: data.billing_email,
          phone: data.billing_phone,
        },
        shipping: shippingDifferent
          ? {
              first_name: data.shipping_first_name || "",
              last_name: data.shipping_last_name || "",
              company: data.shipping_company || "",
              address_1: data.shipping_address_1 || "",
              address_2: data.shipping_address_2 || "",
              city: data.shipping_city || "",
              state: data.shipping_state || "",
              postcode: data.shipping_postcode || "",
              country: data.shipping_country || "US",
            }
          : {
              first_name: data.billing_first_name,
              last_name: data.billing_last_name,
              company: data.billing_company || "",
              address_1: data.billing_address_1,
              address_2: data.billing_address_2 || "",
              city: data.billing_city,
              state: data.billing_state || "",
              postcode: data.billing_postcode,
              country: data.billing_country,
            },
        line_items: lineItems,
        coupon_lines: appliedCoupon ? [{ code: appliedCoupon.code }] : undefined,
      };

      const result = await createOrder(orderData);

      if (result.success && result.order) {
        clearCart();
        toast.success("Zamówienie złożone pomyślnie!");
        router.push(`/order-confirmation/${result.order.id}`);
      } else {
        toast.error(result.error || "Błąd składania zamówienia. Spróbuj ponownie.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Błąd składania zamówienia. Spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
    const gateway = paymentGateways.find((g) => g.id === value);
    if (gateway) {
      setValue("payment_method", gateway.id);
      setValue("payment_method_title", gateway.title);
    }
  };

  const getPaymentIcon = (methodId: string) => {
    switch (methodId) {
      case "stripe":
        return <CreditCard className="h-5 w-5" />;
      case "bacs":
        return <Banknote className="h-5 w-5" />;
      case "cod":
        return <Wallet className="h-5 w-5" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Dane do faktury</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="billing_first_name">Imię *</Label>
                  <Input
                    id="billing_first_name"
                    {...register("billing_first_name")}
                    className={
                      errors.billing_first_name ? "border-red-500" : ""
                    }
                  />
                  {errors.billing_first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.billing_first_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="billing_last_name">Nazwisko *</Label>
                  <Input
                    id="billing_last_name"
                    {...register("billing_last_name")}
                    className={errors.billing_last_name ? "border-red-500" : ""}
                  />
                  {errors.billing_last_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.billing_last_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="billing_company">Nazwa firmy (opcjonalne)</Label>
                <Input id="billing_company" {...register("billing_company")} />
              </div>

              <div>
                <Label htmlFor="billing_email">Email *</Label>
                <Input
                  id="billing_email"
                  type="email"
                  {...register("billing_email")}
                  className={errors.billing_email ? "border-red-500" : ""}
                />
                {errors.billing_email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.billing_email.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="billing_phone">Telefon *</Label>
                <Input
                  id="billing_phone"
                  type="tel"
                  {...register("billing_phone")}
                  className={errors.billing_phone ? "border-red-500" : ""}
                />
                {errors.billing_phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.billing_phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="billing_address_1">Adres *</Label>
                <Input
                  id="billing_address_1"
                  {...register("billing_address_1")}
                  className={errors.billing_address_1 ? "border-red-500" : ""}
                />
                {errors.billing_address_1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.billing_address_1.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="billing_address_2">Adres (linia 2)</Label>
                <Input
                  id="billing_address_2"
                  {...register("billing_address_2")}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="billing_city">Miasto *</Label>
                  <Input
                    id="billing_city"
                    {...register("billing_city")}
                    className={errors.billing_city ? "border-red-500" : ""}
                  />
                  {errors.billing_city && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.billing_city.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="billing_postcode">Kod pocztowy *</Label>
                  <Input
                    id="billing_postcode"
                    {...register("billing_postcode")}
                    className={errors.billing_postcode ? "border-red-500" : ""}
                  />
                  {errors.billing_postcode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.billing_postcode.message}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Metoda płatności</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={handlePaymentMethodChange}
              >
                <div className="space-y-3">
                  {paymentGateways.map((gateway) => (
                    <label
                      key={gateway.id}
                      htmlFor={gateway.id}
                      className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5 ${
                        selectedPaymentMethod === gateway.id
                          ? "border-primary bg-primary/5"
                          : "border-border"
                      }`}
                    >
                      <RadioGroupItem
                        value={gateway.id}
                        id={gateway.id}
                        className="mt-0.5"
                      />
                      <div className="flex flex-1 flex-col ml-3">
                        <div className="flex items-center gap-2 font-semibold text-foreground">
                          {getPaymentIcon(gateway.id)}
                          {gateway.title}
                        </div>
                        {gateway.description && (
                          <p
                            className="text-muted-foreground text-sm mt-2 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: gateway.description,
                            }}
                          />
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Twoje zamówienie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => {
                  const price =
                    item.selectedVariation?.price || item.product.price;
                  return (
                    <div
                      key={`${item.product.id}-${
                        item.selectedVariation?.id || ""
                      }`}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {formatPrice(parseFloat(price) * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <Separator />

              <div className="flex justify-between">
                <span className="text-muted-foreground">Suma częściowa:</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>

              {/* Coupon Section */}
              {!appliedCoupon ? (
                <div className="space-y-2">
                  <Label htmlFor="coupon">Kod kuponu</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coupon"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="Wpisz kod"
                      disabled={isValidatingCoupon}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleApplyCoupon();
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleApplyCoupon}
                      disabled={isValidatingCoupon}
                    >
                      {isValidatingCoupon ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Tag className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        {appliedCoupon.code}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handleRemoveCoupon}
                      className="h-6 w-6 p-0 hover:bg-green-100"
                    >
                      <X className="h-4 w-4 text-green-600" />
                    </Button>
                  </div>
                  {appliedCoupon.description && (
                    <p className="text-xs text-green-700 mt-1">
                      {appliedCoupon.description}
                    </p>
                  )}
                </div>
              )}

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="text-muted-foreground">Rabat:</span>
                  <span className="font-semibold">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted-foreground">Dostawa:</span>
                <span className="font-semibold">
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Darmowa</span>
                  ) : (
                    formatPrice(shippingCost)
                  )}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg">
                <span className="font-bold">Razem:</span>
                <span className="font-bold">{formatPrice(finalTotal)}</span>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Przetwarzanie...
                  </>
                ) : selectedPaymentMethod.startsWith("stripe") ? (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Przejdź do płatności
                  </>
                ) : (
                  "Złóż zamówienie"
                )}
              </Button>

              <p className="text-center text-muted-foreground text-xs">
                Składając zamówienie, akceptujesz nasz regulamin i politykę prywatności.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
