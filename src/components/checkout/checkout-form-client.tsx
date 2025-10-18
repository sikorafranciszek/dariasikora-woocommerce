'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CreditCard, Banknote, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCartStore } from '@/store/cart-store';
import { createOrder } from '@/app/checkout/actions';
import { createStripeCheckoutSession } from '@/app/checkout/stripe-actions';
import { useSession } from '@/lib/auth-client';
import { toast } from 'sonner';
import type { PaymentGateway } from '@/lib/woocommerce';

const checkoutSchema = z.object({
  // Billing
  billing_first_name: z.string().min(2, 'First name must be at least 2 characters'),
  billing_last_name: z.string().min(2, 'Last name must be at least 2 characters'),
  billing_email: z.string().email('Invalid email address'),
  billing_phone: z.string().min(9, 'Invalid phone number'),
  billing_address_1: z.string().min(5, 'Address is required'),
  billing_address_2: z.string().optional(),
  billing_city: z.string().min(2, 'City is required'),
  billing_postcode: z.string().min(5, 'Postal code is required'),
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

export function CheckoutFormClient({ paymentGateways }: CheckoutFormClientProps) {
  const router = useRouter();
  const { items, clearCart, getTotal } = useCartStore();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shippingDifferent, setShippingDifferent] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    paymentGateways[0]?.id || 'bacs'
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      billing_country: 'US',
      payment_method: paymentGateways[0]?.id || 'bacs',
      payment_method_title: paymentGateways[0]?.title || 'Bank transfer',
    },
  });

  // Pre-fill form with user data if logged in
  useEffect(() => {
    if (session?.user) {
      const user = session.user;
      const nameParts = user.name?.split(' ') || [];
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      if (firstName) setValue('billing_first_name', firstName);
      if (lastName) setValue('billing_last_name', lastName);
      if (user.email) setValue('billing_email', user.email);
      if (user.phone) setValue('billing_phone', user.phone);
      if (user.company) setValue('billing_company', user.company);
      if (user.address1) setValue('billing_address_1', user.address1);
      if (user.address2) setValue('billing_address_2', user.address2);
      if (user.city) setValue('billing_city', user.city);
      if (user.postcode) setValue('billing_postcode', user.postcode);
      if (user.state) setValue('billing_state', user.state);
      if (user.country) setValue('billing_country', user.country);
    }
  }, [session, setValue]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const total = getTotal();
  const shippingCost = total >= 200 ? 0 : 15;
  const finalTotal = total + shippingCost;

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      setIsSubmitting(true);

      // If Stripe is selected, use Stripe Checkout Session directly
      if (data.payment_method === 'stripe') {
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
              first_name: data.shipping_first_name || '',
              last_name: data.shipping_last_name || '',
              email: data.billing_email, // Use billing email for shipping
              phone: data.billing_phone, // Use billing phone for shipping
              address_1: data.shipping_address_1 || '',
              address_2: data.shipping_address_2,
              city: data.shipping_city || '',
              postcode: data.shipping_postcode || '',
              country: data.shipping_country || 'US',
              company: data.shipping_company,
              state: data.shipping_state,
            }
          : undefined;

        const result = await createStripeCheckoutSession({
          items,
          customerEmail: data.billing_email,
          billingDetails,
          shippingDetails,
        });

        if (result.success && result.url) {
          clearCart();
          toast.success('Redirecting to Stripe payment...');
          // Redirect to Stripe Checkout (checkout.stripe.com)
          window.location.href = result.url;
        } else {
          toast.error(result.error || 'Error creating payment session. Please try again.');
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
          company: data.billing_company || '',
          address_1: data.billing_address_1,
          address_2: data.billing_address_2 || '',
          city: data.billing_city,
          state: data.billing_state || '',
          postcode: data.billing_postcode,
          country: data.billing_country,
          email: data.billing_email,
          phone: data.billing_phone,
        },
        shipping: shippingDifferent
          ? {
              first_name: data.shipping_first_name || '',
              last_name: data.shipping_last_name || '',
              company: data.shipping_company || '',
              address_1: data.shipping_address_1 || '',
              address_2: data.shipping_address_2 || '',
              city: data.shipping_city || '',
              state: data.shipping_state || '',
              postcode: data.shipping_postcode || '',
              country: data.shipping_country || 'US',
            }
          : {
              first_name: data.billing_first_name,
              last_name: data.billing_last_name,
              company: data.billing_company || '',
              address_1: data.billing_address_1,
              address_2: data.billing_address_2 || '',
              city: data.billing_city,
              state: data.billing_state || '',
              postcode: data.billing_postcode,
              country: data.billing_country,
            },
        line_items: lineItems,
      };

      const result = await createOrder(orderData);

      if (result.success && result.order) {
        clearCart();
        toast.success('Order placed successfully!');
        router.push(`/order-confirmation/${result.order.id}`);
      } else {
        toast.error(result.error || 'Error placing order. Please try again.');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentMethodChange = (value: string) => {
    setSelectedPaymentMethod(value);
    const gateway = paymentGateways.find((g) => g.id === value);
    if (gateway) {
      setValue('payment_method', gateway.id);
      setValue('payment_method_title', gateway.title);
    }
  };

  const getPaymentIcon = (methodId: string) => {
    switch (methodId) {
      case 'stripe':
        return <CreditCard className="h-5 w-5" />;
      case 'bacs':
        return <Banknote className="h-5 w-5" />;
      case 'cod':
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
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="billing_first_name">First Name *</Label>
                  <Input
                    id="billing_first_name"
                    {...register('billing_first_name')}
                    className={errors.billing_first_name ? 'border-red-500' : ''}
                  />
                  {errors.billing_first_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.billing_first_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="billing_last_name">Last Name *</Label>
                  <Input
                    id="billing_last_name"
                    {...register('billing_last_name')}
                    className={errors.billing_last_name ? 'border-red-500' : ''}
                  />
                  {errors.billing_last_name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.billing_last_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="billing_company">Company Name (optional)</Label>
                <Input id="billing_company" {...register('billing_company')} />
              </div>

              <div>
                <Label htmlFor="billing_email">Email *</Label>
                <Input
                  id="billing_email"
                  type="email"
                  {...register('billing_email')}
                  className={errors.billing_email ? 'border-red-500' : ''}
                />
                {errors.billing_email && (
                  <p className="text-red-500 text-sm mt-1">{errors.billing_email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="billing_phone">Phone *</Label>
                <Input
                  id="billing_phone"
                  type="tel"
                  {...register('billing_phone')}
                  className={errors.billing_phone ? 'border-red-500' : ''}
                />
                {errors.billing_phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.billing_phone.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="billing_address_1">Address *</Label>
                <Input
                  id="billing_address_1"
                  {...register('billing_address_1')}
                  className={errors.billing_address_1 ? 'border-red-500' : ''}
                />
                {errors.billing_address_1 && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.billing_address_1.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="billing_address_2">Address (line 2)</Label>
                <Input id="billing_address_2" {...register('billing_address_2')} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="billing_city">City *</Label>
                  <Input
                    id="billing_city"
                    {...register('billing_city')}
                    className={errors.billing_city ? 'border-red-500' : ''}
                  />
                  {errors.billing_city && (
                    <p className="text-red-500 text-sm mt-1">{errors.billing_city.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="billing_postcode">Postal Code *</Label>
                  <Input
                    id="billing_postcode"
                    {...register('billing_postcode')}
                    className={errors.billing_postcode ? 'border-red-500' : ''}
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
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedPaymentMethod} onValueChange={handlePaymentMethodChange}>
                <div className="space-y-3">
                  {paymentGateways.map((gateway) => (
                    <div key={gateway.id} className="flex items-start space-x-3 space-y-0">
                      <RadioGroupItem value={gateway.id} id={gateway.id} />
                      <Label
                        htmlFor={gateway.id}
                        className="flex flex-1 flex-col cursor-pointer"
                      >
                        <div className="flex items-center gap-2 font-semibold">
                          {getPaymentIcon(gateway.id)}
                          {gateway.title}
                        </div>
                        {gateway.description && (
                          <p
                            className="text-gray-600 text-sm mt-1"
                            dangerouslySetInnerHTML={{ __html: gateway.description }}
                          />
                        )}
                      </Label>
                    </div>
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
              <CardTitle>Your Order</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map((item) => {
                  const price = item.selectedVariation?.price || item.product.price;
                  return (
                    <div
                      key={`${item.product.id}-${item.selectedVariation?.id || ''}`}
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
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">{formatPrice(total)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold">
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg">
                <span className="font-bold">Total:</span>
                <span className="font-bold">{formatPrice(finalTotal)}</span>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : selectedPaymentMethod === 'stripe' ? (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to payment
                  </>
                ) : (
                  'Place order'
                )}
              </Button>

              <p className="text-center text-gray-600 text-xs">
                By placing your order, you agree to our terms and privacy policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
