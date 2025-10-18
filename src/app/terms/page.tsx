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

export const metadata = {
  title: 'Terms of Service - My Primitive Dolls',
  description: 'Terms and conditions for using dariasikora.pl and purchasing handmade primitive dolls.',
};

export default function TermsOfServicePage() {
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
                <BreadcrumbPage>Terms of Service</BreadcrumbPage>
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
              Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground mb-8 sm:mb-12">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <Card className="mb-8">
              <CardContent className="p-6 sm:p-8 prose prose-gray max-w-none">
                <div className="space-y-8">
                  {/* Introduction */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction and Acceptance</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Welcome to <strong>dariasikora.pl</strong> (the "Website"). These Terms of Service ("Terms") constitute a legally binding
                      agreement between you and <strong>Daria Sikora</strong> ("we", "us", or "our") governing your use of our Website and the
                      purchase of our handmade primitive dolls and related products.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      By accessing or using our Website, creating an account, or making a purchase, you agree to be bound by these Terms and our
                      <Link href="/privacy-policy" className="text-primary hover:underline"> Privacy Policy</Link>. If you do not agree to these
                      Terms, please do not use our Website.
                    </p>
                    <div className="bg-muted/30 p-6 rounded-lg space-y-2">
                      <p className="text-foreground"><strong>Business Information:</strong></p>
                      <p className="text-muted-foreground">Daria Sikora</p>
                      <p className="text-muted-foreground">Stefana Starzyńskiego 2/83</p>
                      <p className="text-muted-foreground">35-508 Rzeszów, Podkarpackie, Poland</p>
                      <p className="text-muted-foreground">NIP (Tax ID): 8131627011</p>
                      <p className="text-muted-foreground">Email: <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a></p>
                      <p className="text-muted-foreground">Phone: <a href="tel:+48501083574" className="text-primary hover:underline">+48 501 083 574</a></p>
                    </div>
                  </section>

                  {/* Eligibility */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Eligibility</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You must be at least 18 years old to create an account and make purchases on our Website. If you are under 18, you may only
                      use our Website with the involvement and consent of a parent or legal guardian.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      By using our Website, you represent and warrant that you have the legal capacity to enter into this agreement and comply with
                      these Terms.
                    </p>
                  </section>

                  {/* Account Registration */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. Account Registration and Security</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">3.1 Account Creation</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          To make purchases and access certain features, you must create an account. You agree to provide accurate, current, and
                          complete information during registration and to keep this information updated.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">3.2 Account Security</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          You are responsible for:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Maintaining the confidentiality of your account credentials</li>
                          <li>All activities that occur under your account</li>
                          <li>Notifying us immediately of any unauthorized access or security breach</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">3.3 Account Termination</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          You may delete your account at any time through your account settings. We reserve the right to suspend or terminate
                          accounts that violate these Terms or engage in fraudulent activity.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Products */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Products and Pricing</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">4.1 Product Descriptions</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          All products sold on our Website are handmade primitive dolls and related items. We strive to provide accurate product
                          descriptions and images. However:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>As each doll is handcrafted, slight variations in appearance may occur</li>
                          <li>Colors may vary slightly due to monitor settings and photography</li>
                          <li>Product dimensions and materials are described to the best of our ability</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">4.2 Pricing</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          All prices are listed in the currency displayed on the Website and include applicable taxes (VAT) where required. We reserve
                          the right to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Change prices at any time without prior notice</li>
                          <li>Correct pricing errors, even after an order has been placed (with notification to you)</li>
                          <li>Offer promotional discounts or special pricing at our discretion</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">4.3 Product Availability</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Products are subject to availability. We cannot guarantee that all items displayed on the Website are in stock. If a
                          product becomes unavailable after you place an order, we will notify you and offer a refund or alternative product.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Orders and Purchases */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Orders and Purchase Process</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">5.1 Placing an Order</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          When you place an order:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                          <li>You submit an offer to purchase the products in your cart</li>
                          <li>We send you an order confirmation email (this does not constitute acceptance of your order)</li>
                          <li>A binding contract is formed when we ship your order or send a shipping confirmation</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">5.2 Order Acceptance</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          We reserve the right to refuse or cancel any order for reasons including but not limited to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-3">
                          <li>Product unavailability</li>
                          <li>Pricing or product description errors</li>
                          <li>Suspected fraudulent or unauthorized transactions</li>
                          <li>Inability to verify customer information</li>
                          <li>Restrictions on quantities available for purchase</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">5.3 Order Modifications and Cancellations</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          You may modify or cancel your order before it has been shipped by contacting us at{' '}
                          <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a>. Once an order
                          has been shipped, it cannot be modified or cancelled, but it may be eligible for return according to our Returns Policy.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Payment */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Payment Terms</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">6.1 Payment Processing</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          We use <strong>Stripe</strong> as our payment processor. When you make a purchase:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>You will be redirected to Stripe Checkout to complete your payment securely</li>
                          <li>We do not store your full payment card details on our servers</li>
                          <li>Payment information is processed in accordance with PCI DSS standards</li>
                          <li>Stripe's terms of service and privacy policy also apply to your payment</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">6.2 Accepted Payment Methods</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          We accept major credit cards, debit cards, and other payment methods supported by Stripe Checkout in your region.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">6.3 Payment Authorization</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          By providing payment information, you represent and warrant that:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-3">
                          <li>You are authorized to use the payment method provided</li>
                          <li>You have sufficient funds or credit to complete the purchase</li>
                          <li>All payment information you provide is accurate and complete</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">6.4 Payment Failures</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          If payment fails or is declined, we will notify you and your order will not be processed. You are responsible for ensuring
                          payment is successful.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">6.5 Taxes</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          You are responsible for any applicable sales tax, VAT, customs duties, or other taxes or fees required by law. Prices
                          displayed on our Website may or may not include applicable taxes depending on your location.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Shipping and Delivery */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Shipping and Delivery</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">7.1 Shipping Locations</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          We currently ship to the following markets:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>European Union (EU) member states</li>
                          <li>United States of America</li>
                          <li>United Kingdom</li>
                          <li>Canada</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed mt-3">
                          Shipping costs and estimated delivery times will be displayed at checkout before you complete your purchase.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">7.2 Processing Time</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          As our products are handmade, processing time may vary. We will provide an estimated processing and shipping time for each
                          product. Custom or made-to-order items may require additional time.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">7.3 Shipping Carriers and Tracking</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          We use reputable shipping carriers to deliver your orders. Once your order ships, you will receive a tracking number via
                          email so you can monitor your shipment's progress.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">7.4 Delivery</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          You are responsible for providing an accurate shipping address. We are not liable for:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Delays caused by incorrect addresses or undeliverable packages</li>
                          <li>Customs delays for international shipments</li>
                          <li>Carrier delays beyond our control (weather, strikes, etc.)</li>
                          <li>Lost or stolen packages after confirmed delivery to the address provided</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">7.5 International Shipping</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          For international orders (outside the EU):
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-3">
                          <li>You may be subject to import duties, customs fees, or taxes imposed by your country</li>
                          <li>These additional charges are your responsibility and are not included in our pricing</li>
                          <li>We cannot predict or control these charges</li>
                          <li>Delivery times may be affected by customs clearance procedures</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">7.6 Risk of Loss</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Risk of loss and title for products purchased from us pass to you upon delivery to the carrier.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Returns and Refunds */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Returns, Refunds, and Cancellations</h2>

                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Our detailed Returns and Refunds Policy can be found on our dedicated{' '}
                        <Link href="/returns" className="text-primary hover:underline font-medium">Returns & Refunds page</Link>.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Key points include:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><strong>EU Consumers:</strong> 14-day withdrawal right under EU Consumer Rights Directive</li>
                        <li><strong>UK Consumers:</strong> 14-day cooling-off period under Consumer Contracts Regulations</li>
                        <li><strong>Defective Products:</strong> Eligible for replacement or refund</li>
                        <li><strong>Custom/Personalized Items:</strong> Generally not eligible for return unless defective</li>
                        <li><strong>Return Shipping:</strong> Customer responsibility unless product is defective</li>
                      </ul>
                      <p className="text-muted-foreground leading-relaxed mt-3">
                        Please review our complete Returns & Refunds Policy for full details and instructions on how to initiate a return.
                      </p>
                    </div>
                  </section>

                  {/* Intellectual Property */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Intellectual Property Rights</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">9.1 Our Intellectual Property</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          All content on this Website, including but not limited to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Text, images, photographs, graphics, videos, and designs</li>
                          <li>Product designs and doll patterns</li>
                          <li>Logos, trademarks, and brand elements</li>
                          <li>Website code, software, and functionality</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed mt-3">
                          is the exclusive property of Daria Sikora or our licensors and is protected by international copyright, trademark, and
                          other intellectual property laws.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">9.2 Limited License</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          We grant you a limited, non-exclusive, non-transferable license to access and use our Website for personal, non-commercial
                          purposes. You may not:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-3">
                          <li>Copy, reproduce, or duplicate our products or designs</li>
                          <li>Modify, distribute, transmit, display, or create derivative works from our content</li>
                          <li>Use our content for commercial purposes without written permission</li>
                          <li>Remove or alter any copyright, trademark, or other proprietary notices</li>
                          <li>Frame or mirror any part of our Website without authorization</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">9.3 User-Generated Content</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          If you submit reviews, comments, photos, or other content to our Website, you grant us a worldwide, royalty-free,
                          perpetual license to use, reproduce, modify, and display such content for marketing and promotional purposes.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Prohibited Uses */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">10. Prohibited Uses</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You agree not to use our Website for any unlawful purpose or in any way that could damage, disable, or impair our services.
                      Prohibited activities include:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Violating any applicable laws or regulations</li>
                      <li>Engaging in fraudulent activity or using stolen payment information</li>
                      <li>Attempting to gain unauthorized access to our systems or other users' accounts</li>
                      <li>Transmitting viruses, malware, or other harmful code</li>
                      <li>Interfering with the proper functioning of the Website</li>
                      <li>Scraping, data mining, or harvesting data from our Website</li>
                      <li>Impersonating another person or entity</li>
                      <li>Harassing, threatening, or abusing our staff or other users</li>
                      <li>Reselling our products without authorization</li>
                    </ul>
                  </section>

                  {/* Disclaimer of Warranties */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">11. Disclaimer of Warranties</h2>
                    <div className="bg-muted/30 border-l-4 border-chart-5 p-6">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR WEBSITE AND PRODUCTS ARE PROVIDED "AS IS" AND "AS AVAILABLE"
                        WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.
                      </p>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
                        <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
                        <li>Warranties regarding the accuracy, reliability, or completeness of content</li>
                        <li>Warranties that the Website will be uninterrupted, secure, or error-free</li>
                      </ul>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Note:</strong> Nothing in these Terms affects your statutory rights as a consumer under applicable consumer
                        protection laws (including EU Consumer Rights Directive, UK Consumer Rights Act, or similar laws).
                      </p>
                    </div>
                  </section>

                  {/* Limitation of Liability */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">12. Limitation of Liability</h2>
                    <div className="bg-muted/30 border-l-4 border-chart-4 p-6">
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DARIA SIKORA SHALL NOT BE LIABLE FOR:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                        <li>Indirect, incidental, special, consequential, or punitive damages</li>
                        <li>Loss of profits, revenue, data, or business opportunities</li>
                        <li>Damages arising from unauthorized access to or alteration of your data</li>
                        <li>Damages resulting from reliance on any information obtained through the Website</li>
                        <li>Damages caused by third-party services (Stripe, shipping carriers, etc.)</li>
                      </ul>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        OUR TOTAL LIABILITY TO YOU FOR ANY CLAIM ARISING FROM OR RELATED TO THESE TERMS OR YOUR USE OF THE WEBSITE SHALL NOT
                        EXCEED THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR €100, WHICHEVER IS GREATER.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Important:</strong> Nothing in these Terms excludes or limits our liability for death or personal injury caused
                        by our negligence, fraud, or any other liability that cannot be excluded or limited under applicable law.
                      </p>
                    </div>
                  </section>

                  {/* Indemnification */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">13. Indemnification</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      You agree to indemnify, defend, and hold harmless Daria Sikora, our affiliates, and our respective officers, directors,
                      employees, and agents from any claims, liabilities, damages, losses, costs, or expenses (including reasonable legal fees)
                      arising from:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-4">
                      <li>Your violation of these Terms</li>
                      <li>Your violation of any applicable laws or regulations</li>
                      <li>Your violation of any third-party rights, including intellectual property rights</li>
                      <li>Your use or misuse of our Website or products</li>
                      <li>Any content you submit to our Website</li>
                    </ul>
                  </section>

                  {/* Governing Law */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">14. Governing Law and Jurisdiction</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">14.1 Governing Law</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          These Terms shall be governed by and construed in accordance with the laws of <strong>Poland</strong>, without regard to
                          its conflict of law provisions.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">14.2 Jurisdiction</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          Subject to mandatory consumer protection laws in your jurisdiction:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Any disputes arising from these Terms or your use of our Website shall be subject to the exclusive jurisdiction of
                          the courts of Rzeszów, Poland.</li>
                          <li>However, if you are a consumer in the EU, UK, or another jurisdiction with mandatory consumer protection laws, you
                          may also bring proceedings in the courts of your country of residence.</li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">14.3 Consumer Rights</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Nothing in these Terms affects your statutory rights as a consumer under mandatory consumer protection laws, including:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-3">
                          <li><strong>EU:</strong> EU Consumer Rights Directive, applicable consumer protection regulations</li>
                          <li><strong>UK:</strong> Consumer Rights Act 2015, Consumer Contracts Regulations 2013</li>
                          <li><strong>USA:</strong> State consumer protection laws, FTC regulations</li>
                          <li><strong>Canada:</strong> Consumer protection legislation in your province</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Dispute Resolution */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">15. Dispute Resolution</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">15.1 Informal Resolution</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Before initiating any formal dispute resolution, we encourage you to contact us at{' '}
                          <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a> to try to
                          resolve the issue informally. We are committed to addressing your concerns in good faith.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">15.2 EU Online Dispute Resolution</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          If you are an EU consumer, you may use the European Commission's Online Dispute Resolution (ODR) platform to resolve
                          disputes: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ec.europa.eu/consumers/odr</a>
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">15.3 Alternative Dispute Resolution</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          We are willing to participate in alternative dispute resolution procedures, including mediation, where appropriate and
                          available under applicable law.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Force Majeure */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">16. Force Majeure</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We shall not be liable for any failure to perform our obligations under these Terms if such failure is caused by circumstances
                      beyond our reasonable control, including but not limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-3">
                      <li>Acts of God, natural disasters, pandemics, or epidemics</li>
                      <li>War, terrorism, civil unrest, or government actions</li>
                      <li>Labor disputes, strikes, or lockouts</li>
                      <li>Failure of third-party services (hosting, payment processing, shipping)</li>
                      <li>Internet or telecommunications failures</li>
                    </ul>
                  </section>

                  {/* Severability */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">17. Severability</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      If any provision of these Terms is found to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such
                      provision shall be modified to the minimum extent necessary to make it valid and enforceable, or if such modification is not
                      possible, it shall be severed from these Terms. The remaining provisions shall continue in full force and effect.
                    </p>
                  </section>

                  {/* Entire Agreement */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">18. Entire Agreement</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      These Terms, together with our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>,{' '}
                      <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>, and{' '}
                      <Link href="/returns" className="text-primary hover:underline">Returns & Refunds Policy</Link>, constitute the entire
                      agreement between you and Daria Sikora regarding your use of our Website and supersede all prior agreements and understandings.
                    </p>
                  </section>

                  {/* Waiver */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">19. Waiver</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any
                      waiver of any provision of these Terms will be effective only if in writing and signed by us.
                    </p>
                  </section>

                  {/* Assignment */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">20. Assignment</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      You may not assign or transfer these Terms or your rights hereunder without our prior written consent. We may assign or
                      transfer these Terms or our rights hereunder at any time without restriction.
                    </p>
                  </section>

                  {/* Changes to Terms */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">21. Changes to These Terms</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We reserve the right to modify these Terms at any time. When we make changes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>We will update the "Last updated" date at the top of this page</li>
                      <li>For material changes, we may notify you via email or through a notice on our Website</li>
                      <li>Your continued use of the Website after changes are posted constitutes acceptance of the modified Terms</li>
                      <li>If you do not agree to the modified Terms, you must stop using our Website</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      We encourage you to review these Terms periodically to stay informed of any updates.
                    </p>
                  </section>

                  {/* Contact Information */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">22. Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us:
                    </p>
                    <div className="bg-muted/30 p-6 rounded-lg space-y-2">
                      <p className="text-foreground"><strong>Daria Sikora</strong></p>
                      <p className="text-muted-foreground">Stefana Starzyńskiego 2/83</p>
                      <p className="text-muted-foreground">35-508 Rzeszów, Podkarpackie, Poland</p>
                      <p className="text-muted-foreground">NIP (Tax ID): 8131627011</p>
                      <p className="text-muted-foreground">Email: <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a></p>
                      <p className="text-muted-foreground">Phone: <a href="tel:+48501083574" className="text-primary hover:underline">+48 501 083 574</a></p>
                      <p className="text-muted-foreground">Website: <a href="https://dariasikora.pl" className="text-primary hover:underline">dariasikora.pl</a></p>
                    </div>
                  </section>

                  {/* Acknowledgment */}
                  <section className="border-t border-border pt-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">23. Acknowledgment</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      BY USING OUR WEBSITE, CREATING AN ACCOUNT, OR MAKING A PURCHASE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE
                      TO BE BOUND BY THESE TERMS OF SERVICE.
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>

            {/* Related Pages */}
            <div className="mt-8 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Related Policies</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/cookies" className="text-primary hover:underline">
                  Cookie Policy
                </Link>
                <Link href="/returns" className="text-primary hover:underline">
                  Returns & Refunds
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
