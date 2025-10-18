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
  title: 'Cookie Policy - My Primitive Dolls',
  description: 'Learn about how we use cookies and similar technologies on dariasikora.pl',
};

export default function CookiePolicyPage() {
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
                <BreadcrumbPage>Cookie Policy</BreadcrumbPage>
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
              Cookie Policy
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
                      This Cookie Policy explains how <strong>Daria Sikora</strong> ("we", "us", or "our") uses cookies and similar technologies on our website{' '}
                      <strong>dariasikora.pl</strong> (the "Website"). This policy is compliant with EU GDPR, UK GDPR, US CCPA, and Canadian PIPEDA regulations.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      By using our Website, you consent to our use of cookies in accordance with this Cookie Policy. If you do not agree to our use of cookies,
                      you should set your browser settings accordingly or not use our Website.
                    </p>
                  </section>

                  {/* What are cookies */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. What Are Cookies?</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make
                      websites work more efficiently, as well as to provide information to the owners of the site.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies
                      are deleted as soon as you close your web browser.
                    </p>
                  </section>

                  {/* How we use cookies */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Cookies</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use cookies for the following purposes:
                    </p>

                    <div className="space-y-6">
                      {/* Essential Cookies */}
                      <div className="border-l-4 border-primary pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Essential Cookies (Strictly Necessary)</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          These cookies are necessary for the Website to function properly and cannot be switched off. They are usually only set in response
                          to actions you take, such as setting your privacy preferences, logging in, or filling in forms.
                        </p>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="font-semibold text-foreground mb-2">Used by:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li><strong>Better-auth</strong>: Authentication and session management</li>
                            <li><strong>Vercel</strong>: Website hosting and performance</li>
                            <li><strong>Cloudflare</strong>: Security and bot protection</li>
                          </ul>
                          <p className="mt-3 text-sm text-muted-foreground italic">
                            ⚠️ These cookies do not require consent under GDPR as they are strictly necessary for the website to function.
                          </p>
                        </div>
                      </div>

                      {/* Analytics Cookies */}
                      <div className="border-l-4 border-chart-2 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.2 Analytics Cookies (Performance)</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          These cookies help us understand how visitors interact with our Website by collecting and reporting information anonymously.
                          We use this information to improve the Website and user experience.
                        </p>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="font-semibold text-foreground mb-2">Used by:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li><strong>Google Analytics</strong> (planned): Website traffic analysis with IP anonymization enabled</li>
                            <li><strong>Cloudflare Analytics</strong>: Privacy-friendly analytics (no personal data collected)</li>
                            <li><strong>Sentry</strong>: Error monitoring and performance tracking</li>
                          </ul>
                          <p className="mt-3 text-sm text-foreground font-medium">
                            ✅ These cookies require your explicit consent under GDPR.
                          </p>
                        </div>
                      </div>

                      {/* Functional Cookies */}
                      <div className="border-l-4 border-chart-3 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.3 Functional Cookies</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          These cookies enable enhanced functionality and personalization, such as videos and third-party services.
                        </p>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="font-semibold text-foreground mb-2">Used by:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li><strong>Vimeo</strong>: Video player embedded on About Me page</li>
                            <li><strong>YouTube</strong> (planned): Video content</li>
                            <li><strong>reCAPTCHA</strong>: Spam protection on forms</li>
                          </ul>
                          <p className="mt-3 text-sm text-foreground font-medium">
                            ✅ These cookies require your explicit consent under GDPR.
                          </p>
                        </div>
                      </div>

                      {/* Payment Cookies */}
                      <div className="border-l-4 border-chart-4 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.4 Payment Processing Cookies</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          These cookies are set by our payment processor to securely process transactions.
                        </p>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="font-semibold text-foreground mb-2">Used by:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li><strong>Stripe</strong>: Secure payment processing (Stripe Checkout redirect)</li>
                          </ul>
                          <p className="mt-3 text-sm text-muted-foreground italic">
                            ⚠️ These cookies are necessary for processing payments and are covered under legitimate interest.
                          </p>
                        </div>
                      </div>

                      {/* Third-party Integrations */}
                      <div className="border-l-4 border-chart-5 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.5 Third-Party Integration Cookies</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          We use third-party services that may set their own cookies.
                        </p>
                        <div className="bg-muted/30 p-4 rounded-lg">
                          <p className="font-semibold text-foreground mb-2">Used by:</p>
                          <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                            <li><strong>BaseLinker</strong>: Order management and fulfillment integration</li>
                            <li><strong>WooCommerce (WordPress)</strong>: E-commerce backend (hosted at wp.dariasikora.pl)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Cookie Details Table */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Detailed Cookie List</h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-border rounded-lg">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Cookie Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Provider</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Purpose</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Duration</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Type</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-4 py-3 text-sm text-muted-foreground">better-auth.session_token</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Better-auth</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">User authentication</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Session</td>
                            <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">Essential</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-muted-foreground">__cflb, __cfruid</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Cloudflare</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Bot protection & load balancing</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Session / 30 days</td>
                            <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">Essential</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-muted-foreground">_ga, _gid, _gat</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Google Analytics</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Analytics tracking (with IP anonymization)</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">2 years / 24 hours / 1 minute</td>
                            <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-chart-2/20 text-chart-2 rounded text-xs font-medium">Analytics</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-muted-foreground">vuid, player</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Vimeo</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Video player preferences</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">2 years / 1 year</td>
                            <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-chart-3/20 text-chart-3 rounded text-xs font-medium">Functional</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-muted-foreground">_grecaptcha</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Google reCAPTCHA</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Spam protection</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">6 months</td>
                            <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-chart-3/20 text-chart-3 rounded text-xs font-medium">Functional</span></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-muted-foreground">__stripe_*</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Stripe</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Payment fraud detection</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">1 year</td>
                            <td className="px-4 py-3 text-sm"><span className="px-2 py-1 bg-chart-4/20 text-chart-4 rounded text-xs font-medium">Payment</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  {/* Your choices */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Cookie Choices</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                      <li><strong>Cookie Banner:</strong> When you first visit our Website, you can accept or reject non-essential cookies through our cookie consent banner.</li>
                      <li><strong>Cookie Preferences:</strong> You can change your cookie preferences at any time by clicking the "Cookie Settings" link in our footer.</li>
                      <li><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to block or alert you about cookies.</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed">
                      <strong>Note:</strong> If you choose to block cookies, some parts of our Website may not function properly, and you may not be able to use
                      certain features such as placing orders or accessing your account.
                    </p>
                  </section>

                  {/* Browser-specific instructions */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">6. How to Manage Cookies in Your Browser</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      You can control and delete cookies through your browser settings. Here are links to instructions for popular browsers:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
                      <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
                      <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apple Safari</a></li>
                      <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
                    </ul>
                  </section>

                  {/* Data transfers */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">7. International Data Transfers</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our Website is hosted in the European Union (Vercel EU region, NeonDB EU region, WordPress hosting in Poland). However, some third-party
                      services we use may transfer data outside the EU:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li><strong>Google Analytics:</strong> Data may be transferred to the USA (protected by EU-US Data Privacy Framework and Standard Contractual Clauses)</li>
                      <li><strong>Stripe:</strong> Payment data may be processed in the USA (certified under EU-US Data Privacy Framework)</li>
                      <li><strong>Vimeo:</strong> Video service based in the USA (GDPR compliant with appropriate safeguards)</li>
                    </ul>
                  </section>

                  {/* Updates */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Changes to This Cookie Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We may update this Cookie Policy from time to time to reflect changes in our practices or for legal or regulatory reasons.
                      We will notify you of any material changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
                    </p>
                  </section>

                  {/* Contact */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions about our use of cookies or this Cookie Policy, please contact us:
                    </p>
                    <div className="bg-muted/30 p-6 rounded-lg space-y-2">
                      <p className="text-foreground"><strong>Daria Sikora</strong></p>
                      <p className="text-muted-foreground">Stefana Starzyńskiego 2/83</p>
                      <p className="text-muted-foreground">35-508 Rzeszów, Podkarpackie, Poland</p>
                      <p className="text-muted-foreground">NIP: 8131627011</p>
                      <p className="text-muted-foreground">Email: <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a></p>
                      <p className="text-muted-foreground">Phone: <a href="tel:+48501083574" className="text-primary hover:underline">+48 501 083 574</a></p>
                    </div>
                  </section>

                  {/* Legal compliance */}
                  <section className="border-t border-border pt-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">10. Legal Compliance</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This Cookie Policy complies with:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li><strong>EU GDPR</strong> (General Data Protection Regulation 2016/679)</li>
                      <li><strong>ePrivacy Directive</strong> (Directive 2002/58/EC)</li>
                      <li><strong>UK GDPR</strong> (Data Protection Act 2018)</li>
                      <li><strong>US CCPA/CPRA</strong> (California Consumer Privacy Act)</li>
                      <li><strong>Canadian PIPEDA</strong> (Personal Information Protection and Electronic Documents Act)</li>
                    </ul>
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
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
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
