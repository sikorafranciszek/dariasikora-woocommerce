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
  title: 'Accessibility Statement - My Primitive Dolls',
  description: 'Our commitment to web accessibility and WCAG 2.1 Level AA compliance at dariasikora.pl',
};

export default function AccessibilityPage() {
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
                <BreadcrumbPage>Accessibility Statement</BreadcrumbPage>
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
              Accessibility Statement
            </h1>
            <p className="text-lg text-muted-foreground mb-8 sm:mb-12">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <Card className="mb-8">
              <CardContent className="p-6 sm:p-8 prose prose-gray max-w-none">
                <div className="space-y-8">
                  {/* Introduction */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">1. Our Commitment to Accessibility</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      <strong>Daria Sikora</strong> ("we", "us", or "our") is committed to ensuring digital accessibility for people
                      with disabilities. We are continually improving the user experience for everyone and applying the relevant
                      accessibility standards to ensure we provide equal access to all of our users.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We believe that everyone should be able to browse our website, learn about our handmade primitive dolls, and
                      make purchases independently, regardless of ability or technology used.
                    </p>
                  </section>

                  {/* Conformance Status */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Conformance Status</h2>

                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg mb-6">
                      <h3 className="text-lg font-semibold text-foreground mb-3">WCAG 2.1 Level AA Compliance</h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        We are committed to conforming to the{' '}
                        <a
                          href="https://www.w3.org/WAI/WCAG21/quickref/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Web Content Accessibility Guidelines (WCAG) 2.1
                        </a>{' '}
                        at <strong>Level AA</strong>. These guidelines explain how to make web content more accessible for people with
                        disabilities and improve the user experience for all users.
                      </p>
                      <p className="text-sm text-muted-foreground italic">
                        WCAG 2.1 Level AA compliance means our website is designed to be perceivable, operable, understandable, and
                        robust for all users, including those using assistive technologies.
                      </p>
                    </div>

                    <div className="border-l-4 border-chart-2 pl-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        We are actively working to achieve and maintain full WCAG 2.1 Level AA conformance. While we strive for full
                        compliance, we acknowledge that some content may not yet meet all accessibility standards. We are committed to
                        addressing these issues and improving accessibility on an ongoing basis.
                      </p>
                    </div>
                  </section>

                  {/* Accessibility Features */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. Accessibility Features of Our Website</h2>

                    <div className="space-y-6">
                      <div className="border-l-4 border-primary pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.1 Keyboard Navigation</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                          <li>All interactive elements are accessible via keyboard (Tab, Enter, Space, Arrow keys)</li>
                          <li>Logical tab order throughout the website</li>
                          <li>Visible focus indicators for keyboard navigation</li>
                          <li>Skip-to-content links for efficient navigation</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-chart-2 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.2 Screen Reader Compatibility</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                          <li>Semantic HTML5 structure for proper content hierarchy</li>
                          <li>ARIA (Accessible Rich Internet Applications) landmarks and labels</li>
                          <li>Descriptive alt text for all meaningful images</li>
                          <li>Proper heading structure (H1-H6) for document outline</li>
                          <li>Form labels and error messages clearly associated with inputs</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-chart-3 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.3 Visual Accessibility</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                          <li>Sufficient color contrast ratios (WCAG AA standards: 4.5:1 for normal text, 3:1 for large text)</li>
                          <li>Text resizing support up to 200% without loss of content or functionality</li>
                          <li>Responsive design that adapts to different screen sizes and zoom levels</li>
                          <li>Information conveyed without relying solely on color</li>
                          <li>Clear, readable typography with adequate spacing</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-chart-4 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.4 Content Accessibility</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                          <li>Clear, simple language throughout the website</li>
                          <li>Descriptive page titles and headings</li>
                          <li>Descriptive link text (avoiding generic "click here" links)</li>
                          <li>Consistent navigation across all pages</li>
                          <li>Error messages with clear instructions for correction</li>
                        </ul>
                      </div>

                      <div className="border-l-4 border-chart-5 pl-4">
                        <h3 className="text-xl font-semibold text-foreground mb-3">3.5 Multimedia Accessibility</h3>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                          <li>Video players with accessible controls</li>
                          <li>Pause, stop, and hide functionality for moving content</li>
                          <li>Alternative text descriptions for visual content</li>
                        </ul>
                      </div>
                    </div>
                  </section>

                  {/* Compatible Technologies */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">4. Compatible Assistive Technologies</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our website is designed to be compatible with the following assistive technologies:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">Screen Readers</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• JAWS (Job Access With Speech)</li>
                          <li>• NVDA (NonVisual Desktop Access)</li>
                          <li>• VoiceOver (macOS, iOS)</li>
                          <li>• TalkBack (Android)</li>
                          <li>• Narrator (Windows)</li>
                        </ul>
                      </div>

                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">Other Tools</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          <li>• Speech recognition software</li>
                          <li>• Screen magnification software</li>
                          <li>• Browser zoom functions</li>
                          <li>• High contrast modes</li>
                          <li>• Keyboard-only navigation</li>
                        </ul>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      We test our website with a variety of assistive technologies to ensure compatibility. However, if you encounter
                      any issues using specific tools, please let us know.
                    </p>
                  </section>

                  {/* Browser Compatibility */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">5. Supported Browsers and Platforms</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our website is designed to work with the latest versions of major web browsers:
                    </p>

                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-border rounded-lg">
                        <thead className="bg-muted">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                              Browser
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                              Supported Versions
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground border-b border-border">
                              Platform
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Google Chrome</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Latest 2 versions</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Windows, macOS, Linux, Android, iOS</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Mozilla Firefox</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Latest 2 versions</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Windows, macOS, Linux, Android</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Apple Safari</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Latest 2 versions</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">macOS, iOS</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">Microsoft Edge</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Latest 2 versions</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">Windows, macOS</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="text-sm text-muted-foreground mt-4 italic">
                      For the best accessibility experience, we recommend using the latest version of your preferred browser with
                      assistive technologies up to date.
                    </p>
                  </section>

                  {/* Known Limitations */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">6. Known Limitations and Ongoing Improvements</h2>

                    <div className="bg-muted/30 p-6 rounded-lg mb-4">
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        We are committed to continuous improvement of our website's accessibility. While we work toward full WCAG 2.1
                        Level AA compliance, we acknowledge the following known limitations:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground text-sm">
                        <li>
                          <strong className="text-foreground">Third-party integrations:</strong> Some third-party services (payment
                          processor, video player) may have their own accessibility limitations beyond our control. We choose vendors
                          that prioritize accessibility and work with them to improve.
                        </li>
                        <li>
                          <strong className="text-foreground">Legacy content:</strong> Some older images or content may not have
                          complete alt text descriptions. We are actively reviewing and updating this content.
                        </li>
                        <li>
                          <strong className="text-foreground">Complex interactions:</strong> Some interactive features may require
                          additional keyboard shortcuts or screen reader commands. We provide documentation where applicable.
                        </li>
                      </ul>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        We regularly audit our website for accessibility issues and prioritize fixes based on impact. If you encounter
                        any accessibility barriers, please report them to us (see section 8 below).
                      </p>
                    </div>
                  </section>

                  {/* Technical Specifications */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">7. Technical Specifications</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our website's accessibility relies on the following technologies:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li><strong className="text-foreground">HTML5:</strong> Semantic markup for proper structure</li>
                      <li>
                        <strong className="text-foreground">CSS3:</strong> Modern styling with responsive design and sufficient contrast
                      </li>
                      <li>
                        <strong className="text-foreground">JavaScript/TypeScript:</strong> Progressive enhancement, accessible
                        interactive components
                      </li>
                      <li>
                        <strong className="text-foreground">ARIA (Accessible Rich Internet Applications):</strong> Enhanced semantics
                        for assistive technologies
                      </li>
                      <li><strong className="text-foreground">Next.js:</strong> React framework with accessibility features built-in</li>
                      <li>
                        <strong className="text-foreground">Radix UI:</strong> Accessible component primitives following WAI-ARIA
                        standards
                      </li>
                    </ul>
                  </section>

                  {/* Feedback and Contact */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">8. Accessibility Feedback and Contact</h2>

                    <div className="bg-primary/10 border border-primary/20 p-6 rounded-lg mb-4">
                      <h3 className="text-lg font-semibold text-foreground mb-3">We Welcome Your Feedback</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        We are always looking to improve the accessibility of our website. If you encounter any accessibility barriers
                        or have suggestions for improvement, please contact us:
                      </p>

                      <div className="bg-background/50 p-4 rounded-lg space-y-2">
                        <p className="text-foreground">
                          <strong>Accessibility Contact:</strong>
                        </p>
                        <p className="text-muted-foreground">
                          Email:{' '}
                          <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">
                            dariasikora@yahoo.pl
                          </a>
                        </p>
                        <p className="text-muted-foreground">Subject: "Accessibility Issue - dariasikora.pl"</p>
                      </div>

                      <p className="text-sm text-muted-foreground mt-4">
                        When reporting an accessibility issue, please include:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground mt-2">
                        <li>The page or feature where you encountered the issue</li>
                        <li>A description of the problem</li>
                        <li>The assistive technology or browser you were using</li>
                        <li>Your operating system</li>
                      </ul>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      We will respond to accessibility feedback within <strong>3 business days</strong> and work to resolve reported
                      issues as quickly as possible based on severity and impact.
                    </p>
                  </section>

                  {/* Complaints and Enforcement */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">9. Formal Complaints and Enforcement</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We are committed to resolving accessibility issues promptly and fairly. If you are not satisfied with our
                      response to an accessibility complaint, you have the right to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>
                        <strong className="text-foreground">EU/UK:</strong> File a complaint with your national accessibility
                        enforcement body
                      </li>
                      <li>
                        <strong className="text-foreground">USA:</strong> File a complaint with the U.S. Department of Justice (ADA
                        enforcement) or pursue legal remedies under the Americans with Disabilities Act
                      </li>
                      <li>
                        <strong className="text-foreground">Canada:</strong> Contact the Canadian Human Rights Commission
                      </li>
                    </ul>
                  </section>

                  {/* Ongoing Commitment */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">10. Our Ongoing Commitment</h2>

                    <div className="border-l-4 border-primary pl-4 mb-4">
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        Accessibility is not a one-time project but an ongoing commitment. We continuously:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Monitor and test our website with automated and manual accessibility tools</li>
                        <li>Conduct regular accessibility audits and user testing with people who use assistive technologies</li>
                        <li>Train our team on accessibility best practices and inclusive design</li>
                        <li>Incorporate accessibility requirements into our development workflow</li>
                        <li>Stay informed about evolving accessibility standards and guidelines</li>
                        <li>Prioritize accessibility fixes and improvements in our development roadmap</li>
                      </ul>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      We believe that digital accessibility is a fundamental right and are committed to making our website usable by
                      as many people as possible, regardless of circumstance or ability.
                    </p>
                  </section>

                  {/* Updates to Statement */}
                  <section>
                    <h2 className="text-2xl font-bold text-foreground mb-4">11. Updates to This Statement</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      This Accessibility Statement was last updated on{' '}
                      {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}. We will review and
                      update this statement regularly to reflect improvements and changes to our website's accessibility features.
                    </p>
                  </section>

                  {/* Standards and References */}
                  <section className="border-t border-border pt-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">12. Standards and References</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our accessibility efforts are guided by the following standards and resources:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>
                        <a
                          href="https://www.w3.org/WAI/WCAG21/quickref/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Web Content Accessibility Guidelines (WCAG) 2.1
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.w3.org/WAI/standards-guidelines/aria/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          WAI-ARIA (Accessible Rich Internet Applications)
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.ada.gov/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Americans with Disabilities Act (ADA)
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://digital-strategy.ec.europa.eu/en/policies/web-accessibility"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          EU Web Accessibility Directive (Directive 2016/2102)
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.legislation.gov.uk/uksi/2018/852/contents/made"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          UK Public Sector Bodies Accessibility Regulations 2018
                        </a>
                      </li>
                    </ul>
                  </section>
                </div>
              </CardContent>
            </Card>

            {/* Related Pages */}
            <div className="mt-8 p-6 bg-muted/30 rounded-lg">
              <h3 className="text-lg font-semibold text-foreground mb-4">Related Information</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/privacy-policy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>
                <Link href="/contact" className="text-primary hover:underline">
                  Contact Us
                </Link>
                <Link href="/faq" className="text-primary hover:underline">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
