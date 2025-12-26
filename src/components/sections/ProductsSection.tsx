import { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, Product } from '@/contexts/CartContext';
import { products, categories } from '@/data/products';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: 'Added to Cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div
      className={cn(
        'group relative bg-card rounded-2xl overflow-hidden card-lift border border-border/50',
        'opacity-0 animate-fade-in-up'
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {product.originalPrice && (
        <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
          Save ${(product.originalPrice - product.price).toFixed(0)}
        </Badge>
      )}

      {/* Quick Actions */}
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
        >
          <Heart className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm hover:bg-accent hover:text-accent-foreground"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square bg-secondary/50 p-8 flex items-center justify-center">
        <div className="w-24 h-32 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-accent/60">
            {product.name.slice(0, 2)}
          </span>
        </div>

        {/* Purity Badge */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-xs font-medium text-accent">{product.purity} Pure</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {product.category}
        </span>

        {/* Name & Dosage */}
        <h3 className="font-display text-lg font-semibold text-foreground mt-1 mb-2">
          {product.name} <span className="text-muted-foreground font-normal">• {product.dosage}</span>
        </h3>

        {/* Rating */}
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
          <span className="text-sm text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* Benefits Preview */}
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

        {/* Price & CTA */}
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
    </div>
  );
}

export function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <section id="products" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Peptide Collection</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Research-grade peptides for your scientific exploration
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category.name)}
              className={cn(
                'rounded-full transition-all duration-300',
                activeCategory === category.name
                  ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                  : 'hover:border-accent hover:text-accent'
              )}
            >
              {category.name}
              <span className="ml-2 text-xs opacity-60">({category.count})</span>
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="rounded-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}
