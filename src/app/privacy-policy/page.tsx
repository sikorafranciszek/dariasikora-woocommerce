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
  title: 'Privacy Policy - My Primitive Dolls',
  description: 'Learn how Daria Sikora collects, uses, and protects your personal information in compliance with GDPR, CCPA, UK GDPR, and PIPEDA.',
};

export default function PrivacyPolicyPage() {
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
                <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
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
              Privacy Policy
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
                      This Privacy Policy explains how <strong>Daria Sikora</strong> ("we", "us", or "our") collects, uses, discloses, and protects
                      your personal information when you use our website <strong>dariasikora.pl</strong> (the "Website") and purchase our handmade
                      primitive dolls and related products.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We are committed to protecting your privacy and complying with applicable data protection laws, including:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                      <li><strong>EU GDPR</strong> (General Data Protection Regulation 2016/679)</li>
                      <li><strong>UK GDPR</strong> (Data Protection Act 2018)</li>
                      <li><strong>US CCPA/CPRA</strong> (California Consumer Privacy Act and California Privacy Rights Act)</li>
                      <li><strong>Canadian PIPEDA</strong> (Personal Information Protection and Electronic Documents Act)</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed">
                      By using our Website, you consent to the collection and use of your information as described in this Privacy Policy.
                    </p>
                  </section>

                  {/* Data Controller */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Data Controller</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      The data controller responsible for your personal information is:
                    </p>
                    <div className="bg-muted/30 p-6 rounded-lg space-y-2">
                      <p className="text-foreground"><strong>Daria Sikora</strong></p>
                      <p className="text-muted-foreground">Stefana Starzyńskiego 2/83</p>
                      <p className="text-muted-foreground">35-508 Rzeszów, Podkarpackie, Poland</p>
                      <p className="text-muted-foreground">NIP (Tax ID): 8131627011</p>
                      <p className="text-muted-foreground">Email: <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a></p>
                      <p className="text-muted-foreground">Phone: <a href="tel:+48501083574" className="text-primary hover:underline">+48 501 083 574</a></p>
                    </div>
                  </section>

                  {/* Information We Collect */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. Information We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We collect different types of information depending on how you interact with our Website:
                    </p>

                    <div className="space-y-6">
                      {/* Account Information */}
                      <div className="border-l-4 border-primary pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Account Information</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          When you create an account on our Website, we collect:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Name</li>
                          <li>Email address</li>
                          <li>Password (encrypted and stored securely)</li>
                          <li>Account creation date</li>
                        </ul>
                      </div>

                      {/* Order Information */}
                      <div className="border-l-4 border-chart-2 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.2 Order and Billing Information</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          When you place an order, we collect:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Full name</li>
                          <li>Billing address</li>
                          <li>Shipping address</li>
                          <li>Email address</li>
                          <li>Phone number</li>
                          <li>Order details (products, quantities, prices)</li>
                          <li>Payment information (processed securely by Stripe - we do not store full card details)</li>
                        </ul>
                      </div>

                      {/* Technical Information */}
                      <div className="border-l-4 border-chart-3 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.3 Technical and Usage Information</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          We automatically collect certain technical information when you visit our Website:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>IP address (anonymized for analytics purposes)</li>
                          <li>Browser type and version</li>
                          <li>Device type and operating system</li>
                          <li>Pages visited and time spent on pages</li>
                          <li>Referral source (how you arrived at our Website)</li>
                          <li>Cookies and similar tracking technologies (see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>)</li>
                        </ul>
                      </div>

                      {/* Communications */}
                      <div className="border-l-4 border-chart-4 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.4 Communications</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          If you contact us via email or through our contact forms, we collect:
                        </p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          <li>Name and email address</li>
                          <li>Message content</li>
                          <li>Any other information you choose to provide</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* How We Use Your Information */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">4. How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use your personal information for the following purposes:
                    </p>

                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">4.1 Order Processing and Fulfillment</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          To process your orders, arrange shipping, send order confirmations, and provide customer support.
                          <br />
                          <span className="italic">Legal basis: Contract performance (GDPR Article 6(1)(b))</span>
                        </p>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">4.2 Payment Processing</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          To securely process payments through our payment processor, Stripe. Payment card information is handled directly by
                          Stripe and never stored on our servers.
                          <br />
                          <span className="italic">Legal basis: Contract performance (GDPR Article 6(1)(b))</span>
                        </p>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">4.3 Account Management</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          To create and manage your account, authenticate your identity, and allow you to access order history.
                          <br />
                          <span className="italic">Legal basis: Contract performance (GDPR Article 6(1)(b))</span>
                        </p>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">4.4 Communications</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          To send you transactional emails (order confirmations, shipping notifications, account updates) and respond to your inquiries.
                          <br />
                          <span className="italic">Legal basis: Contract performance and legitimate interest (GDPR Article 6(1)(b) and (f))</span>
                        </p>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">4.5 Website Analytics and Improvement</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          To analyze how visitors use our Website, identify technical issues, and improve our services. We use Cloudflare Analytics,
                          Google Analytics (with IP anonymization), and Sentry for error tracking.
                          <br />
                          <span className="italic">Legal basis: Consent (GDPR Article 6(1)(a)) - only with your explicit consent via cookie banner</span>
                        </p>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">4.6 Fraud Prevention and Security</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          To protect against fraudulent transactions, unauthorized access, and other security threats.
                          <br />
                          <span className="italic">Legal basis: Legitimate interest (GDPR Article 6(1)(f))</span>
                        </p>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">4.7 Legal Compliance</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          To comply with applicable laws, regulations, tax requirements, and legal processes.
                          <br />
                          <span className="italic">Legal basis: Legal obligation (GDPR Article 6(1)(c))</span>
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Data Sharing */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">5. How We Share Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We do not sell, rent, or trade your personal information. We only share your data with trusted third-party service providers
                      necessary to operate our business:
                    </p>

                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-border rounded-lg">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Service Provider</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Purpose</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Data Location</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">Privacy Policy</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Stripe</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Payment processing</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">USA (EU-US DPF certified)</td>
                            <td className="px-4 py-3 text-sm"><a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Vercel</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Website hosting</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">EU region</td>
                            <td className="px-4 py-3 text-sm"><a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">NeonDB</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Database hosting</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">EU region</td>
                            <td className="px-4 py-3 text-sm"><a href="https://neon.tech/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Cyberfolks.pl</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">WordPress backend hosting</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Poland</td>
                            <td className="px-4 py-3 text-sm"><a href="https://cyberfolks.pl/polityka-prywatnosci/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">BaseLinker</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Order management & fulfillment</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Poland/EU</td>
                            <td className="px-4 py-3 text-sm"><a href="https://baselinker.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">SendGrid</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Transactional emails</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">USA (with EU data centers)</td>
                            <td className="px-4 py-3 text-sm"><a href="https://www.twilio.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Sentry</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Error tracking & monitoring</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">USA</td>
                            <td className="px-4 py-3 text-sm"><a href="https://sentry.io/privacy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Google Analytics</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Website analytics (planned)</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">USA (EU-US DPF certified)</td>
                            <td className="px-4 py-3 text-sm"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Cloudflare</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">CDN, security, analytics</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Global network</td>
                            <td className="px-4 py-3 text-sm"><a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Google reCAPTCHA</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Spam and bot protection</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">USA</td>
                            <td className="px-4 py-3 text-sm"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Vimeo</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Video hosting</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">USA (GDPR compliant)</td>
                            <td className="px-4 py-3 text-sm"><a href="https://vimeo.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">YouTube</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Video hosting (planned)</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">USA</td>
                            <td className="px-4 py-3 text-sm"><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Link</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mt-4">
                      We may also disclose your information if required by law, court order, or to protect our legal rights and interests.
                    </p>
                  </section>

                  {/* International Data Transfers */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">6. International Data Transfers</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our primary infrastructure is located in the European Union (Vercel EU, NeonDB EU, WordPress hosting in Poland). However,
                      some of our service providers are based in the United States or operate globally.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      When we transfer your personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li><strong>EU-US Data Privacy Framework (DPF):</strong> Stripe and Google are certified under the EU-US DPF, which provides
                      adequate protection for data transfers to the USA.</li>
                      <li><strong>Standard Contractual Clauses (SCCs):</strong> We use EU-approved Standard Contractual Clauses with service providers
                      not covered by the DPF.</li>
                      <li><strong>GDPR Compliance Commitments:</strong> All our service providers have committed to GDPR compliance and appropriate
                      technical and organizational measures.</li>
                    </ul>
                  </section>

                  {/* Data Retention */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Retention</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy:
                    </p>

                    <div className="bg-muted/30 p-6 rounded-lg space-y-4">
                      <div>
                        <p className="font-semibold text-foreground mb-2">Account Information:</p>
                        <p className="text-muted-foreground text-sm">
                          Retained until you request account deletion. You can delete your account at any time from your account settings.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-2">Order Information:</p>
                        <p className="text-muted-foreground text-sm">
                          Retained indefinitely for accounting, tax compliance, and customer service purposes. This is required by Polish tax law,
                          which mandates retention of business records for a minimum of 5 years.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-2">Analytics Data:</p>
                        <p className="text-muted-foreground text-sm">
                          Google Analytics data is automatically deleted after 26 months. Cloudflare Analytics data is anonymized and does not
                          identify individuals.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-2">Email Communications:</p>
                        <p className="text-muted-foreground text-sm">
                          Retained for up to 3 years for customer service and legal compliance purposes.
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground mb-2">Error Logs (Sentry):</p>
                        <p className="text-muted-foreground text-sm">
                          Retained for 90 days for debugging and system improvement purposes.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Your Rights */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Your Privacy Rights</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Depending on your location, you have various rights regarding your personal information:
                    </p>

                    <div className="space-y-6">
                      {/* GDPR Rights */}
                      <div className="border-l-4 border-primary pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">8.1 Rights Under EU GDPR and UK GDPR</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          If you are located in the European Union or United Kingdom, you have the following rights:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li><strong>Right to Access:</strong> Request a copy of your personal data we hold.</li>
                          <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.</li>
                          <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal data (subject to legal obligations).</li>
                          <li><strong>Right to Restriction of Processing:</strong> Request that we limit how we use your data.</li>
                          <li><strong>Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
                          <li><strong>Right to Object:</strong> Object to processing based on legitimate interests or direct marketing.</li>
                          <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time (where consent is the legal basis).</li>
                          <li><strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority.</li>
                        </ul>
                      </div>

                      {/* CCPA Rights */}
                      <div className="border-l-4 border-chart-2 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">8.2 Rights Under California CCPA/CPRA</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          If you are a California resident, you have the following rights:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li><strong>Right to Know:</strong> Request disclosure of personal information collected, used, or shared.</li>
                          <li><strong>Right to Delete:</strong> Request deletion of your personal information (subject to exceptions).</li>
                          <li><strong>Right to Opt-Out of Sale:</strong> We do not sell your personal information.</li>
                          <li><strong>Right to Non-Discrimination:</strong> You will not be discriminated against for exercising your privacy rights.</li>
                          <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information.</li>
                          <li><strong>Right to Limit Use of Sensitive Personal Information:</strong> We do not use sensitive personal information
                          beyond what is necessary for our services.</li>
                        </ul>
                        <p className="text-sm text-muted-foreground mt-3 italic">
                          Do Not Sell My Personal Information: We do not sell, share, or rent your personal information to third parties for
                          monetary or other valuable consideration.
                        </p>
                      </div>

                      {/* PIPEDA Rights */}
                      <div className="border-l-4 border-chart-3 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">8.3 Rights Under Canadian PIPEDA</h3>
                        <p className="text-muted-foreground leading-relaxed mb-3">
                          If you are a Canadian resident, you have the following rights:
                        </p>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          <li><strong>Right to Access:</strong> Request access to your personal information.</li>
                          <li><strong>Right to Correction:</strong> Request correction of inaccurate information.</li>
                          <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data collection and use.</li>
                          <li><strong>Right to File a Complaint:</strong> File a complaint with the Office of the Privacy Commissioner of Canada.</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg mt-6">
                      <h4 className="font-semibold text-foreground mb-3">How to Exercise Your Rights</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        To exercise any of your privacy rights, please contact us at:
                      </p>
                      <ul className="space-y-1 text-muted-foreground text-sm">
                        <li>Email: <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline font-medium">dariasikora@yahoo.pl</a></li>
                        <li>Or use your account settings to update or delete your information</li>
                      </ul>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-3">
                        We will respond to your request within 30 days (or as required by applicable law). We may need to verify your identity
                        before processing your request.
                      </p>
                    </div>
                  </section>

                  {/* Security */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We implement appropriate technical and organizational measures to protect your personal information against unauthorized access,
                      alteration, disclosure, or destruction:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li><strong>Encryption:</strong> All data transmitted between your browser and our Website is encrypted using TLS/SSL.</li>
                      <li><strong>Secure Authentication:</strong> Passwords are hashed and encrypted using industry-standard algorithms (Better-auth).</li>
                      <li><strong>Payment Security:</strong> Payment card information is processed securely by Stripe (PCI DSS Level 1 certified) and
                      never stored on our servers.</li>
                      <li><strong>Access Controls:</strong> Access to personal data is restricted to authorized personnel only.</li>
                      <li><strong>Regular Security Audits:</strong> We regularly review and update our security practices.</li>
                      <li><strong>DDoS Protection:</strong> Cloudflare provides protection against distributed denial-of-service attacks.</li>
                      <li><strong>Error Monitoring:</strong> Sentry helps us identify and fix security vulnerabilities.</li>
                    </ul>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      While we strive to protect your personal information, no method of transmission over the internet or electronic storage is
                      100% secure. We cannot guarantee absolute security, but we are committed to protecting your data to the best of our ability.
                    </p>
                  </section>

                  {/* Children's Privacy */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">10. Children's Privacy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our Website is not intended for children under the age of 16. We do not knowingly collect personal information from children
                      under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us
                      at <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a>, and we will delete
                      such information from our systems.
                    </p>
                  </section>

                  {/* Cookies */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">11. Cookies and Tracking Technologies</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We use cookies and similar tracking technologies to enhance your experience on our Website. For detailed information about
                      the cookies we use and how to manage them, please read our <Link href="/cookies" className="text-primary hover:underline font-medium">Cookie Policy</Link>.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We operate on a strict opt-in consent model for non-essential cookies. Analytics and functional cookies are only activated
                      after you provide explicit consent through our cookie banner.
                    </p>
                  </section>

                  {/* Third-Party Links */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">12. Third-Party Links</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Our Website may contain links to third-party websites (such as social media platforms or video hosting services). We are not
                      responsible for the privacy practices of these external sites. We encourage you to read the privacy policies of any third-party
                      websites you visit.
                    </p>
                  </section>

                  {/* Marketing Communications */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">13. Marketing Communications</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We currently do not send marketing emails. We only send transactional emails related to your orders and account (order
                      confirmations, shipping notifications, password resets, etc.).
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      If we introduce marketing communications in the future, we will only send them with your explicit opt-in consent, and you
                      will be able to unsubscribe at any time.
                    </p>
                  </section>

                  {/* Changes to Privacy Policy */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">14. Changes to This Privacy Policy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or
                      other factors. We will notify you of any material changes by posting the updated Privacy Policy on this page and updating the
                      "Last updated" date. For significant changes, we may also send you an email notification. We encourage you to review this
                      Privacy Policy periodically to stay informed about how we protect your information.
                    </p>
                  </section>

                  {/* Contact Information */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">15. Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                    </p>
                    <div className="bg-muted/30 p-6 rounded-lg space-y-2">
                      <p className="text-foreground"><strong>Daria Sikora</strong></p>
                      <p className="text-muted-foreground">Stefana Starzyńskiego 2/83</p>
                      <p className="text-muted-foreground">35-508 Rzeszów, Podkarpackie, Poland</p>
                      <p className="text-muted-foreground">NIP (Tax ID): 8131627011</p>
                      <p className="text-muted-foreground">Email: <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">dariasikora@yahoo.pl</a></p>
                      <p className="text-muted-foreground">Phone: <a href="tel:+48501083574" className="text-primary hover:underline">+48 501 083 574</a></p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      <strong>EU Data Protection Authority:</strong> If you are in the EU and have concerns about our data practices, you can
                      contact the Polish data protection authority (UODO - Urząd Ochrony Danych Osobowych) or your local supervisory authority.
                    </p>
                  </section>

                  {/* Supervisory Authorities */}
                  <section className="border-t border-border pt-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">16. Supervisory Authorities</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      If you believe we have not adequately addressed your privacy concerns, you have the right to lodge a complaint with the
                      relevant supervisory authority:
                    </p>
                    <div className="space-y-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <p className="font-semibold text-foreground mb-2">EU/Poland (GDPR):</p>
                        <p className="text-muted-foreground text-sm">
                          Urząd Ochrony Danych Osobowych (UODO)<br />
                          <a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://uodo.gov.pl</a>
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <p className="font-semibold text-foreground mb-2">UK (UK GDPR):</p>
                        <p className="text-muted-foreground text-sm">
                          Information Commissioner's Office (ICO)<br />
                          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://ico.org.uk</a>
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <p className="font-semibold text-foreground mb-2">Canada (PIPEDA):</p>
                        <p className="text-muted-foreground text-sm">
                          Office of the Privacy Commissioner of Canada<br />
                          <a href="https://www.priv.gc.ca" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.priv.gc.ca</a>
                        </p>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <p className="font-semibold text-foreground mb-2">California (CCPA):</p>
                        <p className="text-muted-foreground text-sm">
                          California Attorney General - Privacy Enforcement<br />
                          <a href="https://oag.ca.gov/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://oag.ca.gov/privacy</a>
                        </p>
                      </div>
                    </div>
                  </section>
                </div>
              </CardContent>
            </Card>

            {/* Related Pages */}
            <div className="mt-8 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Related Policies</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/cookies" className="text-primary hover:underline">
                  Cookie Policy
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
