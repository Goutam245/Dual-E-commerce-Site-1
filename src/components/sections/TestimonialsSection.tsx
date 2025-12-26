import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: 'Dr. Marcus Chen',
    age: 42,
    location: 'San Francisco, CA',
    role: 'Sports Medicine Physician',
    image: '/placeholder.svg',
    quote: 'The purity and consistency of AscendRX peptides have made them my go-to recommendation for research-focused athletes. The COAs are impeccable.',
    result: 'Enhanced recovery protocols',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Mitchell',
    age: 38,
    location: 'Austin, TX',
    role: 'Biohacker & Entrepreneur',
    image: '/placeholder.svg',
    quote: 'After trying numerous suppliers, AscendRX stands out for their scientific approach and transparent testing. The difference in quality is noticeable.',
    result: 'Optimized wellness stack',
    rating: 5,
  },
  {
    id: 3,
    name: 'James Rodriguez',
    age: 45,
    location: 'Miami, FL',
    role: 'Former Pro Athlete',
    image: '/placeholder.svg',
    quote: 'The customer education and support team at AscendRX helped me understand the science behind each compound. That transparency builds trust.',
    result: 'Maintained peak performance',
    rating: 5,
  },
  {
    id: 4,
    name: 'Dr. Emily Watson',
    age: 51,
    location: 'Boston, MA',
    role: 'Research Scientist',
    image: '/placeholder.svg',
    quote: 'For our laboratory studies, we require the highest purity standards. AscendRX consistently delivers research-grade quality with proper documentation.',
    result: 'Reliable research results',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
        <Quote className="w-full h-full text-primary" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Trusted by <span className="text-gradient">Professionals</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hear from researchers, physicians, and biohackers who trust AscendRX
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-3xl p-8 md:p-12 shadow-card border border-border/50">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 w-16 h-16 text-accent/20">
              <Quote className="w-full h-full" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <span className="font-display text-3xl font-bold text-accent">
                    {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                {/* Rating */}
                <div className="flex items-center justify-center md:justify-start gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-5 h-5',
                        i < currentTestimonial.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-border'
                      )}
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">
                    {currentTestimonial.name}, {currentTestimonial.age}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {currentTestimonial.role} • {currentTestimonial.location}
                  </p>
                  <p className="text-accent text-sm font-medium">
                    {currentTestimonial.result}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full border-border hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-300',
                      index === currentIndex
                        ? 'bg-accent w-6'
                        : 'bg-border hover:bg-muted-foreground'
                    )}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full border-border hover:border-accent hover:text-accent"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
