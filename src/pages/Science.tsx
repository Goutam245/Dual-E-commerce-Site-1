import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, FileText, BookOpen, Download, ExternalLink, ChevronRight, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { researchStudies, categories } from '@/data/products';
import { cn } from '@/lib/utils';
import scienceLabImage from '@/assets/science-lab.jpg';
import scientistImage from '@/assets/scientist.jpg';

export default function Science() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudies = researchStudies.filter(study => {
    const matchesCategory = activeCategory === 'All' || study.category === activeCategory;
    const matchesSearch = !searchQuery || 
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.authors.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={scienceLabImage}
            alt="Research Laboratory"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl py-16">
            <Badge className="bg-accent/20 text-accent mb-6">Research & Development</Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Backed by Science
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-8">
              Our commitment to scientific excellence drives everything we do. Explore the research 
              behind peptide science and understand the mechanisms that make our products effective.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="btn-glow text-primary-foreground">
                <BookOpen className="w-5 h-5 mr-2" />
                Browse Research Library
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Download className="w-5 h-5 mr-2" />
                Download Research Guides
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Research Stats */}
      <section className="py-16 bg-muted/50 -mt-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '50+', label: 'Published Studies' },
              { value: '99%+', label: 'Purity Standard' },
              { value: '10K+', label: 'Researchers Served' },
              { value: '15', label: 'Years Experience' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="font-display text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Ensure Quality */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Our Process</Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Pharmaceutical-Grade Quality Control
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Every peptide we produce undergoes rigorous testing at multiple stages. Our multi-step 
                quality assurance process ensures you receive products that meet the highest standards 
                for research applications.
              </p>
              <div className="space-y-6">
                {[
                  {
                    step: '01',
                    title: 'Raw Material Verification',
                    description: 'All starting materials are verified for identity and purity before synthesis begins.',
                  },
                  {
                    step: '02',
                    title: 'HPLC Purity Testing',
                    description: 'High-performance liquid chromatography confirms ≥99% purity for each batch.',
                  },
                  {
                    step: '03',
                    title: 'Mass Spectrometry',
                    description: 'Molecular weight verification ensures correct peptide sequence synthesis.',
                  },
                  {
                    step: '04',
                    title: 'Third-Party Validation',
                    description: 'Independent laboratories verify our results for complete transparency.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <span className="font-display text-2xl font-bold text-accent">{item.step}</span>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={scientistImage}
                alt="Scientist examining peptide"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-8 -left-8 bg-card rounded-xl p-6 shadow-lg border border-border max-w-xs">
                <p className="text-accent font-display text-3xl font-bold mb-1">100%</p>
                <p className="text-foreground font-medium">Batch Testing Rate</p>
                <p className="text-muted-foreground text-sm">Every single batch tested before release</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Library */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Research Library</Badge>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore Peptide Research
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Access peer-reviewed studies and research papers on peptide science and applications.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Recovery', 'Performance', 'Cognitive', 'Wellness', 'Longevity'].map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'rounded-full',
                    activeCategory === cat && 'bg-accent text-accent-foreground'
                  )}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudies.map((study, index) => (
              <Card key={study.id} className="card-lift opacity-0 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">{study.category}</Badge>
                  <CardTitle className="text-lg leading-snug">{study.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{study.abstract}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{study.authors}</span>
                    <span className="text-muted-foreground">{study.year}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">{study.citations} citations</span>
                    <Button variant="ghost" size="sm" className="text-accent">
                      Read More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudies.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No studies found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Research?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Access our complete catalog of pharmaceutical-grade peptides with full documentation and COAs.
          </p>
          <Button asChild size="lg" className="btn-glow text-primary-foreground">
            <Link to="/shop">
              Browse Products
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
