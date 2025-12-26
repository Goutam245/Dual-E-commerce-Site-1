import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { faqData } from '@/data/products';
import { toast } from '@/hooks/use-toast';
import officeImage from '@/assets/office.jpg';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: 'Message Sent!',
      description: 'We\'ll get back to you within 24 hours.',
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'support@ascendrx.com',
      description: 'We respond within 24 hours',
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (888) 555-0123',
      description: 'Mon-Fri 9AM-6PM EST',
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: '123 Research Blvd, Suite 400',
      description: 'San Diego, CA 92101',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      value: 'Monday - Friday',
      description: '9:00 AM - 6:00 PM EST',
    },
  ];

  const supportCategories = [
    {
      icon: Package,
      title: 'Order Support',
      description: 'Track orders, shipping inquiries, and delivery issues.',
    },
    {
      icon: HelpCircle,
      title: 'Product Questions',
      description: 'Technical specs, usage guidelines, and recommendations.',
    },
    {
      icon: MessageSquare,
      title: 'General Inquiries',
      description: 'Partnerships, wholesale, and other business matters.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-primary">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <Badge className="bg-accent/20 text-accent mb-6">Get in Touch</Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              We're Here to Help
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              Have questions about our products, need support with an order, or want to learn more 
              about peptide research? Our team is ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                className="bg-card rounded-xl p-6 shadow-card border border-border/50 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                <p className="text-foreground font-medium">{method.value}</p>
                <p className="text-muted-foreground text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="btn-glow w-full sm:w-auto text-primary-foreground"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>

              {/* Support Categories */}
              <div className="mt-12 pt-12 border-t border-border">
                <h3 className="font-display text-xl font-semibold text-foreground mb-6">Support Categories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {supportCategories.map((category) => (
                    <div key={category.title} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                      <category.icon className="w-6 h-6 text-accent mb-2" />
                      <h4 className="font-medium text-foreground text-sm">{category.title}</h4>
                      <p className="text-muted-foreground text-xs mt-1">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mb-8">
                Find quick answers to common questions about our products and services.
              </p>

              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Office Image */}
              <div className="mt-12">
                <img
                  src={officeImage}
                  alt="AscendRX Office"
                  className="rounded-xl shadow-lg w-full"
                />
                <p className="text-muted-foreground text-sm mt-4 text-center">
                  Our headquarters in San Diego, California
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
