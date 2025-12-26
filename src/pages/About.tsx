import { Link } from 'react-router-dom';
import { ChevronRight, Target, Eye, Award, Users, Building, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import teamImage from '@/assets/team.jpg';
import officeImage from '@/assets/office.jpg';
import scienceLabImage from '@/assets/science-lab.jpg';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'Every molecule matters. We maintain pharmaceutical-grade standards across all operations.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Full documentation, third-party testing, and open access to all certificates of analysis.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Continuous improvement in our synthesis methods, quality control, and customer experience.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Supporting researchers, biohackers, and wellness professionals with education and resources.',
    },
  ];

  const milestones = [
    { year: '2009', title: 'Founded', description: 'Started with a mission to provide research-grade peptides.' },
    { year: '2012', title: 'FDA Registered', description: 'Achieved FDA facility registration for quality assurance.' },
    { year: '2016', title: '10K Customers', description: 'Reached milestone of serving 10,000 researchers worldwide.' },
    { year: '2019', title: 'New Facility', description: 'Opened state-of-the-art synthesis and testing laboratory.' },
    { year: '2022', title: 'Global Expansion', description: 'Extended shipping to 50+ countries with temperature control.' },
    { year: '2024', title: 'Innovation Award', description: 'Recognized for excellence in peptide synthesis technology.' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-primary">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl">
            <Badge className="bg-accent/20 text-accent mb-6">Our Story</Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Elevating Human Potential Through Science
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed">
              AscendRX was founded on a simple belief: everyone deserves access to pharmaceutical-grade 
              research compounds. We bridge the gap between cutting-edge science and practical application.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img
                src={teamImage}
                alt="AscendRX Team"
                className="rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To democratize access to pharmaceutical-grade peptides while maintaining uncompromising 
                  quality standards. We believe that researchers, biohackers, and wellness professionals 
                  deserve reliable, pure compounds backed by transparent testing and documentation.
                </p>
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  A world where peptide science is accessible, understood, and utilized to enhance human 
                  health and performance. We envision being the global leader in research peptide quality 
                  and customer education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Values</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our core values guide every decision, from synthesis to shipping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="bg-card rounded-2xl p-8 card-lift border border-border/50 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Badge variant="secondary" className="mb-4">Our Facility</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                State-of-the-Art Laboratory
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our FDA-registered facility houses cutting-edge synthesis and analytical equipment. 
                We maintain cleanroom environments, temperature-controlled storage, and rigorous 
                contamination prevention protocols.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Building className="w-6 h-6 text-accent" />
                  <span className="font-medium">FDA Registered</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-accent" />
                  <span className="font-medium">ISO Certified</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-accent" />
                  <span className="font-medium">Global Shipping</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-accent" />
                  <span className="font-medium">Expert Team</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={scienceLabImage}
                alt="AscendRX Laboratory"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Journey</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Milestones Along the Way
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative flex items-center gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/50 ml-8 md:ml-0">
                      <span className="text-accent font-display text-2xl font-bold">{milestone.year}</span>
                      <h3 className="font-semibold text-foreground mt-1">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm mt-2">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-accent rounded-full md:-translate-x-1/2 ring-4 ring-background" />
                  
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Join Thousands of Researchers
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Experience the AscendRX difference. Pharmaceutical-grade quality, transparent testing, 
            and exceptional customer support.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="btn-glow text-primary-foreground">
              <Link to="/shop">
                Explore Products
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
