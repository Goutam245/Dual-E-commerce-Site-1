import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, FlaskConical, FileCheck } from 'lucide-react';
import heroBackground from '@/assets/hero-background.jpg';
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Hexagon */}
        <div className="absolute top-[20%] left-[10%] w-32 h-32 opacity-20 animate-float">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50 1 95 25 95 75 50 99 5 75 5 25"
              fill="none"
              stroke="hsl(187 100% 50%)"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* DNA Helix */}
        <div className="absolute top-[30%] right-[15%] w-24 h-48 opacity-30 animate-float" style={{ animationDelay: '-2s' }}>
          <svg viewBox="0 0 50 100" className="w-full h-full">
            <path
              d="M25 0 Q45 25 25 50 Q5 75 25 100"
              fill="none"
              stroke="hsl(187 100% 50%)"
              strokeWidth="1"
            />
            <path
              d="M25 0 Q5 25 25 50 Q45 75 25 100"
              fill="none"
              stroke="hsl(187 100% 50%)"
              strokeWidth="1"
            />
            {[0, 20, 40, 60, 80].map((y) => (
              <line key={y} x1="10" y1={y + 10} x2="40" y2={y + 10} stroke="hsl(187 100% 50% / 0.5)" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        {/* Circle */}
        <div className="absolute bottom-[20%] left-[20%] w-40 h-40 opacity-15 animate-float" style={{ animationDelay: '-4s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(187 100% 50%)" strokeWidth="1" />
            <circle cx="50" cy="50" r="30" fill="none" stroke="hsl(187 100% 50%)" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Molecule */}
        <div className="absolute bottom-[30%] right-[10%] w-36 h-36 opacity-25 animate-float" style={{ animationDelay: '-1s' }}>
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="30" r="8" fill="hsl(187 100% 50%)" opacity="0.6" />
            <circle cx="25" cy="70" r="6" fill="hsl(187 100% 50%)" opacity="0.4" />
            <circle cx="75" cy="70" r="6" fill="hsl(187 100% 50%)" opacity="0.4" />
            <line x1="50" y1="30" x2="25" y2="70" stroke="hsl(187 100% 50%)" strokeWidth="1" opacity="0.5" />
            <line x1="50" y1="30" x2="75" y2="70" stroke="hsl(187 100% 50%)" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 opacity-0 animate-fade-in-up">
            Elevate Your{' '}
            <span className="relative inline-block">
              Biology
              <span className="absolute bottom-2 left-0 w-full h-1 bg-accent/50 rounded-full" />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Pharmaceutical-Grade Peptides. Scientific Precision. Transformative Results.
          </p>

          {/* CTA Button */}
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Button
              size="lg"
              className="btn-glow text-lg px-10 py-6 rounded-full font-semibold text-primary-foreground"
            >
              Explore Solutions
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-16 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium">FDA Registered Facility</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium">3rd Party Tested</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/70">
              <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium">COA Available</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
