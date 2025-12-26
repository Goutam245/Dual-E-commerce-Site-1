import { FlaskConical, Award, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: FlaskConical,
    title: '99%+ Purity',
    description: 'Every batch undergoes rigorous HPLC testing to ensure pharmaceutical-grade purity. Our commitment to excellence means you receive only the highest quality peptides.',
  },
  {
    icon: Award,
    title: 'Batch Tested',
    description: 'Independent third-party laboratories verify each production batch. Certificates of Analysis are available for every product we offer.',
  },
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Temperature-controlled packaging ensures peptide integrity during transit. Most orders ship within 24 hours with tracked delivery nationwide.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient">AscendRX</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Uncompromising quality standards meet cutting-edge peptide science
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                'group bg-card rounded-2xl p-8 card-lift border border-border/50',
                'opacity-0 animate-fade-in-up'
              )}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Decorative Line */}
              <div className="mt-6 h-1 w-12 bg-accent/30 rounded-full group-hover:w-20 group-hover:bg-accent transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
