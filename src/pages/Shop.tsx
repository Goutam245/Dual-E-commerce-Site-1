import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye, Filter, ChevronDown, Search, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useCart, Product } from '@/contexts/CartContext';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={cn(
        'group relative bg-card rounded-2xl overflow-hidden card-lift border border-border/50',
        'opacity-0 animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 0.05}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.originalPrice && (
        <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
          Save ${(product.originalPrice - product.price).toFixed(0)}
        </Badge>
      )}

      <div
        className={cn(
          'absolute top-4 right-4 z-10 flex flex-col gap-2 transition-all duration-300',
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        )}
      >
        <Button
          size="icon"
          variant="secondary"
          className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground"
          onClick={(e) => e.preventDefault()}
        >
          <Heart className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground"
          onClick={(e) => e.preventDefault()}
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      <div className="relative aspect-square bg-secondary/50 p-6 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-medium text-accent">{product.purity} Pure</span>
        </div>
      </div>

      <div className="p-6">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {product.category}
        </span>

        <h3 className="font-display text-lg font-semibold text-foreground mt-1 mb-2">
          {product.name} <span className="text-muted-foreground font-normal">• {product.dosage}</span>
        </h3>

        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < Math.floor(product.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-border'
                )}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {product.benefits.slice(0, 2).map((benefit) => (
            <span
              key={benefit}
              className="text-xs bg-secondary px-2 py-1 rounded-full text-muted-foreground"
            >
              {benefit}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-display font-bold text-foreground">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through ml-2">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className={cn(
              'transition-all duration-300',
              isHovered
                ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            )}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.benefits.some(b => b.toLowerCase().includes(query))
      );
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Stock filter
    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.reverse();
        break;
      default:
        // featured - keep original order
        break;
    }

    return result;
  }, [activeCategory, searchQuery, sortBy, priceRange, inStockOnly]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Banner */}
      <section className="pt-24 pb-12 bg-primary">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4">
            Peptide Collection
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Pharmaceutical-grade research peptides with 99%+ purity. Each batch third-party tested with COA available.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8">
          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search peptides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Category Pills */}
            <div className="hidden md:flex items-center gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={activeCategory === category.name ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category.name)}
                  className={cn(
                    'rounded-full shrink-0',
                    activeCategory === category.name
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:border-accent hover:text-accent'
                  )}
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filters */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Category</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <Button
                          key={category.name}
                          variant={activeCategory === category.name ? 'default' : 'ghost'}
                          className="w-full justify-start"
                          onClick={() => setActiveCategory(category.name)}
                        >
                          {category.name} ({category.count})
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                    />
                    <label htmlFor="inStock" className="text-sm">In Stock Only</label>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-muted-foreground mb-6">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </p>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
