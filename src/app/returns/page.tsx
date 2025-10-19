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
  title: 'Returns & Refunds Policy - My Primitive Dolls',
  description: 'Learn about our 14-day return policy, refund process, and warranty for handmade primitive dolls at dariasikora.pl',
};

export default function ReturnsPage() {
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
                <BreadcrumbPage>Returns & Refunds</BreadcrumbPage>
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
              Returns & Refunds Policy
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
                      At <strong>dariasikora.pl</strong>, we want you to be completely satisfied with your purchase. This Returns & Refunds Policy
                      explains your rights to return products and receive refunds in accordance with applicable consumer protection laws.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Your return rights depend on your location and the type of product you purchased. We comply with EU Consumer Rights Directive
                      2011/83/EU, UK Consumer Contracts Regulations 2013, and Polish Consumer Rights Act.
                    </p>
                  </section>

                  {/* 14-Day Return Policy */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Your Right to Cancel (14-Day Withdrawal Period)</h2>

                    <div className="space-y-6">
                      <div className="border-l-4 border-primary pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">2.1 EU and UK Consumers</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          If you are a consumer in the European Union or United Kingdom, you have the right to cancel your order and return products
                          within <strong>14 calendar days</strong> without giving any reason.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          The 14-day period begins:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                          <li>On the day you (or a third party you designate) receive the goods</li>
                          <li>For multiple items ordered together but delivered separately: on the day you receive the last item</li>
                        </ul>
                        <p className="text-sm text-muted-foreground italic bg-muted/30 p-4 rounded-lg">
                          Legal basis: EU Directive 2011/83/EU on Consumer Rights, UK Consumer Contracts Regulations 2013,
                          Polish Act on Consumer Rights (Ustawa o prawach konsumenta)
                        </p>
                      </div>

                      <div className="border-l-4 border-chart-2 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">2.2 USA and Canadian Consumers</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          While not legally required, we extend the same <strong>14-day return policy</strong> to customers in the United States
                          and Canada as a matter of customer service.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          Please note: state and provincial consumer protection laws may also apply and provide additional rights.
                        </p>
                      </div>

                      <div className="border-l-4 border-chart-3 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">2.3 Other Countries</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          For customers in other countries, please contact us at{' '}
                          <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a> to
                          discuss return options. We will work with you to find a fair solution.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* How to Return */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. How to Return Products</h2>

                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">Step-by-Step Return Process</h3>
                      <ol className="space-y-4">
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">1</span>
                          <div>
                            <p className="font-semibold text-foreground mb-1">Contact Us</p>
                            <p className="text-sm text-muted-foreground">
                              Email us at <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a> within
                              14 days of receiving your order. Include your order number and reason for return (optional but appreciated).
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">2</span>
                          <div>
                            <p className="font-semibold text-foreground mb-1">Prepare the Item</p>
                            <p className="text-sm text-muted-foreground">
                              Pack the item securely in its original packaging if possible. Include all accessories, tags, and documentation.
                              The item must be in original condition (see section 4 below).
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">3</span>
                          <div>
                            <p className="font-semibold text-foreground mb-1">Ship the Item</p>
                            <p className="text-sm text-muted-foreground">
                              Send the item to the address we provide. We recommend using a tracked shipping service. Keep your tracking number
                              and proof of postage.
                            </p>
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">4</span>
                          <div>
                            <p className="font-semibold text-foreground mb-1">Receive Your Refund</p>
                            <p className="text-sm text-muted-foreground">
                              Once we receive and inspect the returned item, we will process your refund within 14 days. You will receive a
                              confirmation email when your refund has been issued.
                            </p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="font-semibold text-foreground mb-2">Return Address:</p>
                      <p className="text-muted-foreground text-sm">
                        Daria Sikora<br />
                        Stefana Starzyńskiego 2/83<br />
                        35-508 Rzeszów<br />
                        Poland
                      </p>
                      <p className="text-muted-foreground text-sm mt-2 italic">
                        (Wait for our confirmation email before sending - we may provide specific return instructions)
                      </p>
                    </div>
                  </section>

                  {/* Conditions for Returns */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Conditions for Returns</h2>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">4.1 Product Condition</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          To be eligible for a return and refund, products must be:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>In their original condition (unused, unworn, unwashed)</li>
                          <li>With all original tags, labels, and packaging intact</li>
                          <li>Free from damage, stains, odors, or signs of use</li>
                          <li>Not altered, modified, or personalized</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-3 italic">
                          You may examine the product to assess its nature, characteristics, and functioning (similar to how you would in a physical store),
                          but please do not use or damage it.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">4.2 Items Not Eligible for Return</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          The following items are generally not eligible for return under the 14-day withdrawal right:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li><strong>Custom or personalized items:</strong> Products made to your specifications or clearly personalized</li>
                          <li><strong>Hygiene items:</strong> Products that have been unsealed or used (if applicable)</li>
                          <li><strong>Items damaged by customer:</strong> Products damaged due to mishandling after delivery</li>
                        </ul>
                        <p className="text-sm text-foreground font-medium mt-3">
                          Note: Defective or faulty products are always eligible for return, replacement, or repair (see section 6 below).
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Refund Process */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Refund Process and Timeline</h2>

                    <div className="space-y-4">
                      <div className="bg-muted/30 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-foreground mb-3">5.1 Refund Timeline</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          We will process your refund within <strong>14 days</strong> after:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>We receive the returned goods, OR</li>
                          <li>You provide proof of return shipment (e.g., tracking number showing the item was sent)</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-3 italic">
                          Whichever is earlier. This timeline complies with EU Directive 2011/83/EU Article 13.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">5.2 Refund Method</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          Refunds will be issued using the same payment method you used for the original purchase, unless you explicitly agree to
                          a different method. We will not charge you any fees for the refund.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          Please allow 3-10 business days after we process the refund for the funds to appear in your account, depending on your
                          bank or payment provider.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">5.3 Refund Amount</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          Your refund will include:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                          <li>Full product price</li>
                          <li>Original shipping costs (standard delivery only, not express or premium options)</li>
                        </ul>
                        <p className="text-muted-foreground leading-relaxed">
                          <strong>Important:</strong> We may withhold the refund until we receive the returned goods or until you provide proof
                          of return, whichever is earlier.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Faulty Products */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Faulty, Defective, or Damaged Products</h2>

                    <div className="border-l-4 border-chart-4 pl-4">
                      <h3 className="text-xl font-semibold text-foreground mb-3">6.1 Your Legal Rights (2-Year Warranty)</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        If your product is <strong>faulty, defective, damaged in transit, or not as described</strong>, you have additional
                        rights beyond the 14-day withdrawal period:
                      </p>

                      <div className="bg-muted/30 p-6 rounded-lg mb-4">
                        <p className="font-semibold text-foreground mb-3">EU/UK Consumers - Legal Guarantee:</p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                          <li><strong>2-year legal guarantee:</strong> Products must conform to the sales contract for 2 years from delivery
                          (EU Consumer Sales Directive 1999/44/EC, UK Consumer Rights Act 2015)</li>
                          <li><strong>First 6 months:</strong> Any defect is presumed to have existed at the time of delivery (burden of proof on seller)</li>
                          <li><strong>After 6 months:</strong> You may need to prove the defect existed at the time of delivery</li>
                          <li><strong>Remedies:</strong> Repair, replacement, price reduction, or full refund (your choice, subject to proportionality)</li>
                        </ul>
                      </div>

                      <h3 className="text-lg font-semibold text-foreground mb-2">6.2 Reporting Defective Products</h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        If you receive a defective or damaged product:
                      </p>
                      <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        <li>Contact us immediately at <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a></li>
                        <li>Provide your order number and describe the issue</li>
                        <li>Send photos of the defect or damage if possible</li>
                        <li>We will provide instructions for return or replacement</li>
                      </ol>

                      <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">6.3 Our Commitment</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        For defective or damaged products, we will:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground mt-2">
                        <li>Cover all return shipping costs</li>
                        <li>Offer a replacement, repair, or full refund (your choice)</li>
                        <li>Process your claim quickly and fairly</li>
                      </ul>
                    </div>
                  </section>

                  {/* Return Shipping Costs */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Return Shipping Costs</h2>

                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-border rounded-lg">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Situation</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Who Pays Return Shipping?</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Change of mind (14-day withdrawal)</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Customer pays return shipping costs</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Defective or damaged product</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">We pay return shipping costs</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Wrong item received</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">We pay return shipping costs</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Item not as described</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">We pay return shipping costs</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4 italic">
                      EU/UK consumers: Under consumer law, you are only liable for the direct cost of returning the goods for a standard withdrawal.
                    </p>
                  </section>

                  {/* Exchanges */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Exchanges</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We do not offer direct exchanges. If you would like a different item:
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                      <li>Return the original item following the process above</li>
                      <li>Receive your refund</li>
                      <li>Place a new order for the item you prefer</li>
                    </ol>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      This ensures faster processing and gives you flexibility to choose exactly what you want.
                    </p>
                  </section>

                  {/* Contact Information */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Questions About Returns?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about our Returns & Refunds Policy or need assistance with a return, please contact us:
                    </p>
                    <div className="bg-muted/30 p-6 rounded-lg space-y-2">
                      <p className="text-foreground"><strong>Daria Sikora</strong></p>
                      <p className="text-muted-foreground">Stefana Starzyńskiego 2/83</p>
                      <p className="text-muted-foreground">35-508 Rzeszów, Poland</p>
                      <p className="text-muted-foreground">Email: <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a></p>
                      <p className="text-muted-foreground">Phone: <a href="tel:+48501083574" className="text-primary hover:underline">+48 501 083 574</a></p>
                      <p className="text-muted-foreground">Website: <a href="https://dariasikora.pl" className="text-primary hover:underline">dariasikora.pl</a></p>
                    </div>
                  </section>

                  {/* Legal References */}
                  <section className="border-t border-border pt-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">10. Legal References</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This Returns & Refunds Policy complies with:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li><strong>EU:</strong> Directive 2011/83/EU on Consumer Rights, Directive 1999/44/EC on Consumer Sales</li>
                      <li><strong>UK:</strong> Consumer Contracts Regulations 2013, Consumer Rights Act 2015</li>
                      <li><strong>Poland:</strong> Consumer Rights Act (Ustawa o prawach konsumenta), Civil Code</li>
                      <li><strong>International:</strong> United Nations Convention on Contracts for the International Sale of Goods (CISG)</li>
                    </ul>
                  </section>
                </div>
              </CardContent>
            </Card>

            {/* Related Pages */}
            <div className="mt-8 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Related Policies</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                <Link href="/shipping" className="text-primary hover:underline">
                  Shipping Policy
                </Link>
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
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
