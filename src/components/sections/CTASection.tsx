import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-24 bg-muted/50 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Elevate Your Research?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Join thousands of researchers and biohackers who trust AscendRX for 
            pharmaceutical-grade peptides with uncompromising quality.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="btn-glow rounded-full text-lg px-8 text-primary-foreground"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-lg px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              View Research Library
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
