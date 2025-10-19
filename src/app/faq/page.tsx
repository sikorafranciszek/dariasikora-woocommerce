'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQPage() {
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
                <BreadcrumbPage>FAQ</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground mb-8 sm:mb-12">
              Find answers to common questions about our handmade primitive dolls, ordering process, shipping, and more.
            </p>

            {/* About the Dolls */}
            <Card className="mb-6">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">About the Dolls</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What are primitive dolls?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Primitive dolls are handcrafted, folk-art style dolls with a deliberately aged, rustic appearance. Each doll is
                        uniquely designed and crafted to have a nostalgic, vintage charm. They are not mass-produced toys but rather
                        artisan collectibles and decorative pieces that celebrate traditional craftsmanship and folk art traditions.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Are the dolls handmade?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Yes, absolutely! Every doll is 100% handmade by Daria Sikora from start to finish. I design the patterns, select
                        the fabrics, sew, stuff, paint, and age each doll by hand. No two dolls are exactly alike, making each one a
                        unique work of art. This handcrafted approach means each doll has its own character and charm.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>What materials are used to make the dolls?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>The dolls are made from high-quality, carefully selected materials:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Fabrics:</strong> Natural cotton, linen, and muslin fabrics</li>
                          <li><strong>Stuffing:</strong> Premium polyester fiberfill for shape and durability</li>
                          <li><strong>Paint:</strong> Non-toxic acrylic paints for faces and details</li>
                          <li><strong>Embellishments:</strong> Embroidery thread, buttons, lace, and vintage-style trims</li>
                          <li><strong>Aging techniques:</strong> Tea/coffee staining, distressing, and antiquing methods for the primitive look</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>Are the dolls suitable for children?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Our primitive dolls are designed as <strong>decorative collectibles and art pieces</strong>, not as toys.
                        They are not safety-tested for children and may contain small parts, buttons, or embellishments that could pose
                        a choking hazard. We recommend displaying them in your home as decorative items rather than giving them to
                        young children as toys.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>Why does each doll look slightly different?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Because each doll is handmade and hand-painted, slight variations in appearance are natural and expected.
                        Fabric patterns may vary, hand-painting creates unique facial expressions, and the aging process produces
                        different effects each time. These variations are part of the charm and authenticity of handcrafted folk art.
                        Your doll will be similar to the photos but uniquely yours!
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Ordering Process */}
            <Card className="mb-6">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Ordering Process</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-6">
                    <AccordionTrigger>How do I place an order?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-3">
                        <p>Ordering is simple:</p>
                        <ol className="list-decimal list-inside space-y-1 ml-4">
                          <li>Browse our <Link href="/products" className="text-primary hover:underline">Products page</Link></li>
                          <li>Click on a doll you like to view details</li>
                          <li>Click "Add to Cart"</li>
                          <li>When ready, go to your cart and click "Checkout"</li>
                          <li>Enter your shipping information</li>
                          <li>Complete payment through our secure Stripe checkout</li>
                          <li>You'll receive an order confirmation email immediately</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>Do I need an account to place an order?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Yes, you need to create an account to place an order. Creating an account allows you to track your orders,
                        view order history, save your shipping information, and manage your account settings. Don't worry - it only
                        takes a minute to <Link href="/register" className="text-primary hover:underline">sign up</Link>!
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger>Can I modify or cancel my order?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Yes, but only <strong>before your order ships</strong>. If you need to modify or cancel your order, please
                        contact us immediately at{' '}
                        <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a>.
                        Include your order number in your email. Once your order has shipped, it cannot be modified or cancelled,
                        but you may return it according to our{' '}
                        <Link href="/returns" className="text-primary hover:underline">Returns Policy</Link>.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-9">
                    <AccordionTrigger>Will I receive order confirmation?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Yes! You will receive two emails: (1) An <strong>order confirmation email</strong> immediately after placing
                        your order, and (2) A <strong>shipping confirmation email</strong> with tracking information when your order
                        ships. If you don't receive these emails, please check your spam folder or contact us.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card className="mb-6">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Payment Methods</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-10">
                    <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>We accept all major payment methods through our secure payment processor, <strong>Stripe</strong>:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Visa, Mastercard, American Express, Discover</li>
                          <li>Debit cards</li>
                          <li>Apple Pay and Google Pay</li>
                          <li>Other payment methods available in your region through Stripe</li>
                        </ul>
                        <p className="mt-2">
                          All payments are processed securely and we never store your full credit card information on our servers.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-11">
                    <AccordionTrigger>Is it safe to enter my credit card information?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Absolutely! We use <strong>Stripe</strong>, one of the world's most trusted and secure payment processors.
                        Stripe is PCI DSS Level 1 certified (the highest level of security in the payments industry). Your payment
                        information is encrypted and processed directly by Stripe - we never see or store your full credit card details.
                        Your transaction is protected by industry-standard SSL encryption.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-12">
                    <AccordionTrigger>When will I be charged?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Your credit card will be charged <strong>immediately</strong> when you complete your order. You will see the
                        charge on your statement from "Stripe" or "dariasikora.pl" within 1-3 business days, depending on your bank.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Shipping Questions */}
            <Card className="mb-6">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-13">
                    <AccordionTrigger>Where do you ship?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>We ship worldwide! Our primary shipping destinations include:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>European Union (all 27 member states)</li>
                          <li>United States (all 50 states)</li>
                          <li>United Kingdom</li>
                          <li>Canada</li>
                          <li>Most other countries worldwide</li>
                        </ul>
                        <p className="mt-2">
                          For more details, see our <Link href="/shipping" className="text-primary hover:underline">Shipping Policy</Link>.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-14">
                    <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>
                          <strong>Processing time:</strong> 1-3 business days (time to prepare your order for shipment)
                        </p>
                        <p><strong>Delivery time estimates (after processing):</strong></p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Poland: 2-4 business days</li>
                          <li>European Union: 4-8 business days</li>
                          <li>United Kingdom: 5-10 business days</li>
                          <li>United States: 7-14 business days</li>
                          <li>Canada: 7-14 business days</li>
                          <li>Other countries: 10-21 business days</li>
                        </ul>
                        <p className="mt-2 text-sm italic">
                          These are estimates only. Actual delivery times may vary based on customs clearance and carrier delays.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-15">
                    <AccordionTrigger>How much does shipping cost?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Shipping costs vary based on your destination, package weight, and shipping method. The exact cost will be
                        calculated and displayed at checkout before you complete your purchase. We use FedEx and other trusted carriers
                        to ensure safe delivery at competitive rates.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-16">
                    <AccordionTrigger>Do I have to pay customs fees or import taxes?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>It depends on your location:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong>EU customers:</strong> No customs duties or VAT (free movement within EU)</li>
                          <li><strong>UK, USA, Canada, and other countries:</strong> You may be charged import duties, customs fees,
                          or taxes by your country's customs authority</li>
                        </ul>
                        <p className="mt-2">
                          These charges are <strong>your responsibility</strong> and are not included in our product prices or shipping
                          costs. We cannot predict these charges as they vary by country and product value.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-17">
                    <AccordionTrigger>Can I track my order?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Yes! Once your order ships, you will receive a shipping confirmation email with a tracking number. You can use
                        this number to track your package on the carrier's website (FedEx, DHL, etc.). You can also view your tracking
                        information by logging into your account on our website.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Returns and Refunds */}
            <Card className="mb-6">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Returns and Refunds</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-18">
                    <AccordionTrigger>What is your return policy?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>
                          We offer a <strong>14-day return policy</strong> for EU and UK customers (required by law), and we extend
                          the same policy to USA and Canadian customers as well.
                        </p>
                        <p>To be eligible for return:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Items must be in original condition (unused, unwashed, with tags)</li>
                          <li>You must contact us within 14 days of receiving your order</li>
                          <li>Custom or personalized items are generally not eligible for return (unless defective)</li>
                        </ul>
                        <p className="mt-2">
                          For full details, please see our{' '}
                          <Link href="/returns" className="text-primary hover:underline">Returns & Refunds Policy</Link>.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-19">
                    <AccordionTrigger>How do I return an item?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>To return an item:</p>
                        <ol className="list-decimal list-inside space-y-1 ml-4">
                          <li>Email us at{' '}
                            <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a>{' '}
                            within 14 days of receiving your order
                          </li>
                          <li>Include your order number and reason for return (optional)</li>
                          <li>We'll provide return instructions and the return address</li>
                          <li>Pack the item securely and ship it back to us</li>
                          <li>Once we receive and inspect it, we'll process your refund within 14 days</li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-20">
                    <AccordionTrigger>Who pays for return shipping?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        For standard returns (change of mind), <strong>you are responsible for return shipping costs</strong>.
                        However, if the product is defective, damaged, or not as described, <strong>we will cover the return
                        shipping costs</strong>. Please contact us before returning any defective items.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-21">
                    <AccordionTrigger>What if my item arrives damaged or defective?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>We're so sorry if that happens! Please contact us immediately at{' '}
                          <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a>.
                        </p>
                        <p>Include:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li>Your order number</li>
                          <li>Photos of the damage or defect</li>
                          <li>Description of the issue</li>
                        </ul>
                        <p className="mt-2">
                          We will arrange for a replacement or full refund, and we'll cover all return shipping costs. You have a
                          2-year legal guarantee for defective products under EU consumer law.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Custom Orders */}
            <Card className="mb-6">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Custom Orders</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-22">
                    <AccordionTrigger>Do you accept custom orders?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Currently, we only sell the dolls available in our shop. However, if you're interested in a custom design or
                        have a special request, please feel free to contact us at{' '}
                        <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a>.
                        We'll do our best to accommodate special requests when possible, though custom orders may require additional
                        time and may not be eligible for returns.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-23">
                    <AccordionTrigger>Can I request specific colors or fabrics?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Each doll is made with carefully selected fabrics and colors that complement the design. We typically don't
                        offer fabric or color customization for standard products. However, if you have a specific request, please
                        contact us and we'll see if we can help. Custom requests may incur additional costs and longer processing times.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Care Instructions */}
            <Card className="mb-6">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Care Instructions</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-24">
                    <AccordionTrigger>How do I care for my primitive doll?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>To keep your doll looking beautiful:</p>
                        <ul className="list-disc list-inside space-y-1 ml-4">
                          <li><strong>Display:</strong> Keep in a dry location away from direct sunlight to prevent fading</li>
                          <li><strong>Cleaning:</strong> Spot clean only with a damp cloth if needed. Do not wash or submerge in water</li>
                          <li><strong>Storage:</strong> Store in a cool, dry place when not on display. Keep away from moisture</li>
                          <li><strong>Handling:</strong> Handle gently as dolls are delicate handmade items</li>
                          <li><strong>Avoid:</strong> Do not machine wash, dry clean, or use harsh chemicals</li>
                        </ul>
                        <p className="mt-2 text-sm italic">
                          Remember, these are decorative art pieces, not toys. The aged, primitive look is intentional and part of
                          their charm!
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-25">
                    <AccordionTrigger>Will the colors fade over time?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Like all textile items, prolonged exposure to direct sunlight can cause colors to fade over time. To preserve
                        your doll's colors, display it in a location that doesn't receive constant direct sunlight. The intentionally
                        aged and distressed appearance is part of the primitive folk art aesthetic and should remain stable with proper
                        care.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-6">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-26">
                    <AccordionTrigger>How can I contact you?</AccordionTrigger>
                    <AccordionContent>
                      <div className="text-muted-foreground leading-relaxed space-y-2">
                        <p>We'd love to hear from you! You can reach us:</p>
                        <div className="bg-muted/30 p-4 rounded-lg mt-3">
                          <p className="font-semibold text-foreground">Daria Sikora</p>
                          <p>Stefana Starzyńskiego 2/83</p>
                          <p>35-508 Rzeszów, Poland</p>
                          <p className="mt-2">
                            Email:{' '}
                            <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">
                              dariasikora@yahoo.pl
                            </a>
                          </p>
                          <p>
                            Phone:{' '}
                            <a href="tel:+48501083574" className="text-primary hover:underline">
                              +48 501 083 574
                            </a>
                          </p>
                          <p>
                            Website:{' '}
                            <a href="https://dariasikora.pl" className="text-primary hover:underline">
                              dariasikora.pl
                            </a>
                          </p>
                        </div>
                        <p className="mt-3">
                          You can also use our <Link href="/contact" className="text-primary hover:underline">Contact Form</Link>.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-27">
                    <AccordionTrigger>What are your business hours?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        We typically respond to emails within <strong>24 hours</strong> during business days (Monday-Friday).
                        Our workshop operates Monday through Friday, 9:00 AM - 5:00 PM Central European Time (CET/CEST). Please note
                        that we may be closed on Polish public holidays. Orders placed on weekends or holidays will be processed on
                        the next business day.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-28">
                    <AccordionTrigger>Can I visit your workshop?</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        Our workshop is not open to the public as it's a home-based studio. However, if you're in the Rzeszów area
                        and would like to arrange a special visit or pick up an order in person, please contact us at{' '}
                        <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a> and
                        we'll see what we can arrange!
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            {/* Still Have Questions */}
            <div className="mt-8 p-6 bg-primary/10 border border-primary/20 rounded-lg text-center">
              <h3 className="text-xl font-semibold text-foreground mb-3">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                If you can't find the answer you're looking for, we're here to help!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
                >
                  Contact Us
                </Link>
                <a
                  href="mailto:dariasikora@yahoo.pl"
                  className="inline-flex items-center justify-center px-6 py-3 bg-background text-foreground border border-border rounded-md hover:bg-muted transition-colors font-medium"
                >
                  Email Us
                </a>
              </div>
            </div>

            {/* Related Pages */}
            <div className="mt-8 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Related Pages</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/shipping" className="text-primary hover:underline">
                  Shipping Policy
                </Link>
                <Link href="/returns" className="text-primary hover:underline">
                  Returns & Refunds
                </Link>
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/about" className="text-primary hover:underline">
                  About Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
