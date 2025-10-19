'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    // In a real application, you would send this to an API endpoint
    try {
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, we'll just create a mailto link as a fallback
      const mailtoLink = `mailto:dariasikora@yahoo.pl?subject=${encodeURIComponent(
        formData.subject || 'Contact Form Submission'
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <BreadcrumbPage>Contact</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 tracking-tight">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground mb-8 sm:mb-12">
              Have a question or want to learn more about our handmade primitive dolls? We'd love to hear from you!
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>

                    {submitStatus === 'success' && (
                      <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                        <p className="text-foreground font-medium">Thank you for your message!</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          We'll get back to you as soon as possible, typically within 24 hours.
                        </p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <p className="text-foreground font-medium">Oops! Something went wrong.</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Please try again or email us directly at{' '}
                          <a href="mailto:dariasikora@yahoo.pl" className="text-primary hover:underline">
                            dariasikora@yahoo.pl
                          </a>
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          placeholder="What is your message about?"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">
                          Message <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us how we can help you..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="min-h-32"
                        />
                      </div>

                      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
                        <Send className="mr-2 h-4 w-4" />
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </Button>

                      <p className="text-sm text-muted-foreground mt-4">
                        By submitting this form, you agree to our{' '}
                        <Link href="/privacy-policy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Business Info */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Email</p>
                          <a
                            href="mailto:dariasikora@yahoo.pl"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            dariasikora@yahoo.pl
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Phone</p>
                          <a
                            href="tel:+48501083574"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            +48 501 083 574
                          </a>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Address</p>
                          <p className="text-sm text-muted-foreground">
                            Stefana Starzyńskiego 2/83
                            <br />
                            35-508 Rzeszów
                            <br />
                            Poland
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-foreground">Business Hours</p>
                          <p className="text-sm text-muted-foreground">
                            Monday - Friday
                            <br />
                            9:00 AM - 5:00 PM (CET)
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            We typically respond within 24 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social Media */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Follow Us</h3>
                    <div className="space-y-3">
                      <a
                        href="https://www.facebook.com/MyPrimitiveDolls/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors group"
                      >
                        <Facebook className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            Facebook
                          </p>
                          <p className="text-xs text-muted-foreground">@MyPrimitiveDolls</p>
                        </div>
                      </a>

                      <a
                        href="https://www.instagram.com/myprimitivedolls/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors group"
                      >
                        <Instagram className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                            Instagram
                          </p>
                          <p className="text-xs text-muted-foreground">@myprimitivedolls</p>
                        </div>
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
                    <div className="space-y-2">
                      <Link
                        href="/faq"
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Frequently Asked Questions
                      </Link>
                      <Link
                        href="/shipping"
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Shipping Policy
                      </Link>
                      <Link
                        href="/returns"
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Returns & Refunds
                      </Link>
                      <Link
                        href="/terms"
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Terms of Service
                      </Link>
                      <Link
                        href="/privacy-policy"
                        className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        Privacy Policy
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Map/Additional Info */}
            <div className="mt-8">
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">About Our Workshop</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        Our handmade primitive dolls are created in Rzeszów, Poland, where each piece is carefully crafted
                        with attention to detail and a passion for traditional folk art. Every doll is a unique creation,
                        made with love and dedication to preserving the timeless art of primitive dollmaking.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Whether you have questions about a specific product, need help with an order, or want to learn more
                        about our craft, we're here to help. Don't hesitate to reach out!
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-4">Common Inquiries</h3>
                      <ul className="space-y-3">
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-muted-foreground text-sm">
                            <strong className="text-foreground">Product Questions:</strong> Materials, sizes, customization
                            options
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-muted-foreground text-sm">
                            <strong className="text-foreground">Order Support:</strong> Order status, tracking, modifications
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-muted-foreground text-sm">
                            <strong className="text-foreground">Shipping & Delivery:</strong> International shipping, customs,
                            delivery times
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-muted-foreground text-sm">
                            <strong className="text-foreground">Returns & Exchanges:</strong> Return process, refunds, warranties
                          </span>
                        </li>
                        <li className="flex gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-muted-foreground text-sm">
                            <strong className="text-foreground">Wholesale Inquiries:</strong> Bulk orders, retailer partnerships
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
