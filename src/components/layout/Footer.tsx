import { Link } from 'react-router-dom';
import { ChevronUp, Instagram, Youtube, Linkedin, Mail, Shield, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
  const footerLinks = {
    products: [
      { name: 'Recovery Peptides', href: '#' },
      { name: 'Performance Stack', href: '#' },
      { name: 'Cognitive Enhancers', href: '#' },
      { name: 'Longevity Research', href: '#' },
      { name: 'Bundle Deals', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Science', href: '#' },
      { name: 'Lab Testing', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
    ],
    support: [
      { name: 'FAQ', href: '#' },
      { name: 'Shipping Info', href: '#' },
      { name: 'Returns', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'COA Request', href: '#' },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <span className="font-display text-2xl font-bold tracking-tight">
                ASCEND
              </span>
              <span className="font-display text-2xl font-bold text-accent">
                RX
              </span>
              <ChevronUp className="w-4 h-4 text-accent -ml-1 -mt-3" />
            </Link>
            <p className="text-primary-foreground/70 mb-8 max-w-sm leading-relaxed">
              Elevating human potential through pharmaceutical-grade peptide solutions. 
              Backed by science. Trusted by researchers.
            </p>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-display font-semibold">Join Our Research Updates</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent"
                />
                <Button className="btn-glow shrink-0 px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display font-semibold mb-6">Products</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <Shield className="w-5 h-5" />
                <span className="text-sm">SSL Secured</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/70">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm">Secure Payments</span>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-primary-foreground/50 text-sm">
              © 2024 AscendRX Peptides. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
