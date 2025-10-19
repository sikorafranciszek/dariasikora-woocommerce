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
  title: 'Shipping Policy - My Primitive Dolls',
  description: 'Learn about our shipping options, delivery times, and international shipping for handmade primitive dolls at dariasikora.pl',
};

export default function ShippingPage() {
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
                <BreadcrumbPage>Shipping Policy</BreadcrumbPage>
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
              Shipping Policy
            </h1>
            <p className="text-lg text-muted-foreground mb-8 sm:mb-12">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <Card className="mb-8">
              <CardContent className="p-6 sm:p-8 prose prose-gray max-w-none">
                <div className="space-y-8">
                  {/* Introduction */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      At <strong>dariasikora.pl</strong>, we are committed to delivering your handmade primitive dolls safely and efficiently.
                      This Shipping Policy outlines our shipping options, delivery times, costs, and what to expect when ordering from us.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      All products are carefully packaged to ensure they arrive in perfect condition. We ship worldwide using trusted carriers.
                    </p>
                  </section>

                  {/* Shipping Destinations */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Shipping Destinations</h2>

                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">We Ship To:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border-l-4 border-primary pl-4">
                          <p className="font-semibold text-foreground mb-2">European Union (EU)</p>
                          <p className="text-sm text-muted-foreground">All 27 EU member states</p>
                        </div>
                        <div className="border-l-4 border-chart-2 pl-4">
                          <p className="font-semibold text-foreground mb-2">United States</p>
                          <p className="text-sm text-muted-foreground">All 50 states</p>
                        </div>
                        <div className="border-l-4 border-chart-3 pl-4">
                          <p className="font-semibold text-foreground mb-2">United Kingdom</p>
                          <p className="text-sm text-muted-foreground">England, Scotland, Wales, Northern Ireland</p>
                        </div>
                        <div className="border-l-4 border-chart-4 pl-4">
                          <p className="font-semibold text-foreground mb-2">Canada</p>
                          <p className="text-sm text-muted-foreground">All provinces and territories</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4 italic">
                        We also offer worldwide shipping to most other countries. If your country is not listed at checkout,
                        please contact us at <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a>.
                      </p>
                    </div>
                  </section>

                  {/* Shipping Carrier */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. Shipping Carrier</h2>
                    <div className="border-l-4 border-primary pl-4">
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        We primarily use <strong>FedEx</strong> for international shipping, ensuring reliable and trackable delivery to your door.
                        FedEx provides excellent service with comprehensive tracking and insurance options.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Depending on your location and the size of your order, we may also use other trusted carriers such as DHL, UPS, or
                        national postal services to provide the best service at competitive rates.
                      </p>
                    </div>
                  </section>

                  {/* Processing Time */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Processing Time</h2>

                    <div className="space-y-4">
                      <div className="bg-muted/30 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-foreground mb-3">Standard Processing Time</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          <strong className="text-foreground">1-3 business days</strong>
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          This is the time required to prepare your order for shipment. Processing time does not include shipping/delivery time.
                          Business days are Monday through Friday, excluding Polish public holidays.
                        </p>
                      </div>

                      <div className="border-l-4 border-chart-2 pl-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Handmade Products</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          Since all our dolls are handcrafted, some items may require additional time if they are made-to-order or
                          require customization. If your order will take longer than the standard processing time, we will notify
                          you via email within 24 hours of your purchase.
                        </p>
                      </div>

                      <div className="border-l-4 border-chart-3 pl-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Peak Seasons</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          During busy periods (e.g., holidays, sales events), processing times may be extended by 1-2 business days.
                          We will update this page and notify customers if delays are expected.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Delivery Times */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Estimated Delivery Times</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Delivery times are estimates and begin after your order has been processed and shipped. Actual delivery times may vary
                      based on customs clearance, weather conditions, and carrier delays.
                    </p>

                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-border rounded-lg">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Destination</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Estimated Delivery Time</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Typical Total Time*</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Poland</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">2-4 business days</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">3-7 business days</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">European Union</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">4-8 business days</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">5-11 business days</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">United Kingdom</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">5-10 business days</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">6-13 business days</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">United States</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">7-14 business days</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">8-17 business days</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Canada</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">7-14 business days</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">8-17 business days</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Other Countries</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">10-21 business days</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">11-24 business days</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4 italic">
                      * Total time includes processing (1-3 days) + delivery time. These are estimates only and not guaranteed delivery dates.
                    </p>
                  </section>

                  {/* Shipping Costs */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Shipping Costs</h2>

                    <div className="space-y-4">
                      <div className="bg-muted/30 p-6 rounded-lg">
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          Shipping costs are calculated based on:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Destination country</li>
                          <li>Package weight and dimensions</li>
                          <li>Selected shipping method</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed mt-4">
                          <strong className="text-foreground">Shipping costs will be displayed at checkout</strong> before you complete your purchase.
                          There are no hidden fees or surprise charges.
                        </p>
                      </div>

                      <div className="border-l-4 border-primary pl-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">Free Shipping Promotions</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          We occasionally offer free shipping promotions. When available, free shipping offers will be displayed on our homepage
                          and applied automatically at checkout for qualifying orders.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Tracking */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Order Tracking</h2>

                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-foreground mb-3">How to Track Your Order</h3>
                      <ol className="space-y-3">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</span>
                          <div>
                            <p className="text-muted-foreground text-sm">
                              Once your order ships, you will receive a <strong className="text-foreground">shipping confirmation email</strong> with
                              your tracking number.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</span>
                          <div>
                            <p className="text-muted-foreground text-sm">
                              Click the tracking link in the email or visit the carrier's website (FedEx, DHL, etc.) and enter your tracking number.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</span>
                          <div>
                            <p className="text-muted-foreground text-sm">
                              You can also track your order by logging into your account on our website and viewing your order history.
                            </p>
                          </div>
                        </li>
                      </ol>
                      <p className="text-sm text-muted-foreground mt-4 italic">
                        Note: Tracking information may take 24-48 hours to update after your order ships.
                      </p>
                    </div>
                  </section>

                  {/* International Shipping */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">8. International Shipping - Customs and Duties</h2>

                    <div className="space-y-4">
                      <div className="border-l-4 border-chart-4 pl-4">
                        <h3 className="text-lg font-semibold text-foreground mb-3">8.1 Customs Declarations</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm mb-3">
                          For international shipments outside the EU, we are required to complete customs documentation declaring the contents
                          and value of your package. We complete all customs forms accurately and honestly.
                        </p>
                        <p className="text-sm text-muted-foreground italic">
                          We cannot mark items as "gifts" or undervalue products on customs forms as this is illegal.
                        </p>
                      </div>

                      <div className="bg-muted/30 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-foreground mb-3">8.2 Import Duties, Taxes, and Fees</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          <strong className="text-foreground">You are responsible for any import duties, customs fees, or taxes</strong> imposed
                          by your country's customs authority.
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                          <li><strong>European Union customers:</strong> No customs duties or VAT for shipments within the EU</li>
                          <li><strong>UK customers:</strong> May be subject to UK customs charges and VAT (post-Brexit)</li>
                          <li><strong>USA customers:</strong> May be subject to import duties depending on product value and type</li>
                          <li><strong>Canadian customers:</strong> May be charged GST/HST, PST, and customs duties</li>
                          <li><strong>Other countries:</strong> Customs regulations vary by country</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-3">
                          These charges are not included in our product prices or shipping costs and are collected by the carrier or customs
                          authority upon delivery or clearance.
                        </p>
                      </div>

                      <div className="border-l-4 border-chart-2 pl-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">8.3 Customs Delays</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          International shipments may be delayed by customs inspections. These delays are beyond our control. If your package
                          is held by customs, the carrier will contact you with instructions.
                        </p>
                      </div>

                      <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg">
                        <p className="text-sm text-foreground font-semibold mb-2">Important Notice:</p>
                        <p className="text-sm text-muted-foreground">
                          We are not responsible for packages refused or returned due to unpaid customs charges. If you refuse a package,
                          you will not receive a refund for shipping costs, and return shipping charges may apply.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Lost or Damaged */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Lost or Damaged Shipments</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">9.1 Damaged Packages</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
                          If your package arrives damaged:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                          <li>Take photos of the damaged packaging and product</li>
                          <li>Note any damage on the delivery receipt if possible</li>
                          <li>Contact us immediately at <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a> with
                          your order number and photos</li>
                          <li>We will file a claim with the carrier and send a replacement or issue a refund</li>
                        </ol>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">9.2 Lost Packages</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3 text-sm">
                          If your tracking shows your package as delivered but you have not received it:
                        </p>
                        <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                          <li>Check with neighbors, building management, or household members</li>
                          <li>Look around your delivery location (porches, garages, mailrooms)</li>
                          <li>Wait 24-48 hours (sometimes carriers mark items as delivered before actual delivery)</li>
                          <li>Contact the carrier directly using your tracking number</li>
                          <li>If the package cannot be located, contact us and we will assist with filing a claim</li>
                        </ol>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <p className="text-sm text-foreground font-semibold mb-2">Our Commitment:</p>
                        <p className="text-sm text-muted-foreground">
                          We take full responsibility for lost or damaged shipments. If your package is confirmed lost or damaged in transit,
                          we will send a replacement or issue a full refund at no additional cost to you.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Delivery Issues */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">10. Delivery Address and Failed Deliveries</h2>

                    <div className="space-y-4">
                      <div className="border-l-4 border-chart-3 pl-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">10.1 Accurate Address Required</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">
                          Please ensure your shipping address is complete and accurate. We are not responsible for orders shipped to incorrect
                          addresses provided by the customer. If you need to change your shipping address, contact us immediately at{' '}
                          <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a>. We can only
                          modify the address before the order ships.
                        </p>
                      </div>

                      <div className="border-l-4 border-chart-4 pl-4">
                        <h3 className="text-lg font-semibold text-foreground mb-2">10.2 Undeliverable Packages</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm mb-2">
                          If a package is returned to us as undeliverable due to:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                          <li>Incorrect or incomplete address</li>
                          <li>Failed delivery attempts (customer unavailable)</li>
                          <li>Refused delivery</li>
                          <li>Unclaimed package</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed text-sm mt-2">
                          We will contact you to arrange reshipment. You will be responsible for paying the reshipping costs unless the error
                          was on our part.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Contact for Shipping Questions */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">11. Shipping Questions?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about shipping, delivery times, or tracking your order, please contact us:
                    </p>
                    <div className="bg-muted/30 p-6 rounded-lg space-y-2">
                      <p className="text-foreground"><strong>Daria Sikora</strong></p>
                      <p className="text-muted-foreground">Stefana Starzyńskiego 2/83</p>
                      <p className="text-muted-foreground">35-508 Rzeszów, Poland</p>
                      <p className="text-muted-foreground">Email: <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a></p>
                      <p className="text-muted-foreground">Phone: <a href="tel:+48501083574" className="text-primary hover:underline">+48 501 083 574</a></p>
                      <p className="text-muted-foreground">Website: <a href="https://dariasikora.pl" className="text-primary hover:underline">dariasikora.pl</a></p>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 italic">
                      We typically respond to all shipping inquiries within 24 hours (Monday-Friday, excluding Polish holidays).
                    </p>
                  </section>
                </div>
              </CardContent>
            </Card>

            {/* Related Pages */}
            <div className="mt-8 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Related Policies</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/returns" className="text-primary hover:underline">
                  Returns & Refunds
                </Link>
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                <Link href="/faq" className="text-primary hover:underline">
                  FAQ
                </Link>
                <Link href="/contact" className="text-primary hover:underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
